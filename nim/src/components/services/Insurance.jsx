import React, { useEffect, useRef } from "react";
import InsuranceHero from "../../assets/InsuranceHero.jpg";
import {
  FaShieldAlt,
  FaHeartbeat,
  FaPlaneDeparture,
  FaSuitcaseRolling,
  FaFileAlt,
  FaClock,
  FaCar,
  FaHotel,
  FaTicketAlt,
  FaPassport,
  FaShip,
  FaComments,
  FaArrowRight,
} from "react-icons/fa";

const Insurance = () => {
  const pageRef = useRef(null);

  // SCROLL POP ANIMATION
  useEffect(() => {
    const sections = pageRef.current.querySelectorAll(".scroll-pop");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-16");
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const services = [
    {
      icon: <FaComments />,
      title: "Travel Advice",
      text: "Get professional travel guidance to help you plan your journey with confidence.",
    },
    {
      icon: <FaPassport />,
      title: "Visa Assistance",
      text: "We guide you through the visa application process and help you prepare the required documents.",
    },
    {
      icon: <FaPlaneDeparture />,
      title: "Booking",
      text: "Plan your trip with convenient booking solutions tailored to your travel needs.",
    },
    {
      icon: <FaTicketAlt />,
      title: "Ticketing",
      text: "Enjoy convenient domestic and international flight ticketing through our travel service.",
    },
    {
      icon: <FaShip />,
      title: "Cruises & Tours",
      text: "Discover exciting cruise experiences and carefully planned tour packages.",
    },
    {
      icon: <FaHotel />,
      title: "Hotel Reservations",
      text: "Find comfortable accommodation with our hotel reservation service worldwide.",
    },
    {
      icon: <FaCar />,
      title: "Car Rental",
      text: "Enjoy reliable transportation with convenient car rental options for your trip.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Travel Insurance",
      text: "Protect your journey with suitable travel insurance from our trusted insurance partners.",
    },
  ];

  const coverage = [
    {
      icon: <FaHeartbeat />,
      title: "Emergency Medical Expenses",
      text: "Coverage for eligible emergency medical expenses while travelling.",
    },
    {
      icon: <FaPlaneDeparture />,
      title: "Medical Evacuation",
      text: "Support for eligible medical evacuation and repatriation situations.",
    },
    {
      icon: <FaFileAlt />,
      title: "Trip Cancellation",
      text: "Protection for eligible trip cancellation or interruption situations.",
    },
    {
      icon: <FaClock />,
      title: "Travel Delays",
      text: "Coverage for eligible expenses resulting from travel delays.",
    },
    {
      icon: <FaSuitcaseRolling />,
      title: "Baggage Protection",
      text: "Protection for lost, delayed or damaged baggage, subject to policy terms.",
    },
    {
      icon: <FaFileAlt />,
      title: "Personal Belongings",
      text: "Coverage may include eligible personal belongings and travel documents.",
    },
  ];

  return (
    <div ref={pageRef} className="overflow-hidden">
      {/* HERO SECTION */}
        <div className="scroll-pop opacity-0 translate-y-16 transition-all duration-1000 ease-out relative py-24 md:py-32">
            <img src={InsuranceHero} alt="Travel Insurance" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="relative container mx-auto px-6 md:px-10">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
                    TRAVEL INSURANCE
                </h1>
                <br />
                <p className="text-xl md:text-2xl lg:text-3xl font-bold text-yellow-400 mb-4">
                    Travel With Confidence
                </p>
                <p className="text-white text-base md:text-lg max-w-2xl mt-5 leading-relaxed">
                    Protect your journey and travel with greater peace of mind.
                    We've got you covered.
                </p>
            </div>
        </div>

        {/* INTRODUCTION SECTION */}
        <div className="scroll-pop opacity-0 translate-y-16 transition-all duration-1000 ease-out bg-white py-14 md:py-20">
            <div className="max-w-6xl mx-auto px-6 md:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    {/* TEXT */}
                    <div>
                        <p className="text-blue-600 font-bold text-sm uppercase tracking-wider">
                            Travel Protection
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#123b70] mt-2">
                            Travel With Confidence.
                            <span className="text-blue-600"> We've Got You Covered.</span>
                        </h2>
                        <p className="text-gray-600 mt-5 leading-7">
                            At InterGuide Air Services, we understand that travel involves
                            more than booking a flight and hotel. That is why we help our
                            clients put the right travel protection in partnership with
                            renowned insurance partners to keep client travel safe even
                            before they depart.
                        </p>
                        <p className="text-gray-600 mt-4 leading-7">
                            Travel with confidence. We've got you covered.
                        </p>
                    </div>
                    {/* COLORFUL CARD */}
                    <div className="bg-gradient-to-br from-blue-600 to-[#123b70] rounded-2xl p-8 md:p-10 text-white shadow-xl">
                        <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-6">
                            <FaShieldAlt className="text-[#123b70] text-3xl" />
                        </div>
                        <h3 className="text-2xl font-bold">
                            Protect Your Journey
                        </h3>
                        <p className="text-blue-100 mt-3 leading-7">
                            The right travel insurance can help protect you against
                            eligible unexpected events that may occur during your trip.
                        </p>
                        <div className="mt-6 flex items-center gap-3">
                            <div className="w-10 h-1 bg-yellow-400"></div>
                            <span className="text-sm font-semibold">
                                Peace of Mind Starts Before You Travel
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* INSURANCE COVERAGE SECTION */}
        <div className="scroll-pop opacity-0 translate-y-16 transition-all duration-1000 ease-out bg-[#eef9ff] py-14 md:py-20">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="text-center mb-10">
                    <p className="text-blue-600 font-bold text-sm uppercase tracking-wider">
                        Coverage
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#123b70] mt-2">
                        Depending On Your Policy
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                        Depending on the selected policy and applicable terms and
                        conditions, coverage may include:
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coverage.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                        <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mb-5">
                            {item.icon}
                        </div>
                        <h3 className="text-lg font-bold text-[#123b70]">
                            {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-6 mt-2">
                            {item.text}
                        </p>
                    </div>
                    ))}
                </div>
            </div>
        </div>

        {/* PEACE OF MIND SECTION */}
        <div className="scroll-pop opacity-0 translate-y-16 transition-all duration-1000 ease-out bg-white py-14 md:py-20">
            <div className="max-w-5xl mx-auto px-6 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-yellow-100 flex items-center justify-center mb-6">
                    <FaShieldAlt className="text-yellow-500 text-4xl" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#123b70]">
                    Don't Leave Your Journey To Chance
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto mt-5 leading-7">
                    Get the right travel insurance before you travel and enjoy
                    greater peace of mind throughout your trip.
                </p>
            </div>
        </div>

      {/* CORPORATE TRAVEL ACCOUNT */}
        <div className="scroll-pop opacity-0 translate-y-16 transition-all duration-1000 ease-out bg-gradient-to-r from-[#123b70] to-blue-600 py-14 md:py-16">
            <div className="max-w-6xl mx-auto px-6 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <p className="text-yellow-400 font-bold text-sm uppercase tracking-wider">
                            For Businesses
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
                            Corporate Travel Account
                        </h2>
                    </div>
                    <div>
                        <p className="text-blue-100 leading-7">
                            We maintain a travel account for our corporate clients in such
                            a way as to present a clear, precise and unambiguous statement
                            to them. Our clients have always found this to be honest and
                            reliable.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* OUR SERVICES SECTION */}
        <div className="scroll-pop opacity-0 translate-y-16 transition-all duration-1000 ease-out bg-gray-50 py-14 md:py-20">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="text-center mb-12">
                    <p className="text-blue-600 font-bold text-sm uppercase tracking-wider">
                        InterGuide Air Services
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#123b70] mt-2">
                        Our Services
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                        From planning your journey to getting you safely to your
                        destination, we provide a range of travel services designed
                        around your needs.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-blue-600">
                        <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mb-5">
                            {service.icon}
                        </div>
                        <h3 className="text-lg font-bold text-[#123b70]">
                            {service.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-6 mt-2">
                            {service.text}
                        </p>
                    </div>
                    ))}
                </div>
            </div>
        </div>

        {/* FINAL CTA */}
        <div className="scroll-pop opacity-0 translate-y-16 transition-all duration-1000 ease-out bg-white pb-14 md:pb-16">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="relative bg-[#123b70] rounded-2xl overflow-hidden px-6 py-10 md:px-12 md:py-12">
                    {/* Decorative Circle */}
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/30 rounded-full"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl md:text-3xl font-bold text-white">
                                Ready To Protect Your Journey?
                            </h2>
                            <p className="text-blue-100 mt-2">
                                Speak with our travel team about your travel insurance needs.
                            </p>
                        </div>
                        <a
                            href="https://wa.me/2348121812896"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 bg-[#e9a528] hover:bg-[#d99216] text-white font-semibold px-7 py-3 rounded-full flex items-center gap-3 transition duration-300">
                            Get in Touch
                            <FaArrowRight className="text-sm" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Insurance;