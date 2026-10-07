import React, { useEffect, useRef, useState } from "react";
import Travel2 from "../../assets/Travel2.jpg";
import InterGuide from "../../assets/InterGuide.png";
import Countries from "../Countries";
import {
  FaPlane,
  FaPassport,
  FaSyncAlt,
  FaCalendarAlt,
  FaUser,
  FaInfoCircle,
  FaGlobe,
} from "react-icons/fa";

const Visa = () => {
  const sectionRefs = useRef([]);

  const [nationality, setNationality] = useState("");
  const [showNationality, setShowNationality] = useState(false);

  const [destination, setDestination] = useState("");
  const [showDestination, setShowDestination] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    outboundDate: "",
    inboundDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const filteredNationalities = Countries.filter((country) =>
    country.nationality
      .toLowerCase()
      .includes(nationality.toLowerCase())
  );

  const filteredDestinations = Countries.filter((country) =>
    country.name
      .toLowerCase()
      .includes(destination.toLowerCase())
  );

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/visa-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          nationality,
          phone: formData.phone,
          destination,
          outboundDate: formData.outboundDate,
          inboundDate: formData.inboundDate,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(
          "Your visa request has been submitted successfully. Our team will contact you shortly."
        );

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          outboundDate: "",
          inboundDate: "",
        });

        setNationality("");
        setDestination("");
      } else {
        setMessage(
          data.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting visa request:", error);

      setMessage(
        "Unable to submit your request. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        ref={(el) => (sectionRefs.current[0] = el)}
        className="reveal relative h-[430px] md:h-[500px] overflow-hidden"
      >
        <img
          src={Travel2}
          alt="Visa Assistance"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/55"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              VISA ASSISTANCE
            </h1>

            <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-4">
              Your Journey, Our Support
            </h2>

            <p className="text-base md:text-lg leading-7 text-gray-100">
              Our experienced team offers professional advice and assist
              with different countries visa process, leaving you less
              stressed with residence permits, re-entry visas, change of
              appointment status, re-designation and many more.
            </p>
          </div>
        </div>
      </div>

      {/* Visa Assistance Info */}
      <div
        ref={(el) => (sectionRefs.current[1] = el)}
        className="reveal bg-white py-8 md:py-10"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* LEFT SIDE */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#123b70] mb-2">
                Visa Assistance
              </h2>

              <p className="text-gray-700 text-sm md:text-base leading-7 max-w-xl">
                We provide professional guidance throughout the visa
                application process, helping you understand the requirements
                and prepare for your application.
              </p>
            </div>

            {/* RIGHT SIDE */}
            <div className="grid grid-cols-2 gap-y-5">
              <div className="flex flex-col items-center text-center border-r border-gray-200">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                  <FaPassport className="text-[#123b70] text-xl" />
                </div>

                <h3 className="text-xs md:text-sm font-semibold text-[#123b70]">
                  All Kinds of Visa
                </h3>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                  <FaSyncAlt className="text-[#123b70] text-xl" />
                </div>

                <h3 className="text-xs md:text-sm font-semibold text-[#123b70]">
                  Visa Renewal
                </h3>
              </div>

              <div className="flex flex-col items-center text-center border-r border-gray-200">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                  <FaCalendarAlt className="text-[#123b70] text-xl" />
                </div>

                <h3 className="text-xs md:text-sm font-semibold text-[#123b70]">
                  Appointment Booking
                </h3>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                  <FaUser className="text-[#123b70] text-xl" />
                </div>

                <h3 className="text-xs md:text-sm font-semibold text-[#123b70]">
                  Others
                </h3>
              </div>
            </div>
          </div>

          {/* INFORMATION BOX */}
          <div className="mt-6 bg-[#fff8ed] border border-orange-100 rounded-xl p-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                  <FaInfoCircle className="text-white text-base" />
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-yellow-600 mb-1">
                  Please Note
                </h3>

                <ul className="list-disc pl-4 space-y-1 text-gray-700 text-xs md:text-sm leading-5">
                  <li>
                    The embassies are responsible for visa issuance, thus
                    InterGuide Air Services do not guarantee visa. We only
                    assist in visa facilitation.
                  </li>

                  <li>
                    Visa procurement does not guarantee entry into any
                    country, as immigration officials at the point of entry
                    still have the right to decide.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VISA REQUEST FORM */}
      <section
        ref={(el) => (sectionRefs.current[2] = el)}
        className="reveal relative bg-[#eef9ff] py-8 md:py-10 overflow-hidden"
      >
        {/* Moving Logo Background */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <img
            src={InterGuide}
            alt=""
            className="logo-slide w-64 md:w-80 lg:w-96 opacity-30"
          />
        </div>

        {/* Decorative Plane */}
        <FaPlane className="absolute left-8 top-10 text-blue-100 text-6xl rotate-[-25deg]" />

        {/* Decorative Globe */}
        <FaGlobe className="absolute right-[-30px] bottom-[-30px] text-blue-100 text-[180px]" />

        {/* Form Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-sm p-5 md:p-7 lg:p-8">

            {/* Form Heading */}
            <div className="text-center mb-5">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#123b70]">
                Kindly Fill the Below Form
              </h2>

              <p className="text-gray-600 mt-2">
                Our team will contact you shortly.
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
            >
              {/* First Name */}
              <div>
                <label className="block text-sm font-semibold text-[#123b70] mb-2">
                  First Name
                </label>

                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your first name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-semibold text-[#123b70] mb-2">
                  Last Name
                </label>

                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your last name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-[#123b70] mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>

              {/* Nationality */}
              <div>
                <label className="block text-sm font-semibold text-[#123b70] mb-2">
                  Select Nationality
                </label>

                <div className="relative">
                  <input
                    type="text"
                    value={nationality}
                    onChange={(e) => {
                      setNationality(e.target.value);
                      setShowNationality(true);
                    }}
                    onFocus={() => setShowNationality(true)}
                    required
                    placeholder="Search your nationality"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />

                  {showNationality && (
                    <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                      {filteredNationalities.length > 0 ? (
                        filteredNationalities.map((country) => (
                          <div
                            key={country.isoCode}
                            onClick={() => {
                              setNationality(country.nationality);
                              setShowNationality(false);
                            }}
                            className="px-4 py-2 cursor-pointer hover:bg-blue-50 text-gray-700"
                          >
                            {country.nationality}
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-gray-500">
                          No nationality found
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-semibold text-[#123b70] mb-2">
                  Phone Number
                </label>

                <div className="relative">
                  
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter your phone number"
                    className="w-full border border-gray-300 rounded-lg pl-5 pr-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
              </div>

              {/* Destination */}
              <div>
                <label className="block text-sm font-semibold text-[#123b70] mb-2">
                  Select Destination
                </label>

                <div className="relative">
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => {
                      setDestination(e.target.value);
                      setShowDestination(true);
                    }}
                    onFocus={() => setShowDestination(true)}
                    required
                    placeholder="Search destination"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />

                  {showDestination && (
                    <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                      {filteredDestinations.length > 0 ? (
                        filteredDestinations.map((country) => (
                          <div
                            key={country.isoCode}
                            onClick={() => {
                              setDestination(country.name);
                              setShowDestination(false);
                            }}
                            className="px-4 py-2 cursor-pointer hover:bg-blue-50 text-gray-700"
                          >
                            {country.name}
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-gray-500">
                          No destination found
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Outbound Date */}
              <div>
                <label className="block text-sm font-semibold text-[#123b70] mb-2">
                  Outbound Date
                </label>

                <input
                  type="date"
                  name="outboundDate"
                  value={formData.outboundDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>

              {/* Inbound Date */}
              <div>
                <label className="block text-sm font-semibold text-[#123b70] mb-2">
                  Inbound Date
                </label>

                <input
                  type="date"
                  name="inboundDate"
                  value={formData.inboundDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>

              {/* Message */}
              {message && (
                <div className="md:col-span-2">
                  <div
                    className={`rounded-lg px-4 py-3 text-sm text-center ${
                      message.includes("successfully")
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {message}
                  </div>
                </div>
              )}

              {/* Submit */}
              <div className="md:col-span-2 flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#123b70] hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold px-16 py-3 rounded-lg transition duration-300"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Visa;