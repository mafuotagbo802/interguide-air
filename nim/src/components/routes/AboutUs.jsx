import React, { useEffect, useRef } from "react";
import About1 from '../../assets/About1.jpg';
import About2 from '../../assets/About2.jpg';
import IATA from '../../assets/IATA.png';
import NANTA from '../../assets/NANTA.png';
import Bode from '../../assets/Bode.png';
import Niyi from '../../assets/Niyi.png';
import Christiana from '../../assets/Christiana.png';
import Titi from '../../assets/Titi.jpeg';
import {
  FaEye,
  FaBullseye,
  FaGem,
  FaStar,
  FaPlane,
  FaUsers,
  FaShieldAlt,
  FaAward,
} from "react-icons/fa";


const AboutUs = () => {
const sectionRefs = useRef([]);

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
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <div
        ref={(el) => (sectionRefs.current[0] = el)}
        className="reveal relative h-[430px] md:h-[500px] overflow-hidden">
        {/* Background Image */}
        <img src={About1} alt="About InterGuide" className="absolute inset-0 w-full h-full object-cover" />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/55">
        </div>
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              ABOUT US
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-yellow-400 mb-4">
              Your Trusted Travel Partner
            </h2>
            <p className="text-base md:text-lg leading-7 text-gray-100">
              InterGuide Air Service is a Travel Management Company, an arm of
              InterGuide Group of Companies, A one stop travel shop that has
              been in operation for decades in the aviation support industry
              in Nigeria and worldwide, with the aim to offer excellent
              travel experience.
            </p>
          </div>
        </div>
      </div>

      {/* WHO WE ARE */}
      <div
        ref={(el) => (sectionRefs.current[1] = el)}
        className="reveal bg-white py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* LEFT SIDE - IMAGE */}
            <div className="relative">
              <div className="rounded-xl overflow-hidden shadow-sm">
                <img src={About2} alt="InterGuide Air Ltd" className="w-full h-[300px] md:h-[380px] object-cover" />
              </div>
            </div>
            {/* RIGHT SIDE - CONTENT */}
            <div>
              <div className="w-12 h-1 bg-yellow-400 rounded-full mb-5">
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#123b70] mb-5">
                Who We Are
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-8 mb-5">
                InterGuide Air service is a Travel Management Company and an arm
                of InterGuide Group of Companies. We are a one stop travel
                shop that has been in operation for decades in the aviation
                support industry in Nigeria and worldwide.
              </p>
              <p className="text-gray-600 text-base md:text-lg leading-8">
                Our aim is to offer an excellent travel experience to our
                clients through reliable, professional and quality travel
                services.
              </p>
            </div>
          </div>

          {/* CERTIFICATIONS & SERVICES */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-14">
            {/* LEFT SIDE - DESCRIPTION */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#123b70] mb-4">
                Excellence in Travel Services
              </h3>
              <p className="text-gray-600 text-base md:text-lg leading-8">
                InterGuide is IATA and NANTA certified, providing customers
                with an array of aviation offerings including Ticketing,
                Hotel Reservations, Airport Assistance, Visa Assistance and
                Customer Services since inception without compromising our
                quality standard.
              </p>
              {/* Services */}
              <div className="grid grid-cols-2 gap-4 mt-7">
                <div className="flex items-center gap-3">
                  <FaPlane className="text-[#e9a528]" />
                  <span className="text-[#123b70] font-semibold">
                    Ticketing
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FaAward className="text-[#e9a528]" />
                  <span className="text-[#123b70] font-semibold">
                    Hotel Reservations
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FaUsers className="text-[#e9a528]" />
                  <span className="text-[#123b70] font-semibold">
                    Airport Assistance
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FaShieldAlt className="text-[#e9a528]" />
                  <span className="text-[#123b70] font-semibold">
                    Visa Assistance
                  </span>
                </div>
              </div>
            </div>
            {/* RIGHT SIDE - CERTIFICATIONS */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              {/* IATA */}
              <div className="text-center">
                <img src={IATA} alt="IATA Certified" className="w-32 h-24 object-contain mx-auto" />
                <p className="text-sm font-semibold text-[#123b70] mt-2">
                  IATA Certified
                </p>
              </div>
              {/* NANTA */}
              <div className="text-center">
                <img src={NANTA} alt="NANTA Certified" className="w-36 h-24 object-contain mx-auto" />
                <p className="text-sm font-semibold text-[#123b70] mt-2">
                  NANTA Certified
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* VISION, MISSION, CORE VALUES & WHY INTERGUIDE */}
      <div
        ref={(el) => (sectionRefs.current[2] = el)}
        className="reveal bg-[#eef9ff] py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {/* OUR VISION */}
            <div className="bg-white rounded-xl border border-blue-100 p-7 shadow-sm hover:scale-105 duration-300">
              {/* Icon */}
              <div className="w-16 h-16 rounded-full bg-[#123b70] flex items-center justify-center mb-5">
                <FaEye className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-[#123b70] mb-3">
                Our Vision:
              </h3>
              <div className="w-12 h-1 bg-yellow-400 rounded-full mb-5"></div>
              <p className="text-gray-600 text-sm md:text-base leading-7">
                To be among the Top 3 travel agencies in strategic
                consultancy for travels.
              </p>
            </div>
            {/* OUR MISSION */}
            <div className="bg-white rounded-xl border border-blue-100 p-7 shadow-sm hover:scale-105 duration-300">
              {/* Icon */}
              <div className="w-16 h-16 rounded-full bg-[#123b70] flex items-center justify-center mb-5">
                <FaBullseye className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-[#123b70] mb-3">
                Our Mission:
              </h3>
              <div className="w-12 h-1 bg-yellow-400 rounded-full mb-5">
              </div>
              <p className="text-gray-600 text-sm md:text-base leading-7">
                We are committed to setting standard for excellence in the
                world travel business through total commitment to quality
                in People and Customer services with great financial rewards.
              </p>
            </div>
            {/* CORE VALUES */}
            <div className="bg-white rounded-xl border border-blue-100 p-7 shadow-sm hover:scale-105 duration-300">
              {/* Icon */}
              <div className="w-16 h-16 rounded-full bg-[#123b70] flex items-center justify-center mb-5">
                <FaGem className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-[#123b70] mb-3">
                Our Core Values:
              </h3>
              <div className="w-12 h-1 bg-yellow-400 rounded-full mb-5"></div>
              <ul className="space-y-3 text-gray-600 text-sm md:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500">•</span>
                  <span>Excellent Customer Service</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500">•</span>
                  <span>Delivery</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500">•</span>
                  <span>Customer Satisfaction</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500">•</span>
                  <span>Innovation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500">•</span>
                  <span>Ethics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500">•</span>
                  <span>Integrity</span>
                </li>
              </ul>
            </div>

            {/* WHY INTERGUIDE */}
            <div className="bg-white rounded-xl border border-blue-100 p-7 shadow-sm hover:scale-105 duration-300">
              {/* Icon */}
              <div className="w-16 h-16 rounded-full bg-[#123b70] flex items-center justify-center mb-5">
                <FaStar className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-[#123b70] mb-3">
                Why InterGuide?
              </h3>
              <div className="w-12 h-1 bg-yellow-400 rounded-full mb-5"></div>
              <ul className="space-y-3 text-gray-600 text-sm md:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500">•</span>
                  <span>Best Price Guarantee</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500">•</span>
                  <span>24/7 Phone and Online Support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500">•</span>
                  <span>Trust and Safety</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500">•</span>
                  <span>Excellent Customer Service</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* EXECUTIVE MANAGEMENT TEAM */}
      <div
        ref={(el) => (sectionRefs.current[4] = el)}
        className="reveal bg-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* LEFT SIDE - DESCRIPTION */}
            <div className="lg:col-span-2">
              <div className="w-12 h-1 bg-yellow-400 rounded-full mb-5"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#123b70] mb-5">
                Our Executive
                <br />
                Management Team
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-8">
                Our Executive Management Team brings years of experience of
                a cumulative 90+ years in the travel industry. Their wealth
                of knowledge, vision, creativity and innovation in leadership
                has upheld the company standards of over 3 decades to
                excellence services in the day to day operation of the company.
              </p>
            </div>
            {/* RIGHT SIDE - EXECUTIVE MEMBERS */}
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-5">
              {/* OLABODE EKUNDAYO */}
              <div className="bg-white rounded-xl border border-blue-100 overflow-hidden shadow-sm hover:scale-105 duration-300">
                <div className="h-[220px] overflow-hidden">
                  <img src={Bode} alt="Olabode Ekundayo" className="w-full h-full object-cover" />
                </div>
                <div className="text-center p-4">
                  <h3 className="text-sm md:text-base font-bold text-[#123b70]">
                    Olabode Ekundayo
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">
                    Head of Agency
                  </p>
                </div>
              </div>
              {/* ABASS NIYI AKIBON */}
              <div className="bg-white rounded-xl border border-blue-100 overflow-hidden shadow-sm hover:scale-105 duration-300">
                <div className="h-[220px] overflow-hidden">
                  <img src={Niyi} alt="Abass Niyi Akibon" className="w-full h-full object-cover" />
                </div>
                <div className="text-center p-4">
                  <h3 className="text-sm md:text-base font-bold text-[#123b70]">
                    Abass Niyi Akibon
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">
                    Head of Business Strategy &amp; Development
                  </p>
                </div>
              </div>
              {/* CHRISTIANA ONIYILO */}
              <div className="bg-white rounded-xl border border-blue-100 overflow-hidden shadow-sm hover:scale-105 duration-300">
                <div className="h-[220px] overflow-hidden">
                  <img src={Christiana} alt="Christiana Oniyilo" className="w-full h-full object-cover" />
                </div>
                <div className="text-center p-4">
                  <h3 className="text-sm md:text-base font-bold text-[#123b70]">
                    Christiana Oniyilo
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">
                    Head of Operations
                  </p>
                </div>
              </div>
              {/* TITILAYO ADEWOLE */}
              <div className="bg-white rounded-xl border border-blue-100 overflow-hidden shadow-sm hover:scale-105 duration-300">
                <div className="h-[220px] overflow-hidden">
                  <img src={Titi} alt="Titilayo Adewole" className="w-full h-full object-cover" />
                </div>
                <div className="text-center p-4">
                  <h3 className="text-sm md:text-base font-bold text-[#123b70]">
                    Titilayo
                    <br />
                    Adewole
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">
                    Head of Finance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;