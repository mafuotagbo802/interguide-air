import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import InterGuideLogo2 from "../assets/InterGuideLogo2.png";

const AdminLayout = () => {
  const navigate = useNavigate();

  // =====================================================
  // HANDLE LOGOUT
  // =====================================================

  const handleLogout = () => {
    // Remove admin authentication
    localStorage.removeItem("adminToken");

    // Remove saved admin information
    localStorage.removeItem("adminInfo");

    // Redirect to login page
    navigate("/Admin");
  };

  return (
    <div className="min-h-screen bg-[#f4f8ff]">

      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 w-64 h-screen bg-gradient-to-b from-[#0d47a1] to-[#123b70] text-white flex flex-col shadow-xl z-50">

        {/* LOGO / BRAND */}
        <div className="px-6 py-7 border-b border-white/20">

          <NavLink
            to="/Admin/dashboard"
            className="flex flex-col items-center text-center"
          >

            {/* INTERGUIDE LOGO */}
            <div className="bg-white rounded-lg hover:scale-105 duration-300">

              <img
                src={InterGuideLogo2}
                alt="InterGuide Air"
                className="w-32 h-auto object-contain"
              />

            </div>

            <p className="text-blue-200 text-xs">
              Admin Portal
            </p>

          </NavLink>

        </div>

        {/* NAVIGATION */}
        <nav className="px-4 py-7 flex-1">

          {/* HOME PAGE */}
          <NavLink
            to="/Admin/home"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3.5 rounded-xl mt-3 transition-all duration-300 ${
                isActive
                  ? "bg-white text-[#0d47a1] shadow-md"
                  : "text-blue-100 hover:bg-white/15 hover:text-white"
              }`
            }
          >
            <span className="font-medium">
              Home Page
            </span>
          </NavLink>

          {/* FLIGHT PAGE */}
          <NavLink
            to="/Admin/flight"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3.5 rounded-xl mt-3 transition-all duration-300 ${
                isActive
                  ? "bg-white text-[#0d47a1] shadow-md"
                  : "text-blue-100 hover:bg-white/15 hover:text-white"
              }`
            }
          >
            <span className="font-medium">
              Flight Page
            </span>
          </NavLink>

          {/* HOTEL PAGE */}
          <NavLink
            to="/Admin/hotel"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3.5 rounded-xl mt-3 transition-all duration-300 ${
                isActive
                  ? "bg-white text-[#0d47a1] shadow-md"
                  : "text-blue-100 hover:bg-white/15 hover:text-white"
              }`
            }
          >
            <span className="font-medium">
              Hotel Page
            </span>
          </NavLink>

          {/* TOUR PACKAGES */}
          <NavLink
            to="/Admin/tour-packages"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3.5 rounded-xl mt-3 transition-all duration-300 ${
                isActive
                  ? "bg-white text-[#0d47a1] shadow-md"
                  : "text-blue-100 hover:bg-white/15 hover:text-white"
              }`
            }
          >
            <span className="font-medium">
              Tour Packages
            </span>
          </NavLink>

        </nav>

        {/* LOGOUT */}
        <div className="px-4 pb-7">

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-blue-100 hover:bg-red-500 hover:text-white transition-all duration-300"
          >

            <FaSignOutAlt className="text-lg" />

            <span className="font-medium">
              Logout
            </span>

          </button>

        </div>

      </aside>

      {/* ADMIN PAGE CONTENT */}
      <main className="ml-64 min-h-screen min-w-0">

        <Outlet />

      </main>

    </div>
  );
};

export default AdminLayout;