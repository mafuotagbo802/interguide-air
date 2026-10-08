import React, { useState } from "react";
import API_URL from "../api";
import { Link } from "react-router-dom";
import Admin1 from "../assets/Admin1.jpg";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Please enter your admin email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/admin/forgot-password`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Something went wrong."
        );
      }

      setMessage(data.message);
      setEmail("");

    } catch (error) {

      console.error(
        "Forgot password error:",
        error
      );

      setError(
        error.message ||
          "Unable to process your request."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef9ff] flex items-center justify-center px-4 py-8">

      {/* MAIN CARD */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex">

        {/* LEFT IMAGE SECTION */}
        <div className="hidden lg:flex lg:w-1/2 relative min-h-[600px]">

          <img
            src={Admin1}
            alt="InterGuide Air Travel"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/45"></div>

          {/* Image Content */}
          <div className="relative z-10 flex flex-col justify-center px-12 text-white">

            <h1 className="text-4xl xl:text-5xl font-bold mb-4">
              InterGuide Air Services
            </h1>

            <p className="text-2xl font-medium mb-6">
              We Plan, You Travel.
            </p>

            <p className="text-lg max-w-md text-gray-200 leading-relaxed">
              Don't worry, we'll help you get back into your
              administration account securely.
            </p>

          </div>
        </div>


        {/* RIGHT FORM SECTION */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8 sm:px-10 py-12">

          <div className="w-full max-w-md">

            {/* Mobile Branding */}
            <div className="text-center mb-8 lg:hidden">

              <h1 className="text-3xl font-bold text-blue-700">
                InterGuide Air
              </h1>

              <p className="text-gray-500 mt-1">
                We Plan, You Travel.
              </p>

            </div>


            {/* Heading */}
            <div className="mb-8">

              <p className="text-blue-600 font-semibold mb-2">
                ADMIN PORTAL
              </p>

              <h2 className="text-3xl font-bold text-gray-800">
                Forgot Password?
              </h2>

              <p className="text-gray-500 mt-2 leading-relaxed">
                Enter your email address and we'll send you
                instructions to reset your password.
              </p>

            </div>


            {/* SUCCESS MESSAGE */}
            {message && (
              <div className="mb-5 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
                {message}
              </div>
            )}


            {/* ERROR MESSAGE */}
            {error && (
              <div className="mb-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}


            {/* RESET FORM */}
            <form onSubmit={handleSubmit}>

              {/* Email */}
              <div className="mb-6">

                <label className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your admin email"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                />

              </div>


              {/* Reset Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full text-white font-semibold py-3.5 rounded-xl transition duration-300 shadow-md ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
                }`}
              >
                {loading
                  ? "Sending..."
                  : "Send Reset Link"}
              </button>


              {/* Back to Login */}
              <div className="text-center mt-7">

                <Link
                  to="/Admin"
                  className="text-blue-600 font-semibold hover:text-blue-800"
                >
                  ← Back to Login
                </Link>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ForgotPassword;