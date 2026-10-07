import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./components/routes/Home";
import AboutUs from "./components/routes/AboutUs";
import Contact from "./components/routes/Contact";
import Sustainability from "./components/routes/Sustainability";

import Flight from "./components/services/Flight";
import VisaAssistance from "./components/services/VisaAssistance";
import TourPackages from "./components/services/TourPackages";
import HotelReservations from "./components/services/HotelReservations";
import Insurance from "./components/services/Insurance";
import ProtocolServices from "./components/services/ProtocolServices";

import AdminLogin from "./Admin/AdminLogin";
import AdminSignup from "./Admin/AdminSignup";
import ForgotPassword from "./Admin/ForgotPassword";
import ResetPassword from "./Admin/ResetPassword";

import AdminLayout from "./Admin/AdminLayout";
import AdminDashboard from "./Admin/AdminDashboard";
import HomeManagement from "./Admin/HomeManagement";
import AdminFlightManagement from "./Admin/AdminFlightManagement";
import AdminHotelReservation from "./Admin/AdminHotelReservation";
import AdminTourPackageManagement from "./Admin/AdminTourPackageManagement";


/* =========================
    PROTECTED ADMIN ROUTE
========================= */

const AdminRoute = () => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/Admin" replace />;
  }

  return <Outlet />;
};


function App() {
  const location = useLocation();

  return (
    <>
      {/* CUSTOMER NAVBAR */}
      {!location.pathname.startsWith("/Admin") && <Navbar />}

      <Routes>

        {/* =========================
            CUSTOMER PAGES
        ========================== */}

        <Route path="/" element={<Home />} />

        <Route
          path="/AboutUs"
          element={<AboutUs />}
        />

        <Route
          path="/Sustainability"
          element={<Sustainability />}
        />

        <Route
          path="/Contact"
          element={<Contact />}
        />

        <Route
          path="/Flight"
          element={<Flight />}
        />

        <Route
          path="/VisaAssistance"
          element={<VisaAssistance />}
        />

        <Route
          path="/TourPackages"
          element={<TourPackages />}
        />

        <Route
          path="/HotelReservations"
          element={<HotelReservations />}
        />

        <Route
          path="/Insurance"
          element={<Insurance />}
        />

        <Route
          path="/ProtocolServices"
          element={<ProtocolServices />}
        />


        {/* =========================
            ADMIN AUTH PAGES
        ========================== */}

        <Route
          path="/Admin"
          element={<AdminLogin />}
        />

        <Route
          path="/Admin/signup"
          element={<AdminSignup />}
        />

        <Route
          path="/Admin/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/Admin/reset-password"
          element={<ResetPassword />}
        />


        {/* =========================
            PROTECTED ADMIN PAGES
        ========================== */}

        <Route element={<AdminRoute />}>

          <Route element={<AdminLayout />}>

            <Route
              path="/Admin/dashboard"
              element={<AdminDashboard />}
            />

            <Route
              path="/Admin/home"
              element={<HomeManagement />}
            />

            <Route
              path="/Admin/flight"
              element={<AdminFlightManagement />}
            />

            <Route
              path="/Admin/hotel"
              element={<AdminHotelReservation />}
            />

            <Route
              path="/Admin/tour-packages"
              element={<AdminTourPackageManagement />}
            />

          </Route>

        </Route>

      </Routes>


      {/* =========================
          CUSTOMER FOOTER
      ========================== */}

      {!location.pathname.startsWith("/Admin") &&
        location.pathname !== "/Flight" &&
        location.pathname !== "/VisaAssistance" &&
        location.pathname !== "/TourPackages" &&
        location.pathname !== "/HotelReservations" &&
        location.pathname !== "/Insurance" &&
        location.pathname !== "/ProtocolServices" && (
          <Footer />
        )}
    </>
  );
}

export default App;