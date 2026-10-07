import React, { useState } from 'react';
import {NavLink, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import InterGuide from '../assets/InterGuide.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Check if the current page is one of the service pages
  const servicePaths = [
    '/Flight',
    '/VisaAssistance',
    '/HotelReservations',
    '/ProtocolServices',
    '/Insurance',
    '/TourPackages',
  ];

  const isServiceActive = servicePaths.includes(location.pathname);

  return (
    <nav
      style={{
        backgroundColor: '#ffffff',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '10px 20px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '60px',
          position: 'relative',
        }}
      >

        {/* LOGO */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            flexShrink: 0,
          }}
          onClick={() => window.location.href = '/'}
        >
          <img
            src={InterGuide}
            alt="InterGuide Logo"
            style={{
              height: '40px',
              width: 'auto',
              objectFit: 'contain',
              mixBlendMode: 'multiply',
            }}
          />
        </div>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-10">

          {/* HOME */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative text-gray-700 hover:text-red-600
              after:content-[''] after:absolute after:left-0 after:-bottom-1
              after:h-[2px] after:bg-red-600 after:transition-all after:duration-300
              ${
                isActive
                  ? 'after:w-full text-red-600'
                  : 'after:w-0 hover:after:w-full'
              }`
            }
          >
            Home
          </NavLink>


          {/* OUR SERVICES */}
          <div className="relative group">

            <span
              className={`relative cursor-pointer
                after:content-[''] after:absolute after:left-0 after:-bottom-1
                after:h-[2px] after:bg-red-600
                after:transition-all after:duration-300
                ${
                  isServiceActive
                    ? 'text-red-600 after:w-full'
                    : 'text-gray-700 hover:text-red-600 after:w-0 hover:after:w-full'
                }`}
            >
              Our Services
            </span>

            {/* SERVICES DROPDOWN */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 hidden group-hover:block">
              <div className="bg-white shadow-lg rounded-md py-2 w-56">

                {/* FLIGHT */}
                <NavLink
                  to="/Flight"
                  className={({ isActive }) =>
                    `block px-4 py-2 ${
                      isActive
                        ? 'bg-red-50 text-red-600 font-semibold'
                        : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                    }`
                  }
                >
                  Flight
                </NavLink>

                {/* VISA ASSISTANCE */}
                <NavLink
                  to="/VisaAssistance"
                  className={({ isActive }) =>
                    `block px-4 py-2 ${
                      isActive
                        ? 'bg-red-50 text-red-600 font-semibold'
                        : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                    }`
                  }
                >
                  Visa Assistance
                </NavLink>

                {/* HOTEL RESERVATIONS */}
                <NavLink
                  to="/HotelReservations"
                  className={({ isActive }) =>
                    `block px-4 py-2 ${
                      isActive
                        ? 'bg-red-50 text-red-600 font-semibold'
                        : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                    }`
                  }
                >
                  Hotel Reservations
                </NavLink>

                {/* PROTOCOL SERVICES */}
                <NavLink
                  to="/ProtocolServices"
                  className={({ isActive }) =>
                    `block px-4 py-2 ${
                      isActive
                        ? 'bg-red-50 text-red-600 font-semibold'
                        : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                    }`
                  }
                >
                  Protocol Services
                </NavLink>

                {/* INSURANCE */}
                <NavLink
                  to="/Insurance"
                  className={({ isActive }) =>
                    `block px-4 py-2 ${
                      isActive
                        ? 'bg-red-50 text-red-600 font-semibold'
                        : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                    }`
                  }
                >
                  Insurance
                </NavLink>

                {/* TOUR PACKAGE */}
                <NavLink
                  to="/TourPackages"
                  className={({ isActive }) =>
                    `block px-4 py-2 ${
                      isActive
                        ? 'bg-red-50 text-red-600 font-semibold'
                        : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                    }`
                  }
                >
                  Tour Package
                </NavLink>

              </div>
            </div>
          </div>


          {/* ABOUT US */}
          <NavLink
            to="/AboutUs"
            className={({ isActive }) =>
              `relative text-gray-700 hover:text-red-600
              after:content-[''] after:absolute after:left-0 after:-bottom-1
              after:h-[2px] after:bg-red-600 after:transition-all after:duration-300
              ${
                isActive
                  ? 'after:w-full text-red-600'
                  : 'after:w-0 hover:after:w-full'
              }`
            }
          >
            About Us
          </NavLink>


          {/* SUSTAINABILITY */}
          <NavLink
            to="/Sustainability"
            className={({ isActive }) =>
              `relative text-gray-700 hover:text-red-600
              after:content-[''] after:absolute after:left-0 after:-bottom-1
              after:h-[2px] after:bg-red-600 after:transition-all after:duration-300
              ${
                isActive
                  ? 'after:w-full text-red-600'
                  : 'after:w-0 hover:after:w-full'
              }`
            }
          >
            Sustainability
          </NavLink>


          {/* CONTACT US */}
          <NavLink
            to="/Contact"
            className={({ isActive }) =>
              `relative text-gray-700 hover:text-red-600
              after:content-[''] after:absolute after:left-0 after:-bottom-1
              after:h-[2px] after:bg-red-600 after:transition-all after:duration-300
              ${
                isActive
                  ? 'after:w-full text-red-600'
                  : 'after:w-0 hover:after:w-full'
              }`
            }
          >
            Contact Us
          </NavLink>

        </div>


        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl text-gray-700"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>


        {/* MOBILE NAVIGATION */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden flex flex-col gap-5 px-6 py-6">

            {/* MOBILE HOME */}
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? 'text-red-600 font-semibold'
                  : 'text-gray-700 hover:text-red-600'
              }
            >
              Home
            </NavLink>

            {/* MOBILE ABOUT */}
            <NavLink
              to="/AboutUs"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? 'text-red-600 font-semibold'
                  : 'text-gray-700 hover:text-red-600'
              }
            >
              About Us
            </NavLink>

            {/* MOBILE SUSTAINABILITY */}
            <NavLink
              to="/Sustainability"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? 'text-red-600 font-semibold'
                  : 'text-gray-700 hover:text-red-600'
              }
            >
              Sustainability
            </NavLink>

            {/* MOBILE CONTACT */}
            <NavLink
              to="/Contact"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? 'text-red-600 font-semibold'
                  : 'text-gray-700 hover:text-red-600'
              }
            >
              Contact Us
            </NavLink>

            {/* MOBILE BOOK NOW */}
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 w-fit">
              Book Now
            </button>

          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;