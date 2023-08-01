const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const apiResponse = require("../utils/apiResponse");
const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    const { name, email, mobileNo, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(409)
        .json(apiResponse(false, "Email is already registered"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      mobileNo,
      password: hashedPassword,
    });
    return res.json(apiResponse(true, "User registered successfully", user));
  } catch (err) {
    console.error("Error registering user:", err);
    return res.status(500).json(apiResponse(false, "Failed to register user"));
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json(apiResponse(false, "Invalid credentials"));
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const secretKey = "your_secret_key"; // Replace with a strong secret key
    const options = { expiresIn: "1h" };

    const token = jwt.sign(payload, secretKey, options);
    return res.json(
      apiResponse(true, "User logged in successfully", { token })
    );
  } catch (err) {
    console.error("Error logging in:", err);
    return res.status(500).json(apiResponse(false, "Failed to login"));
  }
};

module.exports = {
  registerUser,
  loginUser,
};
