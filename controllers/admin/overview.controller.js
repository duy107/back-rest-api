const { inforJob } = require("../../helpers/inforCv");
const Company = require("../../models/company.model")
const Cv = require("../../models/cv.model");
const Job = require("../../models/job.model");
const User = require("../../models/user.model");
module.exports.overview = async (req, res) => {
    let cvStatistic = {
        total: 0,
        initial: 0,
        accepted: 0, 
        refused: 0
    }
    let jobStatistic = {
        total: 0,
        statusTrue: 0,
        statusFalse: 0
    }
    const cvs = await Cv.find({
        deleted: false
    });
    const Cvs = await Cv.find({
        deleted: false,
        status: "accepted"
    }).lean();
    for(const item of Cvs) {
        item.inforJob = await inforJob(item);
        const inforUser = await User.findOne({
            _id: item.user_id,
            deleted: false
        }).select("email");
        if(inforUser){
            item.inforUser = inforUser;
        }
    }
    const jobs = await Job.find({
        deleted: false
    })
    if(cvs.length > 0){
        cvStatistic.total = cvs.length;
        cvs.forEach(cv => {
            cv.status == "initial" ? cvStatistic.initial++ : cv.status == "accepted" ? cvStatistic.accepted++ : cvStatistic.refused++;
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
        jobStatistic: jobStatistic,
        listCv: Cvs
    });
}