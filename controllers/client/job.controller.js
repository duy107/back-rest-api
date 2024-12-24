const Job = require("../../models/job.model");
const CityJob = require("../../models/city-job.model");
const TagJob = require("../../models/tag-job.model");
const { fullInfor, inforCity, inforTag, inforCompany } = require("../../helpers/inforJob");
const { convertToSlug } = require("../../helpers/convertToSlug");
module.exports.search = async (req, res) => {
    try {
        const {cities, tags, keyword} = req.query;
        const tagsSearch = JSON.parse(tags);
        const citySearch = JSON.parse(cities);
        const convertSlug = convertToSlug(keyword);
        const reg = new RegExp(keyword, "i");
        const slug = new RegExp(convertSlug, "i");
        const jobKeyword = await Job.find({
            $or: [
                { title: reg },
                { slug: slug }
            ],
            deleted: false,
            status: true
        });
        const job_ids = jobKeyword.map(item => item.id);
        const [jobTags, cityTags] = await Promise.all([
            TagJob.find({ job_id: { $in: job_ids }, tag_id: { $in: JSON.parse(tagsSearch) } }),
            CityJob.find({ job_id: { $in: job_ids }, city_id: { $in: JSON.parse(citySearch) } }),
        ]);
        const ids = jobTags.map(jobTag => jobTag.job_id)
                           .filter(item => (cityTags.some(cityTag => cityTag.job_id === item)));
        const listJob = await Job.find({_id: {$in: ids}}).lean();
        const data = await fullInfor(listJob);
        res.json({
            code: 200,
            data
        })
    } catch (error) {
        res.json({code: 400});
    }
}

module.exports.detail = async (req, res) => {
    const slug = req.params.slug;
    const job = await Job.findOne({
        slug: slug,
        deleted: false
    }).lean();
    job.companyInfor = await inforCompany(job);
    job.tagInfor = await inforTag(job);
    job.cityInfor = await inforCity(job);
    res.json({
        code: 200,
        data: job
    })
}
module.exports.list = async (req, res) => {
    const listJob = await Job.find({
        deleted: false,
        status: true
    }).limit(4).lean();
    const jobs = await fullInfor(listJob);
    res.json({
        message: "success",
        data: jobs
    });
}