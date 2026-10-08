import React, { useState, useEffect } from "react";
import About from "../../assets/About.jpg";
import Hero1 from "../../assets/Hero1.jpg";
import Hero2 from "../../assets/Hero2.jpg";
import Hero3 from "../../assets/Hero3.jpg";
import Hero4 from "../../assets/Hero4.jpg";
import Hero5 from "../../assets/Hero5.jpeg";
import Flight from "../../assets/Flight.jpg";
import TourPackages from "../../assets/Tour Packages.jpg";
import Sabre from "../../assets/Sabre.png";
import Parallax2 from "../../assets/Parallax2.png";
import KICC from "../../assets/KICC.png";
import { Link } from "react-router-dom";
import API_URL from "../../api";

const heroSlides = [
    {
        image: Hero5,
        title: "InterGuide Air Service.",
        description: "...........We Plan, You Travel",
        button: "Learn More",
        link: "/AboutUs"
    },
    {
        image: Hero2,
        title: "Cheapest & Hottest Flight Deals.",
        description:
            "Fly more, Pay less! Get the best flight deals to your favorite destinations around the world.",
        button: "Explore Flights",
        link: "/Flight"
    },
    {
        image: Hero1,
        title: "Amazing Hotels Deals.",
        description:
            "Find beautiful hotels at unbeatable prices and enjoy comfort wherever your journey takes you.",
        button: "Hotels Reservations",
        link: "/HotelReservations"
    },
    {
        image: Hero3,
        title: "Car Rentals.",
        description:
            "Explore reliable car rentals at great prices and enjoy a smooth journey wherever you go.",
        button: "Insurance",
        link: "/Insurance"
    },
    {
        image: Hero4,
        title: "Currency.",
        description:
            "Get the best currency exchange rates and enjoy hassle-free transactions for your international travels.",
        button: "Vacation Packages",
        link: "/TourPackages"
    },
];


// =====================================================
// SCROLL ANIMATION
// =====================================================

const ScrollAnimation = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [element, setElement] = useState(null);

    useEffect(() => {
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(element);
                }
            },
            {
                threshold: 0.15,
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [element]);

    return (
        <div
            ref={setElement}
            className={`transition-all duration-1000 ease-out ${
                isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-16 scale-95"
            }`}
        >
            {children}
        </div>
    );
};


// =====================================================
// HOME COMPONENT
// =====================================================

const Home = () => {

    const [currentImage, setCurrentImage] = useState(0);

    // HOME OFFERS DATA
    const [flightDeals, setFlightDeals] = useState([]);
    const [tourPackages, setTourPackages] = useState([]);


    // =====================================================
    // HERO SLIDESHOW
    // =====================================================

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage(
                (prevImage) =>
                    (prevImage + 1) % heroSlides.length
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);


    // =====================================================
    // FETCH HOME FLIGHT DEALS & TOUR PACKAGES
    // =====================================================

    useEffect(() => {

        const fetchHomeData = async () => {

            try {

                const [flightResponse, tourResponse] =
                    await Promise.all([
                        fetch(
                            `${API_URL}/home-flights`
                        ),
                        fetch(
                            `${API_URL}/home-tours`
                        ),
                    ]);


                const flightData =
                    await flightResponse.json();

                const tourData =
                    await tourResponse.json();


                if (flightResponse.ok) {
                    setFlightDeals(flightData);
                }


                if (tourResponse.ok) {
                    setTourPackages(tourData);
                }

            } catch (error) {

                console.error(
                    "Error fetching home data:",
                    error
                );

            }

        };

        fetchHomeData();

    }, []);


    const currentSlides = heroSlides[currentImage];


    return (
        <div>


            {/* =====================================================
                HERO SECTION
            ===================================================== */}

            <div className="relative overflow-hidden">

                <img
                    src={currentSlides.image}
                    alt="Travel"
                    className="w-full h-[600px] md:h-[700px] object-cover blur-[1px] scale-105"
                />

                <div className="absolute inset-0 bg-black/50"></div>


                {/* Hero Text */}

                <div
                    key={currentImage}
                    className="absolute inset-1 flex flex-col justify-center items-center"
                >

                    <div className="text-left px-15 animate-[popText_1s_ease-out] z-10">

                        <h1 className="text-yellow-500 text-5xl md:text-7xl font-bold">
                            {currentSlides.title}
                        </h1>

                        <p className="text-white text-sm md:text-lg mt-4 max-w-lg">
                            {currentSlides.description}
                        </p>

                        <Link
                            to={currentSlides.link}
                            className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-9 py-5 rounded-md text-sm md:text-2xl transition-all duration-300 group"
                        >

                            {currentSlides.button}

                            <span className="inline-block ml-2 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-125">
                                →
                            </span>

                        </Link>

                    </div>

                </div>

            </div>


            {/* =====================================================
                ABOUT INTERGUIDE AIR SECTION
            ===================================================== */}

            <ScrollAnimation>

                <div className="w-full bg-white py-20">

                    <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">


                        {/* About Image */}

                        <div className="w-full h-[350px] md:h-[430px] overflow-hidden">

                            <img
                                src={About}
                                alt="InterGuide Air Ltd Travel"
                                className="w-full h-full object-cover"
                            />

                        </div>


                        {/* About Content */}

                        <div className="px-6 md:px-8">

                            <p className="text-blue-600 font-bold text-sm tracking-wider uppercase">
                                About InterGuide Air Service
                            </p>


                            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mt-2 leading-tight">

                                Nigeria's Foremost
                                <br />
                                Travel Agency

                            </h2>


                            <p className="text-gray-600 mt-5 leading-relaxed max-w-xl">

                                With over 3 Decades of travel agency operations,
                                InterGuide Air Ltd has built a reputation for excellence,
                                reliability and customer satisfaction.

                            </p>


                            {/* Company Highlights */}

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">


                                {/* Trusted */}

                                <div className="text-center border-r border-gray-200 hover:scale-105 duration-300">

                                    <div className="text-blue-600 text-2xl mb-2">
                                        🛡️
                                    </div>

                                    <h3 className="font-bold text-sm text-gray-800">
                                        Trusted
                                    </h3>

                                    <p className="text-xs text-gray-500 mt-1">
                                        Since 1993
                                    </p>

                                </div>


                                {/* Global Network */}

                                <div className="text-center border-r border-gray-200 hover:scale-105 duration-300">

                                    <div className="text-blue-600 text-2xl mb-2">
                                        🌐
                                    </div>

                                    <h3 className="font-bold text-sm text-gray-800">
                                        Global
                                    </h3>

                                    <p className="text-xs text-gray-500 mt-1">
                                        Network
                                    </p>

                                </div>


                                {/* Professional Team */}

                                <div className="text-center border-r border-gray-200 hover:scale-105 duration-300">

                                    <div className="text-blue-600 text-2xl mb-2">
                                        👥
                                    </div>

                                    <h3 className="font-bold text-sm text-gray-800">
                                        Professional
                                    </h3>

                                    <p className="text-xs text-gray-500 mt-1">
                                        Team
                                    </p>

                                </div>


                                {/* Customer Satisfaction */}

                                <div className="text-center hover:scale-105 duration-300">

                                    <div className="text-blue-600 text-2xl mb-2">
                                        ⭐
                                    </div>

                                    <h3 className="font-bold text-sm text-gray-800">
                                        Customer
                                    </h3>

                                    <p className="text-xs text-gray-500 mt-1">
                                        Satisfaction
                                    </p>

                                </div>

                            </div>


                            {/* Excellence Badge */}

                            <div className="mt-8">

                                <div className="text-gray-700 px-7 py-4 rounded-full shadow-md">

                                    <p className="font-bold text-sm text-center">
                                        Over 3 Decades of Excellence
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </ScrollAnimation>


            {/* =====================================================
                OFFERS & DEALS SECTION
            ===================================================== */}

            <ScrollAnimation>

                <div className="w-full bg-blue-50 py-20 px-5 md:px-20">

                    <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">


                        {/* =================================================
                            SECTION INTRODUCTION
                        ================================================= */}

                        <div className="flex flex-col justify-center">

                            <p className="text-blue-600 font-bold text-sm md:text-5xl uppercase tracking-wider">
                                Offers & Deals
                            </p>

                            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mt-2 leading-tight">

                                Special Promos &<br />
                                Hot Deals

                            </h2>

                            <p className="text-gray-600 mt-5 leading-relaxed max-w-sm">

                                Make the most of our limited-time offers,
                                exclusive discounts and seasonal deals.
                                Travel more. Save more!

                            </p>

                        </div>


                        {/* =================================================
                            CHEAP FLIGHT DEALS
                        ================================================= */}

                        {flightDeals.length > 0 && (

                            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:scale-105 duration-300 flex flex-col h-full min-h-[400px]">


                                {/* Image */}

                                <div className="relative h-65 md:h-60">

                                    {flightDeals[0].image ? (

                                        <img
                                            src={`${API_URL}${flightDeals[0].image}`}
                                            alt={flightDeals[0].title}
                                            className="w-full h-full object-cover"
                                        />

                                    ) : (

                                        <img
                                            src={Flight}
                                            alt="Cheap Flight Deals"
                                            className="w-full h-full object-cover"
                                        />

                                    )}


                                    {/* Label */}

                                    <span className="absolute bottom-3 left-4 bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-full">

                                        {flightDeals[0].label}

                                    </span>

                                </div>


                                {/* Card Content */}

                                <div className="p-6 flex-1 flex flex-col justify-between">

                                    <div>

                                        <h3 className="text-xl font-bold text-blue-950">

                                            {flightDeals[0].title}

                                        </h3>


                                        <p className="text-gray-600 text-sm mt-3 leading-relaxed">

                                            {flightDeals[0].description}

                                        </p>

                                    </div>


                                    <div className="mt-4">

                                        <p className="text-blue-600 font-bold">

                                            From{" "}

                                            <span className="text-sm">

                                                {flightDeals[0].price}

                                            </span>

                                        </p>


                                        <Link
                                            to="/Flight"
                                            className="inline-block mt-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm transition-colors duration-300"
                                        >

                                            {flightDeals[0].buttonText ||
                                                "Explore"}

                                            {" →"}

                                        </Link>

                                    </div>

                                </div>

                            </div>

                        )}


                        {/* =================================================
                            TOUR PACKAGES
                        ================================================= */}

                        {tourPackages.length > 0 && (

                            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:scale-105 duration-300 flex flex-col h-full min-h-[400px] md:min-h-[500px]">


                                {/* Image */}

                                <div className="relative h-72 md:h-60">

                                    {tourPackages[0].image ? (

                                        <img
                                            src={`${API_URL}${tourPackages[0].image}`}
                                            alt={tourPackages[0].title}
                                            className="w-full h-full object-cover"
                                        />

                                    ) : (

                                        <img
                                            src={TourPackages}
                                            alt="Tour Packages"
                                            className="w-full h-full object-cover"
                                        />

                                    )}


                                    {/* Label */}

                                    <span className="absolute bottom-3 left-4 bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-full">

                                        {tourPackages[0].label}

                                    </span>

                                </div>


                                {/* Card Content */}

                                <div className="p-6 flex-1 flex flex-col justify-between">

                                    <div>

                                        <h3 className="text-xl font-bold text-blue-950">

                                            {tourPackages[0].title}

                                        </h3>


                                        <p className="text-gray-600 text-sm mt-3 leading-relaxed">

                                            {tourPackages[0].description}

                                        </p>

                                    </div>


                                    <div className="mt-4">

                                        <p className="text-blue-600 font-bold">

                                            Starting{" "}

                                            <span className="text-sm">

                                                {tourPackages[0].price}

                                            </span>

                                        </p>


                                        <Link
                                            to="/TourPackages"
                                            className="inline-block mt-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm transition-colors duration-300"
                                        >

                                            {tourPackages[0].buttonText ||
                                                "Explore"}

                                            {" →"}

                                        </Link>

                                    </div>

                                </div>

                            </div>

                        )}

                    </div>

                </div>

            </ScrollAnimation>


            {/* =====================================================
                OUR CLIENTS SECTION
            ===================================================== */}

            <ScrollAnimation>

                <div className="w-full bg-white py-14 px-5 md:px-20">

                    <div className="max-w-[1200px] mx-auto">


                        {/* Section Heading */}

                        <div className="text-center mb-10">

                            <p className="text-blue-600 font-bold text-sm uppercase tracking-wider">
                                Our Clients
                            </p>

                            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mt-2">
                                See What Our Clients Have to Say
                            </h2>

                            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">

                                We are proud to work with trusted organizations and
                                provide reliable travel solutions that make every journey easier.

                            </p>

                        </div>


                        {/* Client Testimonials */}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">


                            {/* Sabre */}

                            <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:scale-105 duration-300 flex flex-col h-full min-h-[280px] md:min-h-[320px]">

                                <div className="flex-1 flex flex-col">

                                    <img
                                        src={Sabre}
                                        alt="Sabre Logo"
                                        className="py-5 w-40 h-auto md:w-48"
                                    />

                                    <p className="text-gray-600 text-sm leading-relaxed mt-2 flex-1">

                                        InterGuide Air Services provides excellent travel service
                                        and professional support. Their team is reliable and
                                        always ready to assist.

                                    </p>

                                    <div className="mt-5 pt-4 border-t border-gray-200">

                                        <h3 className="font-bold text-blue-950">
                                            Sabre
                                        </h3>

                                        <p className="text-gray-500 text-xs">
                                            Trusted Partner
                                        </p>

                                    </div>

                                </div>

                            </div>


                            {/* Parallex */}

                            <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:scale-105 duration-300 flex flex-col h-full min-h-[350px] md:min-h-[400px]">

                                <div className="flex-1 flex flex-col">

                                    <img
                                        src={Parallax2}
                                        alt="Parallex Logo"
                                        className="py-5 w-40 h-auto md:w-48"
                                    />

                                    <p className="text-gray-600 text-sm leading-relaxed mt-2 flex-1">

                                        Working with InterGuide Air Service has been a great
                                        experience. Their professionalism and attention to
                                        detail are outstanding.

                                    </p>

                                    <div className="mt-5 pt-4 border-t border-gray-200">

                                        <h3 className="font-bold text-blue-950">
                                            Parallex
                                        </h3>

                                        <p className="text-gray-500 text-xs">
                                            Valued Client
                                        </p>

                                    </div>

                                </div>

                            </div>


                            {/* DeepBluesea */}

                            <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:scale-105 duration-300 flex flex-col h-full min-h-[350px] md:min-h-[400px]">

                                <div className="flex-1 flex flex-col">

                                    <div className="text-blue-600 text-3xl font-bold">
                                        "
                                    </div>

                                    <p className="text-gray-600 text-sm leading-relaxed mt-2 flex-1">

                                        We appreciate the quality of service and commitment
                                        InterGuide Air brings to every travel arrangement.

                                    </p>

                                    <div className="mt-5 pt-4 border-t border-gray-200">

                                        <h3 className="font-bold text-blue-950">
                                            DeepBluesea
                                        </h3>

                                        <p className="text-gray-500 text-xs">
                                            Valued Client
                                        </p>

                                    </div>

                                </div>

                            </div>


                            {/* KICC */}

                            <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:scale-105 duration-300 flex flex-col h-full min-h-[350px] md:min-h-[400px]">

                                <div className="flex-1 flex flex-col">

                                    <img
                                        src={KICC}
                                        alt="KICC Logo"
                                        className="py-5 w-40 h-auto md:w-48"
                                    />

                                    <p className="text-gray-600 text-sm leading-relaxed mt-2 flex-1">

                                        InterGuide Air Service continues to deliver dependable
                                        travel solutions with excellent customer service.

                                    </p>

                                    <div className="mt-5 pt-4 border-t border-gray-200">

                                        <h3 className="font-bold text-blue-950">
                                            KICC
                                        </h3>

                                        <p className="text-gray-500 text-xs">
                                            Trusted Client
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Client Trust Message */}

                        <div className="text-center mt-12">

                            <p className="text-gray-600 text-sm">

                                Trusted by businesses and travelers for reliable
                                travel solutions.

                            </p>

                        </div>

                    </div>

                </div>

            </ScrollAnimation>

        </div>
    );
};

export default Home;