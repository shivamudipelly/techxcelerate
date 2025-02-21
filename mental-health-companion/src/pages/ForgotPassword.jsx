import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const [storedOTP, setStoredOTP] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // React Router navigation

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Send OTP (Show OTP in an alert)
  const handleSendOTP = () => {
    if (!formData.email) {
      setMessage("Please enter your email.");
      return;
    }

    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    setStoredOTP(generatedOTP);
    alert(`Your OTP is: ${generatedOTP}`);
    setMessage(`OTP sent to ${formData.email}`);
  };

  // Resend OTP
  const handleResendOTP = () => {
    handleSendOTP();
  };

  // Reset Password
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!storedOTP) {
      setMessage("Please request an OTP first.");
      return;
    }
  
    if (formData.otp !== storedOTP) {
      setMessage("Invalid OTP. Please try again.");
      return;
    }
  
    // Get stored user data
    const storedUserData = localStorage.getItem("signupData");
  
    if (!storedUserData) {
      setMessage("No user found with this email.");
      return;
    }
  
    try {
      let userData = JSON.parse(storedUserData); // Convert string to object
  
      // If signupData is not an object/array, reset it
      if (!userData || (typeof userData !== "object" && !Array.isArray(userData))) {
        setMessage("Invalid user data format. Please register again.");
        return;
      }
  
      if (Array.isArray(userData)) {
        // If multiple users exist, find the correct one
        const userIndex = userData.findIndex((user) => user.email === formData.email);
  
        if (userIndex === -1) {
          setMessage("No user found with this email.");
          return;
        }
  
        userData[userIndex].password = formData.newPassword;
        localStorage.setItem("signupData", JSON.stringify(userData));
      } else {
        // If it's a single user object, verify the email
        if (userData.email !== formData.email) {
          setMessage("No user found with this email.");
          return;
        }
  
        userData.password = formData.newPassword;
        localStorage.setItem("signupData", JSON.stringify(userData));
      }
  
      setMessage("Password successfully reset! Redirecting to login...");
  
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessage("Error processing data. Please try again.");
      console.error("Error parsing localStorage data:", error);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="relative bg-white/90 p-8 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/src/images/login1.jpg')" }}
        ></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Reset Your Password
          </h2>

          {message && (
            <p className="text-center text-sm font-semibold text-red-600 mb-4">
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-gray-800 text-base font-semibold mb-2">
                Email
              </label>
              <div className="flex items-center">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={handleSendOTP}
                  className="ml-2 text-blue-600 text-sm font-semibold hover:underline"
                >
                  Send OTP
                </button>
              </div>
            </div>

            {/* OTP Field */}
            <div className="mb-4">
              <label className="block text-gray-800 text-base font-semibold mb-2">
                Enter OTP
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="Enter OTP"
                  className="flex-grow px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="ml-2 text-blue-600 text-xs font-semibold hover:underline"
                >
                  Resend OTP
                </button>
              </div>
            </div>

            {/* New Password Field */}
            <div className="mb-6">
              <label className="block text-gray-800 text-base font-semibold mb-2">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter your new password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Reset Password Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white text-lg font-bold px-4 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
            >
              Reset Password
            </button>
          </form>

          <p className="text-center text-base text-gray-800 font-medium">
            Remembered your password?{" "}
            <Link to="/login" className="text-blue-800 font-bold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
