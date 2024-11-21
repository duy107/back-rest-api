const Cv = require("../models/cv.model");
const Job = require("../models/job.model");
const TagJob = require("../models/tag-job.model");
const CityJob = require("../models/city-job.model");
const Tag = require("../models/tag.model");
const City = require("../models/city.model");
const Company = require("../models/company.model");

module.exports.inforCompany = async (item) => {
    const company = await Company.findOne({
        _id: item.company_id,
        deleted: false
    }).select("name address");
    return company;
}
module.exports.inforJob = async (item) => {
    const job = await Job.findOne({
        _id: item.job_id,
        deleted: false,
        status: true
    }).select("name");
    return job;
}

module.exports.fullInfor = async (data) => {
    for (const cv of data) {
        cv.companyInfor = await this.inforCompany(cv);
    }
    for (const cv of data) {
        cv.jobInfor = await this.inforJob(cv);
    }
    return data;
}