import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Admin1 from '../assets/Admin1.jpg';

const AdminSignup = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    // =====================================================
    // HANDLE INPUT CHANGES
    // =====================================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };


    // =====================================================
    // HANDLE SIGNUP
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage('');
        setError('');


        // Check passwords

        if (
            formData.password !==
            formData.confirmPassword
        ) {

            setError('Passwords do not match.');

            return;

        }


        // Check password length

        if (formData.password.length < 6) {

            setError(
                'Password must be at least 6 characters long.'
            );

            return;

        }


        try {

            setLoading(true);


            const response = await fetch(
                'http://localhost:5000/admin/signup',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify(formData)
                }
            );


            const data = await response.json();


            if (!response.ok) {

                setError(
                    data.message ||
                    'Unable to create admin account.'
                );

                return;

            }


            setMessage(
                'Admin account created successfully! Redirecting to login...'
            );


            // Clear form

            setFormData({
                fullName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });


            // Redirect to login

            setTimeout(() => {

                navigate('/Admin');

            }, 1500);

        }

        catch (error) {

            console.error(
                'Signup error:',
                error
            );

            setError(
                'Unable to connect to the server. Please make sure the backend is running.'
            );

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <div className="min-h-screen bg-[#eef9ff] flex items-center justify-center px-4 py-8">

            {/* MAIN SIGNUP CARD */}

            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex">


                {/* LEFT IMAGE SECTION */}

                <div className="hidden lg:flex lg:w-1/2 relative min-h-[700px]">

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
                            Join InterGuide Air
                        </h1>

                        <p className="text-2xl font-medium mb-6">
                            Your Journey Starts Here.
                        </p>

                        <p className="text-lg max-w-md text-gray-200 leading-relaxed">
                            Create your administration account and help manage
                            the InterGuide Air travel experience.
                        </p>

                    </div>

                </div>


                {/* RIGHT SIGNUP SECTION */}

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

                        <div className="mb-7">

                            <p className="text-blue-600 font-semibold mb-2">
                                ADMIN PORTAL
                            </p>

                            <h2 className="text-3xl font-bold text-gray-800">
                                Create Account
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Create your InterGuide Air admin account.
                            </p>

                        </div>


                        {/* SUCCESS MESSAGE */}

                        {message && (

                            <div className="mb-5 p-3 rounded-xl bg-green-100 border border-green-300 text-green-700 text-sm">
                                {message}
                            </div>

                        )}


                        {/* ERROR MESSAGE */}

                        {error && (

                            <div className="mb-5 p-3 rounded-xl bg-red-100 border border-red-300 text-red-700 text-sm">
                                {error}
                            </div>

                        )}


                        {/* SIGNUP FORM */}

                        <form onSubmit={handleSubmit}>


                            {/* Full Name */}

                            <div className="mb-4">

                                <label className="block text-gray-700 font-medium mb-2">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    required
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                                />

                            </div>


                            {/* Email */}

                            <div className="mb-4">

                                <label className="block text-gray-700 font-medium mb-2">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                                />

                            </div>


                            {/* Password */}

                            <div className="mb-4">

                                <label className="block text-gray-700 font-medium mb-2">
                                    Password
                                </label>

                                <div className="relative">

                                    <input
                                        type={
                                            showPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Create a password"
                                        required
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3.5 pr-12 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition"
                                        aria-label={
                                            showPassword
                                                ? 'Hide password'
                                                : 'Show password'
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


                            {/* Confirm Password */}

                            <div className="mb-5">

                                <label className="block text-gray-700 font-medium mb-2">
                                    Confirm Password
                                </label>

                                <div className="relative">

                                    <input
                                        type={
                                            showConfirmPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm your password"
                                        required
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
                                                ? 'Hide password'
                                                : 'Show password'
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


                            {/* Signup Button */}

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full text-white font-semibold py-3.5 rounded-xl transition duration-300 shadow-md hover:shadow-lg ${
                                    loading
                                        ? 'bg-blue-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >

                                {loading
                                    ? 'Creating Account...'
                                    : 'Create Account'
                                }

                            </button>


                            {/* Divider */}

                            <div className="flex items-center gap-4 my-5">

                                <div className="flex-1 h-px bg-gray-300"></div>

                                <span className="text-sm text-gray-400">
                                    OR
                                </span>

                                <div className="flex-1 h-px bg-gray-300"></div>

                            </div>


                            {/* Login */}

                            <p className="text-center text-gray-500 text-sm mt-7">

                                Already have an admin account?{' '}

                                <Link
                                    to="/Admin"
                                    className="text-blue-600 font-semibold hover:text-blue-800"
                                >
                                    Login
                                </Link>

                            </p>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default AdminSignup;