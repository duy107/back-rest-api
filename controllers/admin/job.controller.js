const Job = require("../../models/job.model");
const Tag = require("../../models/tag.model");
const City = require("../../models/city.model");
const TagJob = require("../../models/tag-job.model");
const CityJob = require("../../models/city-job.model");
const { fullInfor, inforTag, inforCity } = require("../../helpers/inforJob");    
module.exports.listJob = async (req, res) => {
    const id = res.locals.company.id;
    const listJob = await Job.find({
        deleted: false
    }).lean();
    const jobs = await fullInfor(listJob);
    res.json(jobs);
}
module.exports.update = async (req, res) => {
    try {
        const { id, tags, cities } = req.body;
        delete req.body.id;
        delete req.body.tags;
        delete req.body.cities;

        // update job
        await Job.updateOne({ _id: id }, req.body);

        // update job-tag
        await TagJob.deleteMany({ job_id: id });
        const tagJobs = tags.map(item => ({
            tag_id: item,
            job_id: id
        }));
        await TagJob.insertMany(tagJobs);

        // update city-job
        await CityJob.deleteMany({ job_id: id });
        const cityJobs = cities.map(item => ({
            city_id: item,
            job_id: id
        }));
        await CityJob.insertMany(cityJobs);
        res.json({
            code: 200,
            message: "Cập nhật thành công!"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Cập nhật thất bại!"
        })
    }
}
module.exports.delete = async (req, res) => {
    const { id } = req.body;
    try {
        await Job.updateOne({ _id: id }, { deleted: true });
        res.json({
            code: 200,
            message: "Xóa thành công!"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Xóa thất bại!"
        })
    }
}

module.exports.create = async (req, res) => {
    try {
        const id = res.locals.company.id;
        const tags = req.body.tags;
        const cities = req.body.cities;
        delete req.body.tags;
        delete req.body.cities;

        const job = new Job({ ...req.body, company_id: id });
        await job.save();

        const tagJobs = tags.map(item => ({
            tag_id: item,
            job_id: job.id
        }));
        await TagJob.insertMany(tagJobs);

        const cityJobs = cities.map(item => ({
            city_id: item,
            job_id: job.id
        }));
        await CityJob.insertMany(cityJobs);

        res.json({
            code: 200,
            message: "Tạo mới thành công!"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Tạo mới thất bại!"
        })

    }
}

module.exports.detail = async (req, res) => {
    try {
        const {id} = req.params;
        const infor = await Job.findOne({
            _id: id,
            deleted: false
        }).lean();
        infor.cities = await inforCity(infor);
        infor.tags = await inforTag(infor);
        res.json({
            code: 200,
            infor
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Error"
        })
    }
}