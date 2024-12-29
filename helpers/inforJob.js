const Job = require("../models/job.model");
const TagJob = require("../models/tag-job.model");
const CityJob = require("../models/city-job.model");
const Tag = require("../models/tag.model");
const City = require("../models/city.model");
const Company = require("../models/company.model");

module.exports.inforTag = async (item) => {
    const tags = await TagJob.find({
        job_id: item._id,
        deleted: false
    }).select("tag_id");
    if (tags.length > 0) {
        const tagIds = tags.map(item => item.tag_id);
        const inforTag = await Tag.find({
            _id: { $in: tagIds }
        }).select("name");
        return inforTag;
    }
}
module.exports.inforCompany = async (item) => {
    // console.log(item);
    const company = await Company.findOne({
        _id: item.company_id,
        deleted: false
    }).select("name address");
    return company;
}
module.exports.inforCity = async (item) => {
    const cities = await CityJob.find({
        job_id: item._id,
        deleted: false
    }).select("city_id");
    if (cities.length > 0) {
        const cityIds = cities.map(item => item.city_id);
        const inforCity = await City.find({
            _id: { $in: cityIds }
        }).select("name");
        return inforCity;
    }
    return []
}

module.exports.fullInfor = async (data) => {
    for (const job of data) {
        job.tags = await this.inforTag(job);
    }
    for (const job of data) {
        job.cities = await this.inforCity(job);
    }

    for (const job of data) {
        job.companyInfor = await this.inforCompany(job);
    }
    return data;
}