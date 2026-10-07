import React, { useEffect, useRef } from "react";
import Protocol1 from '../../assets/Protocol1.jpg';
import Protocol2 from '../../assets/Protocol2.jpg';
import Protocol3 from '../../assets/Protocol3.jpg';
import Protocol4 from '../../assets/Protocol4.jpg';
import {
  FaUserCheck,
  FaPlane,
  FaShieldAlt,
  FaSuitcase,
  FaWheelchair,
  FaGem,
} from "react-icons/fa";


const Protocols = () => {
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
            <img src={Protocol1} alt="Protocols" className="absolute inset-0 w-full h-full object-cover" />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/55">
            </div>
            {/* Hero Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 h-full flex items-center">
                <div className="max-w-2xl text-white">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        PROTOCOLS
                    </h1>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-yellow-400 mb-4">
                        Seamless Support • Stress-Free Travel
                    </h2>
                    <p className="text-base md:text-lg leading-7 text-gray-100">
                        With our well-polished professional members of staff we render
                        assistance to our clients to check-in on departure and clearance
                        on arrival through all security posts at the airports assisting
                        with extra baggage and wheelchair support at very affordable
                        prices with top notch services.
                    </p>
                </div>
            </div>
        </div>

        {/* PROTOCOL SERVICES SECTION */}
        <div
            ref={(el) => (sectionRefs.current[1] = el)}
            className="reveal bg-white py-14 md:py-16">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                {/* INTRODUCTION */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-12">
                    {/* LEFT SIDE - DESCRIPTION */}
                    <div>
                        {/* Decorative Line */}
                        <div className="w-12 h-1 bg-yellow-400 rounded-full mb-5">
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#123b70] mb-5">
                            Our Protocol
                            <br />
                            Services Include
                        </h2>
                        <p className="text-gray-600 text-base md:text-lg leading-8 max-w-xl">
                            We make your airport experience smooth and hassle-free,
                            with dedicated support at every step of your journey.
                        </p>
                    </div>
                    {/* RIGHT SIDE - IMAGE COLLAGE */}
                    <div className="relative h-[300px] md:h-[350px]">
                        {/* Main Airport Image */}
                        <div className="absolute left-0 top-0 w-[75%] h-[75%] rounded-xl overflow-hidden shadow-sm">
                            <img src={Protocol2} alt="Airport Protocol Service" className="w-full h-full object-cover" />
                        </div>
                        {/* Top Right Image */}
                        <div className="absolute right-0 top-[-10px] w-[38%] h-[48%] rounded-xl overflow-hidden border-4 border-white shadow-lg rotate-[4deg]">
                            <img src={Protocol3} alt="Passport Control Assistance" className="w-full h-full object-cover" />
                        </div>
                        {/* Bottom Right Image */}
                        <div className="absolute right-0 bottom-0 w-[40%] h-[48%] rounded-xl overflow-hidden border-4 border-white shadow-lg rotate-[-3deg]">
                            <img src={Protocol4} alt="Wheelchair Support" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

                {/* PROTOCOL SERVICES CARDS SECTION */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                    {/* CHECK-IN ASSISTANCE */}
                    <div className="bg-white border border-blue-100 rounded-xl p-7 text-center hover:scale-105 duration-300">
                        {/* Icon */}
                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-5">
                            <FaUserCheck className="text-[#123b70] text-2xl" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-[#123b70] mb-3">
                            Check-in
                            <br />
                            Assistance
                        </h3>
                        <p className="text-gray-500 text-sm md:text-base leading-6">
                            We help you check-in quickly and easily before your departure.
                        </p>
                    </div>
                    {/* ARRIVAL CLEARANCE */}
                    <div className="bg-white border border-blue-100 rounded-xl p-7 text-center hover:scale-105 duration-300">
                        {/* Icon */}
                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-5">
                            <FaPlane className="text-[#123b70] text-2xl" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-[#123b70] mb-3">
                            Arrival Clearance
                        </h3>
                        <p className="text-gray-500 text-sm md:text-base leading-6">
                            We guide you through all immigration and customs processes
                            on arrival.
                        </p>
                    </div>
                    {/* SECURITY SUPPORT */}
                    <div className="bg-white border border-blue-100 rounded-xl p-7 text-center hover:scale-105 duration-300">
                        {/* Icon */}
                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-5">
                            <FaShieldAlt className="text-[#123b70] text-2xl" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-[#123b70] mb-3">
                            Security Support
                        </h3>
                        <p className="text-gray-500 text-sm md:text-base leading-6">
                            Assistance at all security posts for a smoother journey.
                        </p>
                    </div>
                    {/* EXTRA BAGGAGE SUPPORT */}
                    <div className="bg-white border border-blue-100 rounded-xl p-7 text-center hover:scale-105 duration-300">
                        {/* Icon */}
                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-5">
                            <FaSuitcase className="text-[#123b70] text-2xl" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-[#123b70] mb-3">
                            Extra Baggage
                            <br />
                            Support
                        </h3>
                        <p className="text-gray-500 text-sm md:text-base leading-6">
                            Help with additional baggage handling and check-in.
                        </p>
                    </div>
                    {/* WHEELCHAIR SUPPORT */}
                    <div className="bg-white border border-blue-100 rounded-xl p-7 text-center hover:scale-105 duration-300">
                        {/* Icon */}
                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-5">
                            <FaWheelchair className="text-[#123b70] text-2xl" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-[#123b70] mb-3">
                            Wheelchair
                            <br />
                            Support
                        </h3>
                        <p className="text-gray-500 text-sm md:text-base leading-6">
                            Comfort and care for passengers with special needs.
                        </p>
                    </div>
                    {/* AFFORDABLE & TOP NOTCH */}
                    <div className="bg-white border border-blue-100 rounded-xl p-7 text-center hover:scale-105 duration-300">
                        {/* Icon */}
                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-5">
                            <FaGem className="text-[#123b70] text-2xl" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-[#123b70] mb-3">
                            Affordable
                            <br />
                            &amp; Top Notch
                        </h3>
                        <p className="text-gray-500 text-sm md:text-base leading-6">
                            Premium services at very affordable prices.
                        </p>
                    </div>
                </div>
            </div>
        </div>


        {/* CALL TO ACTION */}
        <div
            ref={(el) => (sectionRefs.current[2] = el)}
            className="reveal bg-white pb-14 md:pb-16">
            <div className="max-w-7xl mx-auto px-6 md:px-10"> 
                <div className="relative bg-[#123b70] rounded-xl overflow-hidden px-6 py-8 md:px-10 md:py-9">
                    {/* Decorative Plane */}
                    <FaPlane className="absolute left-8 top-1/2 -translate-y-1/2 text-white/90 text-6xl rotate-[-20deg] hidden md:block" />
                    {/* Divider */}
                    <div className="absolute left-28 top-1/2 -translate-y-1/2 h-16 w-px bg-white/50 hidden md:block">
                    </div>
                    {/* CTA Content */}
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Text */}
                        <div className="text-center md:text-left md:pl-44">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                Travel with Confidence
                            </h2>
                            <p className="text-sm md:text-base text-blue-100">
                                Our professional team is always ready to assist you at
                                every stage of your journey.
                            </p>
                        </div>
                        {/* Button */}
                        <div className="flex-shrink-0">
                            <a
                                href="https://wa.me/2348082174766"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#e9a528] hover:bg-[#d99216] text-white font-semibold px-7 py-3 rounded-full flex items-center gap-3 transition duration-300">
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

export default Protocols;