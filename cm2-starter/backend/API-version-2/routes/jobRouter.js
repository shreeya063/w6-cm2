const express = require('express');
const router = express.Router();
const {
    getAllJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob
} = require('../controllers/jobControllers');

//GET /Job
router.get('/', getAllJobs);

//POST /Job
router.post('/', createJob);

//Get /Job/:jobId
router.get('/:jobId', getJobById);

//PUT /Job/:jobId
router.put('/:jobId', updateJob);

//DELETE /Job/:jobId
router.delete('/:jobId', deleteJob);

module.exports = router;