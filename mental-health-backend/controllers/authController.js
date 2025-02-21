const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");

// @route POST /api/auth/register
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

// @route POST /api/auth/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Generate JWT Token
    const token = generateToken(user._id);

    // Set token as an HTTP-only cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensures HTTPS in production
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send user info and token
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      message: "Login successful",
      token: token, // Send token in response (optional)
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
}


// @route POST /api/auth/logout
const logoutUser = async (req, res) => {
  res.clearCookie("jwt", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict" });
  res.status(200).json({ message: "User logged out successfully" });
};



// @desc Forgot password
// @route POST /api/auth/forgot-password
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = user.getResetPasswordToken();
    await user.save();

    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const message = `Click to reset password: ${resetURL}`;

    await sendEmail({ email: user.email, subject: "Password Reset", message });
    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error: error.message });
  }
};


// @desc Reset password
// @route POST /api/auth/reset-password/:token
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({ resetPasswordToken: hashedToken, resetPasswordExpires: { $gt: Date.now() } });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error: error.message });
  }
};

module.exports = { registerUser, loginUser, logoutUser, forgotPassword, resetPassword };
