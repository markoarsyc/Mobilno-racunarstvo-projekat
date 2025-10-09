const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    review: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Jedan korisnik može ostaviti samo jednu recenziju po filmu
ReviewSchema.index({ user: 1, movie: 1 }, { unique: true });

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;
