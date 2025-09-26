const { default: mongoose } = require('mongoose');
const Job = require('../models/jobModel');

exports.getAllJobs = async (req, res)=> {
    try{
        
    const jobs = await Job.find({}).sort({createdAt: -1});

    res.status(200).json(jobs);


    } catch(err){
    res.status(500).json({error: err.message});
    }   
}

exports.createJob = async (req,res) =>{
    try{

        //user_id vs userId??

        //const userId = req.user._id;
        const newJob = await Job.create({ ...req.body});
        res.status(201).json(newJob);

    } catch(err){
        res.status(500).json({message: "failed to create a new job", error : err.message});
    }
}

exports.getJobById = async (req,res)=>{
    const {jobId} = req.params;

    if(!mongoose.Types.ObjectId.isValid(jobId)){
        return res.status(400).json({message: "Invalid job ID"});
    }
    try{
        //userid
        const job = await Job.findById(jobId)
        //.where("user_id")
        //.equals(user_id);

        if(job){
            res.status(200).json(job);
        } else {
            res.status(404).json({message: "Job not found"});
        }

    }catch(err){
        res.status(500).json({message: "failed to retrieve the job", error : err.message})

    }
}

exports.updateJob = async (req,res) => {
    const {jobId} = req.params;

        if(!mongoose.Types.ObjectId.isValid(jobId)){
        return res.status(400).json({message: "Invalid job ID"});
    }

    try{
        //const userId = req.user._id;
        const updatedJob = await Job.findByIdAndUpdate(
            {_id: jobId},
            {...req.body},
            {new: true}
        );

        if (updatedJob){
            res.status(200).json(updatedJob);
        } else {
            res.status(404).json({message: "job not found"})
        }
    
    } catch(err){
            res.status(500).json({message: "failed to update job"})
    }
};

exports.deleteJob = async (req,res) =>{
    const { jobId }= req.params;

     if(!mongoose.Types.ObjectId.isValid(jobId)){
        return res.status(400).json({message: "Invalid job ID"});
    }

    try{
        //const userId = req.user._id;
        const deletedJob = await Job.findByIdAndDelete({ _id: jobId});
        if (deletedJob) {
            res.status(200).json({message: "Job deleted successfully"});
        } else {
            res.status(404).json({message: "job not found"})
        }

    }catch(err){
        res.status(500).json({message: "failed to update job"})

    }

}