const mongoose = require("mongoose");
const Review = require("./review.model");

const MovieSchema = new mongoose.Schema(
  {
    apiId: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Kada se film obriše, brišu se i njegove recenzije
MovieSchema.pre("findOneAndDelete", async function (next) {
  const filter = this.getFilter();
  const movie = await this.model.findOne(filter);
  if (movie) {
    await Review.deleteMany({ movie: movie._id });
  }
  next();
});

const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie;
