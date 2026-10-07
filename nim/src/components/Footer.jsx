import React from 'react';
import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-slate-900 text-white px-5 md:px-10 pt-8">

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-8">

        {/* COMPANY INFO */}
        <div>
          <h1 className="w-full font-bold text-white">
            Interguide Air Service
          </h1>

          <p className="text-xs">
            ......We Plan, You Travel
          </p>

          {/* SOCIAL MEDIA */}
          <div className="flex gap-6 py-6">

            <a
              href="https://www.facebook.com/Interguide"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookSquare size={30} />
            </a>

            <a
              href="https://www.instagram.com/interguideairservices"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram size={30} />
            </a>

            <a
              href="https://www.linkedin.com/company/interguide-air-services/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={30} />
            </a>

          </div>
        </div>


        {/* QUICK LINKS */}
        <div>
          <h2 className="font-semibold text-lg">
            Quick Links
          </h2>

          <div className="mt-4 space-y-2 text-sm text-gray-300">

            <Link
              to="/"
              className="block hover:text-white transition"
            >
              Home
            </Link>

            <Link
              to="/AboutUs"
              className="block hover:text-white transition"
            >
              About Us
            </Link>

            <Link
              to="/Sustainability"
              className="block hover:text-white transition"
            >
              Sustainability
            </Link>

            <Link
              to="/Contact"
              className="block hover:text-white transition"
            >
              Contact Us
            </Link>

          </div>
        </div>


        {/* OUR SERVICES */}
        <div>
          <h2 className="font-semibold text-lg">
            Our Services
          </h2>

          <div className="mt-4 space-y-2 text-sm text-gray-300">

            <Link
              to="/Flight"
              className="block hover:text-white transition"
            >
              Flight
            </Link>

            <Link
              to="/VisaAssistance"
              className="block hover:text-white transition"
            >
              Visa Assistance
            </Link>

            <Link
              to="/HotelReservations"
              className="block hover:text-white transition"
            >
              Hotel Reservations
            </Link>

            <Link
              to="/ProtocolServices"
              className="block hover:text-white transition"
            >
              Protocol Services
            </Link>

            <Link
              to="/Insurance"
              className="block hover:text-white transition"
            >
              Insurance
            </Link>

            <Link
              to="/TourPackages"
              className="block hover:text-white transition"
            >
              Tour Package
            </Link>

          </div>
        </div>


        {/* CONTACT INFORMATION */}
        <div>
          <h2 className="font-semibold text-lg">
            Contact Us
          </h2>

          <div className="mt-4 space-y-3 text-sm text-gray-300">

            <p>
              sales@flyinterguide.net
            </p>

            <p>
              +(234) 808 217 4766
            </p>

            <p>
              6 Toyin Street Ikeja, Lagos, Nigeria.
            </p>

          </div>
        </div>

      </div>

    </div>
  );
};

export default Footer;