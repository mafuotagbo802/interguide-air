import React from "react";
import { NavLink } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[#f4f8ff] flex">
      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 md:p-10 overflow-hidden">

        {/* WELCOME HEADER */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#0d47a1] via-[#1976d2] to-[#42a5f5] rounded-3xl p-7 md:p-10 text-white shadow-lg mb-8">

          {/* Decorative Circles */}
          <div className="absolute -right-10 -top-16 w-48 h-48 bg-white/10 rounded-full"></div>
          <div className="absolute right-20 -bottom-24 w-56 h-56 bg-white/10 rounded-full"></div>

          {/* Header Content */}
          <div className="relative z-10">
            <p className="text-blue-100 text-sm font-semibold uppercase tracking-widest">
              Admin Dashboard
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Welcome Back
            </h2>

            <p className="text-blue-50 mt-3 max-w-2xl">
              Manage your InterGuide Air website, travel offers,
              and flight deals from one convenient place.
            </p>
          </div>
        </div>

        {/* QUICK STATISTICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">

          {/* HOME STAT */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Managed Sections
                </p>

                <h3 className="text-3xl font-bold text-[#123b70] mt-2">
                  3
                </h3>

                <p className="text-blue-600 text-sm mt-1">
                  Home Page • Flight Page • Tour Packages
                </p>
              </div>
            </div>
          </div>

          {/* FLIGHT STAT */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Flight Management
                </p>

                <h3 className="text-3xl font-bold text-[#123b70] mt-2">
                  Active
                </h3>

                <p className="text-blue-600 text-sm mt-1">
                  Flight Deals
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MANAGEMENT CARDS */}
        <div>
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-[#123b70]">
              Website Management
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Select a section to manage your website content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* HOME PAGE CARD */}
            <div className="group bg-white rounded-2xl p-7 shadow-sm border border-blue-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  MANAGEMENT
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#123b70] mt-6">
                Home Page
              </h3>

              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                Manage offers and deals displayed on the
                InterGuide Air Home page.
              </p>

              <NavLink
                to="/Admin/home"
                className="inline-flex items-center gap-2 mt-6 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all"
              >
                Manage Home Page
                <FaArrowRight />
              </NavLink>
            </div>

            {/* FLIGHT PAGE CARD */}
            <div className="group bg-white rounded-2xl p-7 shadow-sm border border-blue-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
                  MANAGEMENT
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#123b70] mt-6">
                Flight Page
              </h3>

              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                Manage the cheapest flight deals displayed
                on the InterGuide Air Flight page.
              </p>

              <NavLink
                to="/Admin/flight"
                className="inline-flex items-center gap-2 mt-6 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all"
              >
                Manage Flight Deals
                <FaArrowRight />
              </NavLink>
            </div>

            {/* TOUR PACKAGES CARD */}
            <div className="group bg-white rounded-2xl p-7 shadow-sm border border-blue-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  MANAGEMENT
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#123b70] mt-6">
                Tour Packages
              </h3>

              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                Manage the images displayed in the
                InterGuide Air Tour Packages section.
              </p>

              <NavLink
                to="/Admin/tour-packages"
                className="inline-flex items-center gap-2 mt-6 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all"
              >
                Manage Tour Packages
                <FaArrowRight />
              </NavLink>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
