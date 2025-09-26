const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const {
    getAllJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob
} = require('../controllers/jobControllers');

//GET /Job
router.get('/', getAllJobs);
router.get('/:jobId', getJobById);

router.use(requireAuth);

//POST /Job
router.post('/', createJob);

//Get /Job/:jobId

//PUT /Job/:jobId
router.put('/:jobId', updateJob);

//DELETE /Job/:jobId
router.delete('/:jobId', deleteJob);

module.exports = router;