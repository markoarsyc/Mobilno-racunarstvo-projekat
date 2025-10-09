  const Review = require("../models/review.model");

  const reviewController = {
    // Kreiranje nove recenzije
    async createReview(req, res) {
      try {
        const { user, movieAPI, movieTitle, rating, review } = req.body;

        if (!user || !movieAPI || !movieTitle || rating == null) {
          return res.status(400).json({ message: "Missing required fields." });
        }

        const newReview = new Review({
          user,
          movieAPI,
          movieTitle,
          rating,
          review,
        });
        await newReview.save();

        res.status(201).json(newReview);
      } catch (error) {
        res.status(500).json({ message: "Error creating review", error });
      }
    },

    // Izmena recenzije
    async updateReview(req, res) {
      try {
        const { rating, review } = req.body;
        const reviewId = req.params.id;

        if (rating == null && !review) {
          return res
            .status(400)
            .json({
              message: "At least one field (rating or review) must be provided.",
            });
        }

        const updated = await Review.findByIdAndUpdate(
          reviewId,
          { rating, review },
          { new: true, runValidators: true }
        ).populate("user", "username");

        if (!updated) {
          return res.status(404).json({ message: "Review not found" });
        }

        res.json({ message: "Review updated successfully", updated });
      } catch (error) {
        res.status(500).json({ message: "Error updating review", error });
      }
    },

    // Ucitavanje svih recenzija određenog korisnika
    async getReviewsByUser(req, res) {
      try {
        const reviews = await Review.find({ user: req.params.userId });
        res.json(reviews);
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error fetching reviews for user", error });
      }
    },

    // Brisanje recenzije
    async deleteReview(req, res) {
      try {
        const deleted = await Review.findByIdAndDelete(req.params.id);
        if (!deleted)
          return res.status(404).json({ message: "Review not found" });
        res.json({ message: "Review deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: "Error deleting review", error });
      }
    },
  };

  module.exports = reviewController;
