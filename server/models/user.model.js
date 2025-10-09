const mongoose = require("mongoose");
const Review = require("./review.model");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Kada se korisnik obriše, brišu se i njegove recenzije
UserSchema.pre("findOneAndDelete", async function (next) {
  const filter = this.getFilter();
  const user = await this.model.findOne(filter);
  if (user) {
    await Review.deleteMany({ user: user._id });
  }
  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
