const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller");

// CREATE
router.post("/", reviewController.createReview);

// READ
router.get("/user/:userId", reviewController.getReviewsByUser);

// UPDATE
router.put("/:id", reviewController.updateReview);

// DELETE
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
