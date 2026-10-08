import React, { useEffect, useRef, useState } from 'react';
import API_URL from "../../api";
import Flight2 from '../../assets/Flight2.jpg';
import CheapestFares from '../../assets/CheapestFares.jpg';
import ExclusiveDiscounts from '../../assets/ExclusiveDiscounts.jpg';
import InstantTicket from '../../assets/InstantTicket.jpg';
import Support from '../../assets/Support.jpg';
import TravelConsultants from '../../assets/TravelConsultants.jpg';
import Travel from '../../assets/Travel.png';

import {
  FaHotel,
  FaPlane,
} from "react-icons/fa";


const Flight = () => {
  const pageRef = useRef(null);

  // =====================================================
  // FLIGHT DATA
  // =====================================================

  const [flights, setFlights] = useState([]);


  // =====================================================
  // FETCH FLIGHTS FROM MONGODB
  // =====================================================

  useEffect(() => {

    const fetchFlights = async () => {

      try {

        const response = await fetch(
          `${API_URL}/flights`
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(
            data.message || "Failed to fetch flights"
          );

          return;
        }

        setFlights(data);

      } catch (error) {

        console.error(
          "Error fetching flights:",
          error
        );

      }

    };

    fetchFlights();

  }, []);


  // =====================================================
  // SCROLL POP EFFECT
  // =====================================================

  useEffect(() => {

    if (!pageRef.current) return;

    const sections =
      pageRef.current.querySelectorAll(
        ".scroll-pop"
      );

    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "opacity-100",
                "translate-y-0"
              );

              entry.target.classList.remove(
                "opacity-0",
                "translate-y-16"
              );

            }

          });

        },
        {
          threshold: 0.15,
        }
      );


    sections.forEach((section) =>
      observer.observe(section)
    );


    return () => {

      sections.forEach((section) =>
        observer.unobserve(section)
      );

    };

  }, []);


  return (

    <div ref={pageRef}>

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <div className="scroll-pop opacity-0 translate-y-16 transition-all duration-1000 ease-out relative py-24 md:py-32">

        <img
          src={Flight2}
          alt="Flight"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative container mx-auto px-4 md:px-6">

          <h1 className="text-4xl text-white md:text-5xl lg:text-6xl font-bold mb-4">
            FLIGHTS
          </h1>

          <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-4">
            Your Journey Starts Here
          </h2>

          <p className="max-w-3xl text-white text-bold text-sm md:text-base mt-2 leading-relaxed">
            Our partnership with several airlines for both domestic and international travel
            offers us the opportunity to give the cheapest fares and even send in
            promotional/discounted flight fares from time to time while sparing our clients,
            time and money wastage at airlines' offices with our issuance of tickets immediately.
          </p>

        </div>

      </div>


      {/* =====================================================
          FEATURES SECTION
      ===================================================== */}

      <div className="scroll-pop opacity-0 translate-y-16 transition-all duration-1000 ease-out bg-white py-12 md:py-16 border-b border-gray-200">

        <div className="container mx-auto px-4 md:px-50">

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">


            {/* CHEAPEST FARES */}

            <div className="hover:scale-105 duration-300">

              <img
                src={CheapestFares}
                alt="Cheapest Fares"
                className="w-16 h-16 object-contain mx-auto mb-3"
              />

              <h4 className="font-bold text-navy">
                Cheapest Fares
              </h4>

              <p className="text-sm text-gray-600 mt-1">
                Get the best prices through our airline partnerships.
              </p>

            </div>


            {/* EXCLUSIVE DISCOUNTS */}

            <div className="hover:scale-105 duration-300">

              <img
                src={ExclusiveDiscounts}
                alt="Exclusive Discounts"
                className="w-16 h-16 object-contain mx-auto mb-3"
              />

              <h4 className="font-bold text-navy">
                Exclusive Discounts
              </h4>

              <p className="text-sm text-gray-600 mt-1">
                Access promotional and discounted fares from time to time.
              </p>

            </div>


            {/* INSTANT TICKET */}

            <div className="hover:scale-105 duration-300">

              <img
                src={InstantTicket}
                alt="Instant Ticket Issuance"
                className="w-16 h-16 object-contain mx-auto mb-3"
              />

              <h4 className="font-bold text-navy">
                Instant Ticket Issuance
              </h4>

              <p className="text-sm text-gray-600 mt-1">
                Skip the queues — we issue your tickets immediately.
              </p>

            </div>


            {/* SUPPORT */}

            <div className="hover:scale-105 duration-300">

              <img
                src={Support}
                alt="24/7 CRM Support"
                className="w-16 h-16 object-contain mx-auto mb-3"
              />

              <h4 className="font-bold text-navy">
                24/7 CRM Support
              </h4>

              <p className="text-sm text-gray-600 mt-1">
                Our online customer service is always available.
              </p>

            </div>


            {/* TRAVEL CONSULTANTS */}

            <div className="hover:scale-105 duration-300">

              <img
                src={TravelConsultants}
                alt="Expert Travel Consultants"
                className="w-16 h-16 object-contain mx-auto mb-3"
              />

              <h4 className="font-bold text-navy">
                Expert Travel Consultants
              </h4>

              <p className="text-sm text-gray-600 mt-1">
                Our skilled staff are ready to assist you, online and offline.
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          CHEAPEST FLIGHTS SECTION
      ===================================================== */}

      <div className="scroll-pop opacity-0 translate-y-16 transition-all duration-1000 ease-out bg-gray-50 py-14 md:py-16">

        <div className="max-w-7xl mx-auto px-6 md:px-8">

          {/* HEADING */}

          <div className="text-center mb-10">

            <p className="text-blue-700 font-bold text-sm uppercase">
              Flight Deals
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-[#123b70]">
              Cheapest Flight Deals
            </h2>

            <p className="text-gray-600 mt-2 text-sm md:text-base">
              Discover some of our best available flight deals.
            </p>

          </div>


          {/* =====================================================
              FLIGHT DEALS FROM MONGODB
          ===================================================== */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {flights.map((flight) => (

              <div
                key={flight._id}
                className="bg-white rounded-xl shadow-md overflow-hidden flex h-64 md:h-72 hover:scale-105 duration-300"
              >

                {/* =================================================
                    FLIGHT IMAGE
                ================================================= */}

                <div className="w-2/5 h-full flex-shrink-0">

                  {flight.image ? (

                    <img
                      src={`${API_URL}${flight.image}`}
                      alt={flight.airline}
                      className="w-full h-full object-cover"
                    />

                  ) : (

                    <div className="w-full h-full flex items-center justify-center bg-gray-100">

                      <FaPlane className="text-5xl text-gray-400" />

                    </div>

                  )}

                </div>


                {/* =================================================
                    FLIGHT DETAILS
                ================================================= */}

                <div className="p-5 flex-1 flex flex-col justify-between">

                  <div>

                    <h3 className="font-bold text-xl text-[#123b70]">
                      {flight.airline}
                    </h3>

                    <p className="text-base font-semibold text-gray-700 mt-1">
                      {flight.departure} → {flight.destination}
                    </p>

                    <p className="text-sm text-gray-500 mt-3">
                      {flight.startDate} - {flight.endDate}
                    </p>

                  </div>


                  {/* =================================================
                      PRICE + BOOK BUTTON
                  ================================================= */}

                  <div className="flex items-center justify-between gap-3">

                    <p className="font-bold text-sm text-[#123b70]">
                      {flight.price}
                    </p>

                    <a
                      href="https://wa.me/2348082174766"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md text-sm font-semibold"
                    >
                      Book Now
                    </a>

                  </div>

                </div>

              </div>

            ))}


            {/* =====================================================
                NO FLIGHTS MESSAGE
            ===================================================== */}

            {flights.length === 0 && (

              <div className="col-span-full text-center py-10">

                <FaPlane className="text-4xl text-gray-300 mx-auto mb-3" />

                <p className="text-gray-500">
                  No flight deals available at the moment.
                </p>

              </div>

            )}

          </div>

        </div>

      </div>


      {/* =====================================================
          WHY BOOK WITH US
      ===================================================== */}

      <div className="scroll-pop opacity-0 translate-y-16 transition-all duration-1000 ease-out bg-[#eef9ff] py-12 md:py-16 overflow-hidden">

        <div className="max-w-7xl mx-auto px-6 md:px-10">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-2 items-center">


            {/* LEFT SIDE */}

            <div className="max-w-xl">

              <div className="flex items-center gap-2 mb-4">

                <p className="text-blue-700 font-bold text-sm tracking-wide uppercase">
                  Why Book With Us?
                </p>

              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#123b70] leading-tight">

                Your Journey,

                <span className="text-blue-600">
                  Our Priority
                </span>

              </h2>

              <p className="text-gray-700 text-base md:text-lg leading-7 mt-5 max-w-lg">
                Whether you're travelling for business, family, or leisure, we make
                flight bookings simple, fast, and stress-free. With our wide network
                of trusted airlines, competitive fares, and dedicated support, you
                can focus on what matters most — enjoying your journey.
              </p>

            </div>


            {/* RIGHT SIDE */}

            <div className="relative flex justify-center lg:justify-end">

              <div className="absolute w-[240px] h-[240px] md:w-[320px] md:h-[320px] lg:w-[400px] lg:h-[400px] bg-blue-100 rounded-full right-0 top-1/2 -translate-y-1/2">
              </div>

              <img
                src={Travel}
                alt="Travel passport suitcase and destination"
                className="relative z-10 w-full max-w-[480px] object-contain"
              />

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          CALL TO ACTION
      ===================================================== */}

      <div className="scroll-pop opacity-0 translate-y-16 transition-all duration-1000 ease-out bg-white pt-10 md:pt-14 pb-14 md:pb-16">

        <div className="max-w-7xl mx-auto px-6 md:px-10">

          <div className="relative bg-[#123b70] rounded-xl overflow-hidden px-6 py-8 md:px-10 md:py-9">


            {/* HOTEL ICON */}

            <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden md:flex">

              <FaHotel className="text-white/90 text-6xl" />

            </div>


            {/* DIVIDER */}

            <div className="absolute left-28 top-1/2 -translate-y-1/2 h-16 w-px bg-white/50 hidden md:block">
            </div>


            {/* CTA CONTENT */}

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">


              {/* TEXT */}

              <div className="text-center md:text-left md:pl-44">

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Let Us Handle Your Flight Booking
                </h2>

                <p className="text-sm md:text-base text-blue-100">
                  Relax and enjoy your trip.
                </p>

              </div>


              {/* BUTTON */}

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

export default Flight;