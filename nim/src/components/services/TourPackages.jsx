import React, { useEffect, useRef, useState } from "react";

import Tours from "../../assets/Tours.jpg";
import Family from "../../assets/Family.jpg";
import Family2 from "../../assets/Family2.jpg";
import Corporate from "../../assets/Corporate.jpg";
import Coporate2 from "../../assets/Coporate2.jpg";
import Religion from "../../assets/Religion.jpg";
import Religion2 from "../../assets/Religion2.jpg";
import Honeymoon from "../../assets/Honeymoon.jpg";
import Honeymoon2 from "../../assets/Honeymoon2.jpg";
import Beach from "../../assets/Beach.jpg";
import Beach2 from "../../assets/Beach2.jpg";
import Spa from "../../assets/Spa.jpg";
import Spa2 from "../../assets/Spa2.jpg";
import Culture from "../../assets/Culture.jpg";
import Culture2 from "../../assets/Culture2.jpg";
import Education from "../../assets/Education.jpg";
import Education2 from "../../assets/Education2.jpg";

import {
    FaUsers,
    FaUserFriends,
    FaPrayingHands,
    FaHeart,
    FaUmbrellaBeach,
    FaSpa,
    FaLandmark,
    FaGraduationCap,
    FaPlane,
} from "react-icons/fa";


const TourPackages = () => {

    const sectionRefs = useRef([]);

    // =====================================================
    // TOUR PACKAGE IMAGES
    // =====================================================

    const [tourPackages, setTourPackages] = useState([]);


    // =====================================================
    // FETCH SAVED TOUR PACKAGE IMAGES
    // =====================================================

    useEffect(() => {

        const fetchTourPackages = async () => {

            try {

                const response = await fetch(
                    "http://localhost:5000/tour-packages"
                );

                const data = await response.json();

                if (response.ok) {
                    setTourPackages(data);
                }

            } catch (error) {

                console.error(
                    "Error fetching tour packages:",
                    error
                );

            }

        };

        fetchTourPackages();

    }, []);


    // =====================================================
    // GET IMAGE URL
    // =====================================================

    const getImageUrl = (image, fallback) => {

        if (!image) {
            return fallback;
        }

        if (image.startsWith("/")) {
            return `http://localhost:5000${image}`;
        }

        if (
            image.startsWith("http://") ||
            image.startsWith("https://")
        ) {
            return image;
        }

        return image;
    };


    // =====================================================
    // FIND PACKAGE FROM DATABASE
    // =====================================================

    const getPackage = (name) => {

        return tourPackages.find(
            (tourPackage) =>
                tourPackage.name === name
        );

    };


    // =====================================================
    // SCROLL REVEAL ANIMATION
    // =====================================================

    useEffect(() => {

        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                    }

                });

            },
            {
                threshold: 0.15,
            }
        );

        const sections = sectionRefs.current;

        sections.forEach((section) => {

            if (section) {
                observer.observe(section);
            }

        });

        return () => {

            sections.forEach((section) => {

                if (section) {
                    observer.unobserve(section);
                }

            });

        };

    }, []);


    return (

        <div className="w-full">

            {/* =====================================================
                HERO SECTION
            ===================================================== */}

            <div
                ref={(el) => (sectionRefs.current[0] = el)}
                className="reveal relative h-[420px] md:h-[500px] overflow-hidden"
            >

                {/* Background Image */}

                <img
                    src={Tours}
                    alt="Tour Packages"
                    className="absolute inset-0 w-full h-full object-cover"
                />


                {/* Dark Overlay */}

                <div className="absolute inset-0 bg-black/55">
                </div>


                {/* Hero Content */}

                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 h-full flex items-center">

                    <div className="max-w-2xl text-white">

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                            TOUR PACKAGES
                        </h1>

                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-yellow-400 mb-4">
                            Explore • Experience • Create Memories
                        </h2>

                        <p className="text-base md:text-lg leading-7 text-gray-100">
                            Our Domestic and International Tour packages have brought
                            enlightenment, education, entertainment, rejuvenation and elated
                            spirits to our numerous clients in various categories which include:
                        </p>

                    </div>

                </div>

            </div>


            {/* =====================================================
                TOUR PACKAGE SECTION
            ===================================================== */}

            <div
                ref={(el) => (sectionRefs.current[1] = el)}
                className="reveal bg-white py-12 md:py-16"
            >

                <div className="max-w-7xl mx-auto px-6 md:px-10">

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">


                        {/* =====================================================
                            FAMILY TOURS
                        ===================================================== */}

                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:scale-105 duration-300">

                            <div className="h-[195px] overflow-hidden [perspective:1000px] group">

                                <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                                    {/* FRONT */}

                                    <div className="absolute inset-0 [backface-visibility:hidden]">

                                        <img
                                            src={getImageUrl(
                                                getPackage("Family Tours")?.image1,
                                                Family
                                            )}
                                            alt="Family Tours"
                                            className="w-full h-full object-cover"
                                        />

                                    </div>


                                    {/* BACK */}

                                    <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">

                                        <img
                                            src={getImageUrl(
                                                getPackage("Family Tours")?.image2,
                                                Family2
                                            )}
                                            alt="Family Tours"
                                            className="w-full h-full object-cover"
                                        />

                                    </div>

                                </div>

                            </div>


                            <div className="px-5 pb-7 text-center">

                                <div className="relative -mt-7 mb-3 flex justify-center">

                                    <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center">

                                        <FaUserFriends className="text-[#e4a72c] text-2xl" />

                                    </div>

                                </div>

                                <h3 className="text-lg font-bold text-[#123b70] mb-3">
                                    Family Tours
                                </h3>

                                <p className="text-sm text-gray-500 leading-6">
                                    Quality time, amazing places, unforgettable moments.
                                </p>

                            </div>

                        </div>


                        {/* =====================================================
                            CORPORATE & GROUP TOURS
                        ===================================================== */}

                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:scale-105 duration-300">

                            <div className="h-[195px] overflow-hidden [perspective:1000px] group">

                                <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                                    <div className="absolute inset-0 [backface-visibility:hidden]">

                                        <img
                                            src={getImageUrl(
                                                getPackage("Corporate & Group Tours")?.image1,
                                                Corporate
                                            )}
                                            alt="Corporate and Group Tours"
                                            className="w-full h-full object-cover"
                                        />

                                    </div>

                                    <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">

                                        <img
                                            src={getImageUrl(
                                                getPackage("Corporate & Group Tours")?.image2,
                                                Coporate2
                                            )}
                                            alt="Corporate and Group Tours"
                                            className="w-full h-full object-cover"
                                        />

                                    </div>

                                </div>

                            </div>


                            <div className="px-5 pb-7 text-center">

                                <div className="relative -mt-7 mb-3 flex justify-center">

                                    <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center">

                                        <FaUsers className="text-[#e4a72c] text-2xl" />

                                    </div>

                                </div>

                                <h3 className="text-lg font-bold text-[#123b70] mb-3">
                                    Corporate &amp; Group Tours
                                </h3>

                                <p className="text-sm text-gray-500 leading-6">
                                    Build stronger teams with memorable experiences.
                                </p>

                            </div>

                        </div>


                        {/* =====================================================
                            RELIGIOUS PILGRIMAGE TOURS
                        ===================================================== */}

                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:scale-105 duration-300">

                            <div className="h-[195px] overflow-hidden [perspective:1000px] group">

                                <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                                    <div className="absolute inset-0 [backface-visibility:hidden]">

                                        <img
                                            src={getImageUrl(
                                                getPackage("Religious Pilgrimage Tours")?.image1,
                                                Religion
                                            )}
                                            alt="Religious Pilgrimage Tours"
                                            className="w-full h-full object-cover"
                                        />

                                    </div>

                                    <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">

                                        <img
                                            src={getImageUrl(
                                                getPackage("Religious Pilgrimage Tours")?.image2,
                                                Religion2
                                            )}
                                            alt="Religious Pilgrimage Tours"
                                            className="w-full h-full object-cover"
                                        />

                                    </div>

                                </div>

                            </div>


                            <div className="px-5 pb-7 text-center">

                                <div className="relative -mt-7 mb-3 flex justify-center">

                                    <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center">

                                        <FaPrayingHands className="text-[#e4a72c] text-2xl" />

                                    </div>

                                </div>

                                <h3 className="text-lg font-bold text-[#123b70] mb-3">
                                    Religious Pilgrimage Tours
                                </h3>

                                <p className="text-sm text-gray-500 leading-6">
                                    A spiritual journey to meaningful destinations.
                                </p>

                            </div>

                        </div>


                        {/* =====================================================
                            HONEYMOON TOURS
                        ===================================================== */}

                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:scale-105 duration-300">

                            <div className="h-[195px] overflow-hidden [perspective:1000px] group">

                                <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                                    <div className="absolute inset-0 [backface-visibility:hidden]">

                                        <img
                                            src={getImageUrl(
                                                getPackage("Honeymoon Tours")?.image1,
                                                Honeymoon
                                            )}
                                            alt="Honeymoon Tours"
                                            className="w-full h-full object-cover"
                                        />

                                    </div>

                                    <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">

                                        <img
                                            src={getImageUrl(
                                                getPackage("Honeymoon Tours")?.image2,
                                                Honeymoon2
                                            )}
                                            alt="Honeymoon Tours"
                                            className="w-full h-full object-cover"
                                        />

                                    </div>

                                </div>

                            </div>


                            <div className="px-5 pb-7 text-center">

                                <div className="relative -mt-7 mb-3 flex justify-center">

                                    <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center">

                                        <FaHeart className="text-[#e4a72c] text-2xl" />

                                    </div>

                                </div>

                                <h3 className="text-lg font-bold text-[#123b70] mb-3">
                                    Honeymoon Tours
                                </h3>

                                <p className="text-sm text-gray-500 leading-6">
                                    Start your forever in the most beautiful places.
                                </p>

                            </div>

                        </div>


                        {/* =====================================================
                            BEACH HOLIDAYS
                        ===================================================== */}

                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:scale-105 duration-300">

                            <div className="h-[195px] overflow-hidden [perspective:1000px] group">

                                <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                                    <div className="absolute inset-0 [backface-visibility:hidden]">

                                        <img
                                            src={getImageUrl(
                                                getPackage("Beach Holidays")?.image1,
                                                Beach
                                            )}
                                            alt="Beach Holidays"
                                            className="w-full h-full object-cover"
                                        />

                                    </div>

                                    <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">

                                        <img
                                            src={getImageUrl(
                                                getPackage("Beach Holidays")?.image2,
                                                Beach2
                                            )}
                                            alt="Beach Holidays"
                                            className="w-full h-full object-cover"
                                        />

                                    </div>

                                </div>

                            </div>


                            <div className="px-5 pb-7 text-center">

                                <div className="relative -mt-7 mb-3 flex justify-center">

                                    <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center">

                                        <FaUmbrellaBeach className="text-[#e4a72c] text-2xl" />

                                    </div>

                                </div>

                                <h3 className="text-lg font-bold text-[#123b70] mb-3">
                                    Beach Holidays
                                </h3>

                                <p className="text-sm text-gray-500 leading-6">
                                    Sun, sand and pure relaxation.
                                </p>

                            </div>

                        </div>


                        {/* =====================================================
                            WELLNESS AND SPA
                        ===================================================== */}

                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:scale-105 duration-300">

                            <div className="h-[195px] overflow-hidden [perspective:1000px] group">

                                <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                                    <div className="absolute inset-0 [backface-visibility:hidden]">

                                        <img
                                            src={getImageUrl(
                                                getPackage("Wellness and Spa")?.image1,
                                                Spa
                                            )}
                                            alt="Wellness and Spa"
                                            className="w-full h-full object-cover"
                                        />

                                    </div>

                                    <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">

                                        <img
                                            src={getImageUrl(
                                                getPackage("Wellness and Spa")?.image2,
                                                Spa2
                                            )}
                                            alt="Wellness and Spa"
                                            className="w-full h-full object-cover"
                                        />

                                    </div>

                                </div>

                            </div>


                            <div className="px-5 pb-7 text-center">

                                <div className="relative -mt-7 mb-3 flex justify-center">

                                    <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center">

                                        <FaSpa className="text-[#e4a72c] text-2xl" />

                                    </div>

                                </div>

                                <h3 className="text-lg font-bold text-[#123b70] mb-3">
                                    Wellness and Spa
                                </h3>

                                <p className="text-sm text-gray-500 leading-6">
                                    Relax. Rejuvenate. Feel renewed.
                                </p>

                            </div>

                        </div>


                        {/* =====================================================
                            CULTURAL HOLIDAYS
                        ===================================================== */}

                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:scale-105 duration-300">

                            <div className="h-[195px] overflow-hidden [perspective:1000px] group">

                                <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                                    <div className="absolute inset-0 [backface-visibility:hidden]">

                                        <img
                                            src={getImageUrl(
                                                getPackage("Cultural Holidays")?.image1,
                                                Culture
                                            )}
                                            alt="Cultural Holidays"
                                            className="w-full h-full object-cover"
                                        />

                                    </div>

                                    <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">

                                        <img
                                            src={getImageUrl(
                                                getPackage("Cultural Holidays")?.image2,
                                                Culture2
                                            )}
                                            alt="Cultural Holidays"
                                            className="w-full h-full object-cover"
                                        />

                                    </div>

                                </div>

                            </div>


                            <div className="px-5 pb-7 text-center">

                                <div className="relative -mt-7 mb-3 flex justify-center">

                                    <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center">

                                        <FaLandmark className="text-[#e4a72c] text-2xl" />

                                    </div>

                                </div>

                                <h3 className="text-lg font-bold text-[#123b70] mb-3">
                                    Cultural Holidays
                                </h3>

                                <p className="text-sm text-gray-500 leading-6">
                                    Discover new cultures, traditions and ways of life.
                                </p>

                            </div>

                        </div>


                        {/* =====================================================
                            EDUCATIONAL TOURS
                        ===================================================== */}

                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:scale-105 duration-300">

                            <div className="h-[195px] overflow-hidden [perspective:1000px] group">

                                <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                                    <div className="absolute inset-0 [backface-visibility:hidden]">

                                        <img
                                            src={getImageUrl(
                                                getPackage("Educational Tours")?.image1,
                                                Education
                                            )}
                                            alt="Educational Tours"
                                            className="w-full h-full object-cover"
                                        />

                                    </div>

                                    <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">

                                        <img
                                            src={getImageUrl(
                                                getPackage("Educational Tours")?.image2,
                                                Education2
                                            )}
                                            alt="Educational Tours"
                                            className="w-full h-full object-cover"
                                        />

                                    </div>

                                </div>

                            </div>


                            <div className="px-5 pb-7 text-center">

                                <div className="relative -mt-7 mb-3 flex justify-center">

                                    <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center">

                                        <FaGraduationCap className="text-[#e4a72c] text-2xl" />

                                    </div>

                                </div>

                                <h3 className="text-lg font-bold text-[#123b70] mb-3">
                                    Educational Tours
                                </h3>

                                <p className="text-sm text-gray-500 leading-6">
                                    Learn, explore and grow.
                                </p>

                            </div>

                        </div>


                    </div>

                </div>

            </div>


            {/* =====================================================
                CALL TO ACTION SECTION
            ===================================================== */}

            <div
                ref={(el) => (sectionRefs.current[2] = el)}
                className="reveal bg-white pb-14 md:pb-16"
            >

                <div className="max-w-7xl mx-auto px-6 md:px-10">

                    <div className="relative bg-[#123b70] rounded-xl overflow-hidden px-6 py-8 md:px-10 md:py-10">

                        {/* Decorative Plane */}

                        <FaPlane className="absolute left-5 top-5 text-white/20 text-5xl rotate-[-20deg]" />


                        {/* CTA Content */}

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">

                            {/* Text */}

                            <div className="text-center md:text-left pl-0 md:pl-24">

                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                    Your Next Adventure Awaits
                                </h2>

                                <p className="text-sm md:text-base text-blue-100">
                                    No matter your travel goal, we have the perfect tour package for you.
                                </p>

                            </div>


                            {/* Button */}

                            <div className="flex-shrink-0">

                                <a
                                    href="https://wa.me/2348082174766"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#e9a528] hover:bg-[#d99216] text-white font-semibold px-7 py-3 rounded-full flex items-center gap-3 transition duration-300"
                                >
                                    Book Now →
                                </a>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};


export default TourPackages;