const Company = require("../../models/company.model")
const Cv = require("../../models/cv.model");
const Job = require("../../models/job.model");
module.exports.overview = async (req, res) => {
    let cvStatistic = {
        total: 0,
        statusTrue: 0,
        statusFalse: 0, 
        statusAccept: 0
    }
    let jobStatistic = {
        total: 0,
        statusTrue: 0,
        statusFalse: 0
    }
    const cvs = await Cv.find({
        deleted: false
    });

    const jobs = await Job.find({
        deleted: false
    })

    if(cvs.length > 0){
        cvStatistic.total = cvs.length;
        cvs.forEach(cv => {
            cv.accepted ? cvStatistic.statusAccept++ : cv.statusRead ? cvStatistic.statusTrue++ :cvStatistic.statusFalse++;

        })
    }

    if(jobs.length > 0){
        jobStatistic.total = jobs.length;
        jobs.forEach(job => {
            job.status ? jobStatistic.statusTrue++ : jobStatistic.statusFalse++;
        })
    }
    res.json({
        companyInfor: res.locals.company,
        cvStatistic: cvStatistic,
        jobStatistic: jobStatistic
    });
}