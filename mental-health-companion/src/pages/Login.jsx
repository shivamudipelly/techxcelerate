import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error on submit

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      console.log("User logged in successfully!", data);
      // Optionally, store tokens or user info in localStorage
      if (data.token) {
        document.cookie = `token=${data.token}; path=/; max-age=604800; secure; samesite=strict`;
      }
      

      navigate("/dashboard");
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
            Welcome Back!
          </h2>

          {/* 🟢 Login Form */}
          <form onSubmit={handleSubmit}>
            {/* Error Message */}
            {error && <p className="text-red-600 text-center font-semibold mb-4">{error}</p>}

            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-gray-800 text-base font-semibold mb-2">
                Username or Email
              </label>
              <input
                type="text"
                placeholder="Enter your username or email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-gray-800 text-base font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Keep me logged in & Forgot Password */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="keepLoggedIn"
                  checked={keepLoggedIn}
                  onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="keepLoggedIn"
                  className="ml-2 text-sm text-gray-800 font-medium"
                >
                  Keep me logged in
                </label>
              </div>
              {/* 🔹 Use Link for Forgot Password */}
              <Link
                to="/forgot-password"
                className="text-sm text-blue-800 font-semibold hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white text-lg font-bold px-4 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
            >
              Login
            </button>
          </form>

          {/* 🔹 Use Link for Sign Up */}
          <p className="text-center text-base text-gray-800 font-medium">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-800 font-bold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
