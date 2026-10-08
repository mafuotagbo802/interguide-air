import React, { useState } from "react";
import API_URL from "../api";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!token) {
      setError(
        "This password reset link is invalid."
      );
      return;
    }

    if (!password || !confirmPassword) {
      setError(
        "Please fill in both password fields."
      );
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/admin/reset-password`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            token,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to reset password."
        );
      }

      setMessage(data.message);

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/Admin");
      }, 2500);

    } catch (error) {

      console.error(
        "Reset password error:",
        error
      );

      setError(
        error.message ||
          "Something went wrong."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef9ff] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:p-10">

        {/* Branding */}
        <div className="text-center mb-8">

          <p className="text-blue-600 font-semibold mb-2">
            INTERGUIDE AIR
          </p>

          <h1 className="text-3xl font-bold text-gray-800">
            Reset Password
          </h1>

          <p className="text-gray-500 mt-2">
            Create a new password for your admin account.
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


        <form onSubmit={handleSubmit}>

          {/* NEW PASSWORD */}
          <div className="mb-5">

            <label className="block text-gray-700 font-medium mb-2">
              New Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter new password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3.5 pr-12 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition"
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </button>

            </div>

          </div>


          {/* CONFIRM PASSWORD */}
          <div className="mb-6">

            <label className="block text-gray-700 font-medium mb-2">
              Confirm New Password
            </label>

            <div className="relative">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm new password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3.5 pr-12 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition"
                aria-label={
                  showConfirmPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </button>

            </div>

          </div>


          {/* RESET BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-semibold py-3.5 rounded-xl transition duration-300 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
          </button>

        </form>


        {/* LOGIN LINK */}
        <div className="text-center mt-6">

          <Link
            to="/Admin"
            className="text-blue-600 font-semibold hover:text-blue-800"
          >
            ← Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
};

export default ResetPassword;
