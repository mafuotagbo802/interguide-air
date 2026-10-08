import React, { useEffect, useRef, useState } from "react";
import API_URL from "../../api";
import Hotel1 from "../../assets/Hotel1.jpg";
import Hotel2 from "../../assets/Hotel2.jpg";
import Hotel3 from "../../assets/Hotel3.jpg";
import Hotel4 from "../../assets/Hotel4.jpg";

import {
  FaStar,
  FaGlobe,
  FaBed,
  FaShieldAlt,
  FaHotel,
} from "react-icons/fa";

const HotelReservations = () => {
  const sectionRefs = useRef([]);
  const [hotels, setHotels] = useState([]);

  // ==============================
  // GET HOTELS FROM BACKEND
  // ==============================
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch(
          `${API_URL}/hotels`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch hotels");
        }

        const data = await response.json();

        setHotels(data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, []);

  // ==============================
  // SCROLL REVEAL EFFECT
  // ==============================
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
        className="reveal relative h-[430px] md:h-[500px] overflow-hidden"
      >

        {/* Background Image */}
        <img
          src={Hotel1}
          alt="Hotel Reservations"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/55"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 h-full flex items-center">

          <div className="max-w-2xl text-white">

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              HOTEL RESERVATIONS
            </h1>

            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-yellow-400 mb-4">
              Comfort • Luxury • Your Choice
            </h2>

            <p className="text-base md:text-lg leading-7 text-gray-100">
              Our clients have no cause to worry about where to stay when
              they get to any destination as InterGuide help to efficiently
              actualize your choice hotel with most Five star and Four star
              rated hotels at our beck and call all around the world.
            </p>

          </div>

        </div>
      </div>


      {/* =====================================================
          HOTEL RESERVATION INFORMATION SECTION
      ===================================================== */}
      <div className="bg-white py-14 md:py-16">

        <div
          ref={(el) => (sectionRefs.current[1] = el)}
          className="reveal max-w-7xl mx-auto px-6 md:px-10"
        >

          {/* INTRODUCTION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-12">

            {/* LEFT SIDE - DESCRIPTION */}
            <div>

              {/* Decorative Line */}
              <div className="w-12 h-1 bg-yellow-400 rounded-full mb-5"></div>

              <h2 className="text-3xl md:text-4xl font-bold text-[#123b70] mb-5">
                Why Choose Our Hotel Reservations?
              </h2>

              <p className="text-gray-600 text-base md:text-lg leading-8 max-w-xl">
                We help you secure comfortable and reliable accommodation
                wherever your journey takes you. From business trips and
                family vacations to romantic getaways, we help you find
                hotels that match your preference and travel needs.
              </p>

            </div>


            {/* RIGHT SIDE - HOTEL IMAGES */}
            <div className="relative h-[300px] md:h-[350px]">

              {/* Main Hotel Image */}
              <div className="absolute left-0 top-0 w-[75%] h-[75%] rounded-xl overflow-hidden shadow-sm">

                <img
                  src={Hotel2}
                  alt="Luxury Hotel"
                  className="w-full h-full object-cover"
                />

              </div>


              {/* Top Right Image */}
              <div className="absolute right-0 top-[-10px] w-[38%] h-[48%] rounded-xl overflow-hidden border-4 border-white shadow-lg rotate-[4deg]">

                <img
                  src={Hotel3}
                  alt="Hotel Room"
                  className="w-full h-full object-cover"
                />

              </div>


              {/* Bottom Right Image */}
              <div className="absolute right-0 bottom-0 w-[40%] h-[48%] rounded-xl overflow-hidden border-4 border-white shadow-lg rotate-[-3deg]">

                <img
                  src={Hotel4}
                  alt="Hotel Building"
                  className="w-full h-full object-cover"
                />

              </div>

            </div>

          </div>


          {/* =====================================================
              HOTEL BENEFITS
          ===================================================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">

            {/* FIVE & FOUR STAR HOTELS */}
            <div className="bg-white border border-blue-100 rounded-xl p-7 text-center hover:scale-105 duration-300">

              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-5">

                <FaStar className="text-[#123b70] text-2xl" />

              </div>

              <h3 className="text-lg md:text-xl font-bold text-[#123b70] mb-3">
                Five &amp; Four Star Hotels
              </h3>

              <p className="text-gray-500 text-sm md:text-base leading-6">
                Stay at the best rated hotels worldwide.
              </p>

            </div>


            {/* GLOBAL COVERAGE */}
            <div className="bg-white border border-blue-100 rounded-xl p-7 text-center hover:scale-105 duration-300">

              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-5">

                <FaGlobe className="text-[#123b70] text-2xl" />

              </div>

              <h3 className="text-lg md:text-xl font-bold text-[#123b70] mb-3">
                Global Coverage
              </h3>

              <p className="text-gray-500 text-sm md:text-base leading-6">
                Hotels in top cities and popular destinations across the world.
              </p>

            </div>


            {/* WIDE RANGE OF OPTIONS */}
            <div className="bg-white border border-blue-100 rounded-xl p-7 text-center hover:scale-105 duration-300">

              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-5">

                <FaBed className="text-[#123b70] text-2xl" />

              </div>

              <h3 className="text-lg md:text-xl font-bold text-[#123b70] mb-3">
                Wide Range of Options
              </h3>

              <p className="text-gray-500 text-sm md:text-base leading-6">
                From luxury resorts to business hotels, find your perfect stay.
              </p>

            </div>


            {/* TRUSTED & RELIABLE */}
            <div className="bg-white border border-blue-100 rounded-xl p-7 text-center hover:scale-105 duration-300">

              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-5">

                <FaShieldAlt className="text-[#123b70] text-2xl" />

              </div>

              <h3 className="text-lg md:text-xl font-bold text-[#123b70] mb-3">
                Trusted &amp; Reliable
              </h3>

              <p className="text-gray-500 text-sm md:text-base leading-6">
                We work with reputable hotel brands for a safe and comfortable stay.
              </p>

            </div>

          </div>

        </div>


        {/* =====================================================
            HOTEL DEALS SECTION
        ===================================================== */}
        <div
          ref={(el) => (sectionRefs.current[2] = el)}
          className="reveal bg-gray-50 py-12 md:py-14 mt-14"
        >

          <div className="max-w-6xl mx-auto px-5">

            {/* Heading */}
            <div className="text-center mb-8">

              <p className="text-blue-700 font-bold text-sm uppercase">
                Hotel Deals
              </p>

              <h2 className="text-3xl font-bold text-[#123b70]">
                Amazing Hotel Deals
              </h2>

              <p className="text-gray-600 mt-2 text-sm">
                Discover comfortable stays at great prices.
              </p>

            </div>


            {/* =====================================================
                HOTEL DEAL CARDS
            ===================================================== */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {hotels.map((hotel) => (

                <div
                  key={hotel._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden flex h-70 hover:scale-105 duration-300"
                >

                  {/* HOTEL IMAGE */}
                  <div className="w-2/5 h-full bg-gray-100">

                    {hotel.image ? (

                      <img
                        src={`${API_URL}${hotel.image}`}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                      />

                    ) : (

                      <div className="w-full h-full flex items-center justify-center">

                        <FaHotel className="text-4xl text-gray-400" />

                      </div>

                    )}

                  </div>


                  {/* HOTEL DETAILS */}
                  <div className="p-4 flex-1 flex flex-col justify-between">

                    <div>

                      <h3 className="font-bold text-lg text-[#123b70]">
                        {hotel.name}
                      </h3>

                      <p className="text-sm text-gray-600">
                        {hotel.location}
                      </p>

                      <p className="text-xs text-gray-500 mt-2">
                        {hotel.description}
                      </p>

                    </div>


                    {/* PRICE + BOOK BUTTON */}
                    <div className="flex items-center justify-between">

                      <p className="font-bold text-sm text-[#123b70]">
                        {hotel.price}
                      </p>

                      <a
                        href="https://wa.me/2348121812896"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-xs font-semibold"
                      >
                        Book Now
                      </a>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>


        {/* =====================================================
            CALL TO ACTION SECTION
        ===================================================== */}
        <div
          ref={(el) => (sectionRefs.current[3] = el)}
          className="reveal bg-white pt-10 md:pt-14 pb-14 md:pb-16"
        >

          <div className="max-w-7xl mx-auto px-6 md:px-10">

            <div className="relative bg-[#123b70] rounded-xl overflow-hidden px-6 py-8 md:px-10 md:py-9">

              {/* Decorative Hotel Icon */}
              <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden md:flex">

                <FaHotel className="text-white/90 text-6xl" />

              </div>


              {/* Divider */}
              <div className="absolute left-28 top-1/2 -translate-y-1/2 h-16 w-px bg-white/50 hidden md:block">
              </div>


              {/* CTA Content */}
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Text */}
                <div className="text-center md:text-left md:pl-44">

                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Let Us Handle Your Hotel Booking
                  </h2>

                  <p className="text-sm md:text-base text-blue-100">
                    Relax and enjoy your trip while we take care of your accommodation.
                  </p>

                </div>


                {/* Button */}
                <div className="flex-shrink-0">

                  <a
                    href="https://wa.me/2348121812896"
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

    </div>
  );
};

export default HotelReservations;