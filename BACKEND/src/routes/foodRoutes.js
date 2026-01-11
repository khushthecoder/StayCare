const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food');

router.get('/food-comments', foodController.getComments);
router.post('/food-comments', foodController.postComment);
router.patch('/food-comments/:id/like', foodController.likeComment);
router.patch('/food-comments/:id/dislike', foodController.dislikeComment);

module.exports = router;
