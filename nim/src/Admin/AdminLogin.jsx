import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Admin1 from '../assets/Admin1.jpg';

const AdminLogin = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);

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
    // HANDLE LOGIN
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage('');
        setError('');


        try {

            setLoading(true);


            const response = await fetch(
                'http://localhost:5000/admin/login',
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
                    'Invalid email or password.'
                );

                return;

            }


            // Save JWT token

            localStorage.setItem(
                'adminToken',
                data.token
            );


            // Save admin information

            localStorage.setItem(
                'adminInfo',
                JSON.stringify(data.admin)
            );


            setMessage(
                'Login successful! Redirecting...'
            );


            // Redirect to dashboard

            setTimeout(() => {

                navigate('/Admin/dashboard');

            }, 1000);

        }

        catch (error) {

            console.error(
                'Login error:',
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

            {/* MAIN LOGIN CARD */}

            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex">


                {/* LEFT IMAGE SECTION */}

                <div className="hidden lg:flex lg:w-1/2 relative min-h-[650px]">

                    <img
                        src={Admin1}
                        alt="InterGuide Air Travel"
                        className="absolute inset-0 w-full h-full object-cover"
                    />


                    {/* Dark Overlay */}

                    <div className="absolute inset-0 bg-black/45"></div>


                    {/* Image Text */}

                    <div className="relative z-10 flex flex-col justify-center px-12 text-white">

                        <h1 className="text-4xl xl:text-5xl font-bold mb-4">
                            InterGuide Air Services
                        </h1>

                        <p className="text-2xl font-medium mb-6">
                            We Plan, You Travel.
                        </p>

                        <p className="text-lg max-w-md text-gray-200 leading-relaxed">
                            Welcome to the InterGuide Air administration portal.
                            Manage your travel services and content from one place.
                        </p>

                    </div>

                </div>


                {/* RIGHT LOGIN SECTION */}

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
                                Welcome Back
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Sign in to manage your InterGuide Air website.
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


                        {/* LOGIN FORM */}

                        <form onSubmit={handleSubmit}>


                            {/* Email */}

                            <div className="mb-5">

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

                            <div className="mb-3">

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
                                        placeholder="Enter your password"
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


                            {/* Forgot Password */}

                            <div className="text-right mb-6">

                                <Link
                                    to="/Admin/forgot-password"
                                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Forgot Password?
                                </Link>

                            </div>


                            {/* Login Button */}

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
                                    ? 'Logging in...'
                                    : 'Login'
                                }

                            </button>


                            {/* Divider */}

                            <div className="flex items-center gap-4 my-6">

                                <div className="flex-1 h-px bg-gray-300"></div>

                                <span className="text-sm text-gray-400">
                                    OR
                                </span>

                                <div className="flex-1 h-px bg-gray-300"></div>

                            </div>


                            {/* Signup */}

                            <p className="text-center text-gray-500 text-sm mt-8">

                                Don't have an admin account?{' '}

                                <Link
                                    to="/Admin/signup"
                                    className="text-blue-600 font-semibold hover:text-blue-800"
                                >
                                    Sign Up
                                </Link>

                            </p>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default AdminLogin;