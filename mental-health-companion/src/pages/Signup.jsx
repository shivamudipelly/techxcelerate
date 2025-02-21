import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";




const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error on submit
  
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
  
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName, // mapping fullName to name
          email: formData.email,
          password: formData.password,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }
  
      console.log("User signed up successfully!", data);
  
      // Redirect to login page after successful signup
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setError(error.message);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="relative bg-white/90 p-8 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/src/images/login1.jpg')" }}
        ></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create Your Account
          </h2>

          {/* Error Message */}
          {error && <p className="text-red-600 text-center font-semibold mb-4">{error}</p>}

          {/* 🟢 Signup Form */}
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-gray-800 text-base font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-800 text-base font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-800 text-base font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label className="block text-gray-800 text-base font-semibold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white text-lg font-bold px-4 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
            >
              Sign Up
            </button>
          </form>

          {/* 🔹 Use Link for Login */}
          <p className="text-center text-base text-gray-800 font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-800 font-bold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
