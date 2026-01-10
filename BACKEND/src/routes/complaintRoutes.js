const express = require('express');
const router = express.Router();
const complaintsController = require('../controllers/complaints');

router.get('/complaints/:category', complaintsController.getComplaintsByCategory);
router.post('/complaints', complaintsController.postComplaint);
router.patch('/complaints/:id/toggle', complaintsController.toggleComplaintStatus);

module.exports = router;
