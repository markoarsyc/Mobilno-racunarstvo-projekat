const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const userController = {
  // Kreiranje novog korisnika
  async createUser(req, res) {
    try {
      const { username, password, email } = req.body;

      if (!username || !password || !email) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        password: hashedPassword,
        email,
      });

      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error });
    }
  },

  //Login korisnika
  async login(req, res) {
  try {
    const { username, password } = req.body;

    // provera da li su sva polja popunjena
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // provera da li korisnik postoji
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // provera lozinke
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // ako je sve u redu, vraćamo korisnika (bez lozinke)
    const { password: _, ...userData } = user.toObject();
    res.status(200).json(userData);

  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
},

  // Brisanje korisnika
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findOneAndDelete({ _id: req.params.id });
      if (!deletedUser) return res.status(404).json({ message: "User not found" });
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user", error });
    }
  },
};

module.exports = userController;
