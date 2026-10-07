import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTag,
  FaTimes,
  FaImage,
} from "react-icons/fa";

const HomeManagement = () => {
  // =====================================================
  // AUTHENTICATION
  // =====================================================

  const getToken = () => {
    return localStorage.getItem("adminToken");
  };

  const handleAuthenticationError = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");

    alert("Authentication required. Please log in again.");
  };

  // =====================================================
  // FLIGHT DEALS
  // =====================================================

  const [flightDeals, setFlightDeals] = useState([]);

  const [showFlightForm, setShowFlightForm] = useState(false);
  const [editingFlightId, setEditingFlightId] = useState(null);

  const [showFlightImagePreview, setShowFlightImagePreview] =
    useState(false);

  const [flightForm, setFlightForm] = useState({
    title: "",
    description: "",
    price: "",
    label: "",
    buttonText: "",
    image: null,
  });

  // =====================================================
  // TOUR PACKAGES
  // =====================================================

  const [tourPackages, setTourPackages] = useState([]);

  const [showTourForm, setShowTourForm] = useState(false);
  const [editingTourId, setEditingTourId] = useState(null);

  const [showTourImagePreview, setShowTourImagePreview] =
    useState(false);

  const [tourForm, setTourForm] = useState({
    title: "",
    description: "",
    price: "",
    label: "",
    buttonText: "",
    image: null,
  });

  // =====================================================
  // FETCH DATA
  // =====================================================

  useEffect(() => {
    fetchHomeFlights();
    fetchHomeTours();
  }, []);

  // =====================================================
  // FETCH HOME FLIGHTS
  // =====================================================

  const fetchHomeFlights = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/home-flights"
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(
          data.message || "Failed to fetch flight deals"
        );
        return;
      }

      setFlightDeals(data);
    } catch (error) {
      console.error(
        "Error fetching home flight deals:",
        error
      );
    }
  };

  // =====================================================
  // FETCH HOME TOURS
  // =====================================================

  const fetchHomeTours = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/home-tours"
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(
          data.message || "Failed to fetch tour packages"
        );
        return;
      }

      setTourPackages(data);
    } catch (error) {
      console.error(
        "Error fetching home tour packages:",
        error
      );
    }
  };

  // =====================================================
  // FLIGHT FORM INPUT
  // =====================================================

  const handleFlightChange = (e) => {
    const { name, value } = e.target;

    setFlightForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // TOUR FORM INPUT
  // =====================================================

  const handleTourChange = (e) => {
    const { name, value } = e.target;

    setTourForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // FLIGHT IMAGE UPLOAD
  // =====================================================

  const handleFlightImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFlightForm((previous) => ({
      ...previous,
      image: file,
    }));

    setShowFlightImagePreview(true);
  };

  // =====================================================
  // TOUR IMAGE UPLOAD
  // =====================================================

  const handleTourImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setTourForm((previous) => ({
      ...previous,
      image: file,
    }));

    setShowTourImagePreview(true);
  };

  // =====================================================
  // OPEN ADD FLIGHT FORM
  // =====================================================

  const openAddFlightForm = () => {
    setEditingFlightId(null);

    setShowFlightImagePreview(false);

    setFlightForm({
      title: "",
      description: "",
      price: "",
      label: "",
      buttonText: "",
      image: null,
    });

    setShowFlightForm(true);
  };

  // =====================================================
  // OPEN EDIT FLIGHT FORM
  // =====================================================

  const openEditFlightForm = (deal) => {
    setEditingFlightId(deal._id);

    setShowFlightImagePreview(false);

    setFlightForm({
      title: deal.title || "",
      description: deal.description || "",
      price: deal.price || "",
      label: deal.label || "",
      buttonText: deal.buttonText || "",
      image: null,
    });

    setShowFlightForm(true);
  };

  // =====================================================
  // CLOSE FLIGHT FORM
  // =====================================================

  const closeFlightForm = () => {
    setShowFlightForm(false);
    setEditingFlightId(null);
    setShowFlightImagePreview(false);

    setFlightForm({
      title: "",
      description: "",
      price: "",
      label: "",
      buttonText: "",
      image: null,
    });
  };

  // =====================================================
  // SAVE FLIGHT DEAL
  // =====================================================

  const handleFlightSubmit = async (e) => {
    e.preventDefault();

    const token = getToken();

    if (!token) {
      handleAuthenticationError();
      return;
    }

    try {
      const formData = new FormData();

      formData.append("title", flightForm.title);
      formData.append(
        "description",
        flightForm.description
      );
      formData.append("price", flightForm.price);
      formData.append("label", flightForm.label);
      formData.append(
        "buttonText",
        flightForm.buttonText
      );

      if (flightForm.image) {
        formData.append("image", flightForm.image);
      }

      let response;

      if (editingFlightId !== null) {
        response = await fetch(
          `http://localhost:5000/home-flights/${editingFlightId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );
      } else {
        response = await fetch(
          "http://localhost:5000/home-flights",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );
      }

      const data = await response.json();

      if (response.status === 401) {
        handleAuthenticationError();
        return;
      }

      if (!response.ok) {
        alert(
          data.message ||
            (editingFlightId !== null
              ? "Failed to update flight deal"
              : "Failed to add flight deal")
        );

        return;
      }

      if (editingFlightId !== null) {
        alert("Flight deal updated successfully");
      } else {
        alert("Flight deal added successfully");
      }

      await fetchHomeFlights();

      closeFlightForm();
    } catch (error) {
      console.error(
        "Error saving flight deal:",
        error
      );

      alert(
        "Something went wrong while saving the flight deal."
      );
    }
  };

  // =====================================================
  // DELETE FLIGHT DEAL
  // =====================================================

  const deleteFlightDeal = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this flight deal?"
    );

    if (!confirmed) return;

    const token = getToken();

    if (!token) {
      handleAuthenticationError();
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/home-flights/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        handleAuthenticationError();
        return;
      }

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to delete flight deal"
        );

        return;
      }

      alert("Flight deal deleted successfully");

      await fetchHomeFlights();
    } catch (error) {
      console.error(
        "Error deleting flight deal:",
        error
      );

      alert(
        "Something went wrong while deleting the flight deal."
      );
    }
  };

  // =====================================================
  // OPEN ADD TOUR FORM
  // =====================================================

  const openAddTourForm = () => {
    setEditingTourId(null);

    setShowTourImagePreview(false);

    setTourForm({
      title: "",
      description: "",
      price: "",
      label: "",
      buttonText: "",
      image: null,
    });

    setShowTourForm(true);
  };

  // =====================================================
  // OPEN EDIT TOUR FORM
  // =====================================================

  const openEditTourForm = (tour) => {
    setEditingTourId(tour._id);

    setShowTourImagePreview(false);

    setTourForm({
      title: tour.title || "",
      description: tour.description || "",
      price: tour.price || "",
      label: tour.label || "",
      buttonText: tour.buttonText || "",
      image: null,
    });

    setShowTourForm(true);
  };

  // =====================================================
  // CLOSE TOUR FORM
  // =====================================================

  const closeTourForm = () => {
    setShowTourForm(false);
    setEditingTourId(null);
    setShowTourImagePreview(false);

    setTourForm({
      title: "",
      description: "",
      price: "",
      label: "",
      buttonText: "",
      image: null,
    });
  };

  // =====================================================
  // SAVE TOUR PACKAGE
  // =====================================================

  const handleTourSubmit = async (e) => {
    e.preventDefault();

    const token = getToken();

    if (!token) {
      handleAuthenticationError();
      return;
    }

    try {
      const formData = new FormData();

      formData.append("title", tourForm.title);
      formData.append(
        "description",
        tourForm.description
      );
      formData.append("price", tourForm.price);
      formData.append("label", tourForm.label);
      formData.append(
        "buttonText",
        tourForm.buttonText
      );

      if (tourForm.image) {
        formData.append("image", tourForm.image);
      }

      let response;

      if (editingTourId !== null) {
        response = await fetch(
          `http://localhost:5000/home-tours/${editingTourId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );
      } else {
        response = await fetch(
          "http://localhost:5000/home-tours",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );
      }

      const data = await response.json();

      if (response.status === 401) {
        handleAuthenticationError();
        return;
      }

      if (!response.ok) {
        alert(
          data.message ||
            (editingTourId !== null
              ? "Failed to update tour package"
              : "Failed to add tour package")
        );

        return;
      }

      if (editingTourId !== null) {
        alert("Tour package updated successfully");
      } else {
        alert("Tour package added successfully");
      }

      await fetchHomeTours();

      closeTourForm();
    } catch (error) {
      console.error(
        "Error saving tour package:",
        error
      );

      alert(
        "Something went wrong while saving the tour package."
      );
    }
  };

  // =====================================================
  // DELETE TOUR PACKAGE
  // =====================================================

  const deleteTourPackage = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this tour package?"
    );

    if (!confirmed) return;

    const token = getToken();

    if (!token) {
      handleAuthenticationError();
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/home-tours/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        handleAuthenticationError();
        return;
      }

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to delete tour package"
        );

        return;
      }

      alert("Tour package deleted successfully");

      await fetchHomeTours();
    } catch (error) {
      console.error(
        "Error deleting tour package:",
        error
      );

      alert(
        "Something went wrong while deleting the tour package."
      );
    }
  };

  // =====================================================
  // IMAGE URL
  // =====================================================

  const getImageUrl = (image) => {
    if (!image) return "";

    if (image.startsWith("/")) {
      return `http://localhost:5000${image}`;
    }

    return `http://localhost:5000/uploads/${image}`;
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="min-h-screen bg-[#f4f8ff]">

      {/* PAGE HEADER */}

      <div className="bg-white border-b border-blue-100 px-6 py-5 md:px-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#123b70]">
            Home Page
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Manage the offers displayed on your website.
          </p>
        </div>
      </div>


      {/* MAIN CONTENT */}

      <div className="p-6 md:p-10 max-w-7xl mx-auto">

        {/* FLIGHT DEALS */}

        <section className="mb-12">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

            <div>
              <h2 className="text-2xl font-bold text-[#123b70]">
                Cheap Flight Deals
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                {flightDeals.length} flight deal
                {flightDeals.length !== 1 ? "s" : ""} available
              </p>
            </div>


            <button
              onClick={openAddFlightForm}
              className="bg-[#1976d2] hover:bg-[#0d47a1] text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold transition"
            >
              <FaPlus />
              Add Flight Deal
            </button>

          </div>


          {flightDeals.length === 0 ? (

            <div className="bg-white rounded-3xl border border-blue-100 shadow-sm p-12 text-center">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 text-[#1976d2] flex items-center justify-center mb-4">
                <FaImage className="text-2xl" />
              </div>

              <h3 className="text-xl font-bold text-[#123b70]">
                No Flight Deals
              </h3>

              <p className="text-gray-500 mt-2 mb-6">
                Add your first flight deal to display it on the homepage.
              </p>

              <button
                onClick={openAddFlightForm}
                className="bg-[#0d47a1] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#123b70] transition"
              >
                Add Flight Deal
              </button>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {flightDeals.map((deal) => (

                <div
                  key={deal._id}
                  className="bg-white rounded-2xl border border-blue-100 shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-xl transition duration-300"
                >

                  <div className="w-full h-40 bg-blue-50">

                    {deal.image ? (

                      <img
                        src={getImageUrl(deal.image)}
                        alt={deal.title}
                        className="w-full h-full object-cover"
                      />

                    ) : (

                      <div className="w-full h-full flex items-center justify-center text-[#1976d2]">
                        <FaImage className="text-4xl" />
                      </div>

                    )}

                  </div>


                  <div className="p-5">

                    <span className="inline-block bg-blue-100 text-[#1976d2] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      {deal.label}
                    </span>

                    <h3 className="text-xl font-bold text-[#123b70]">
                      {deal.title}
                    </h3>

                    <p className="text-gray-500 text-sm mt-2 line-clamp-3">
                      {deal.description}
                    </p>

                    <p className="text-xl font-bold text-[#1976d2] mt-4">
                      {deal.price}
                    </p>


                    <div className="flex gap-3 mt-5">

                      <button
                        onClick={() =>
                          openEditFlightForm(deal)
                        }
                        className="flex-1 flex items-center justify-center gap-2 border border-blue-200 text-[#0d47a1] py-2.5 rounded-xl font-semibold hover:bg-blue-50 transition"
                      >
                        <FaEdit />
                        Edit
                      </button>


                      <button
                        onClick={() =>
                          deleteFlightDeal(deal._id)
                        }
                        className="flex-1 flex items-center justify-center gap-2 border border-red-200 text-red-600 py-2.5 rounded-xl font-semibold hover:bg-red-50 transition"
                      >
                        <FaTrash />
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* TOUR PACKAGES */}

        <section>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

            <div>

              <h2 className="text-2xl font-bold text-[#123b70]">
                Tour Packages
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                {tourPackages.length} tour package
                {tourPackages.length !== 1 ? "s" : ""} available
              </p>

            </div>


            <button
              onClick={openAddTourForm}
              className="bg-[#1976d2] hover:bg-[#0d47a1] text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold transition"
            >
              <FaPlus />
              Add Tour Package
            </button>

          </div>


          {tourPackages.length === 0 ? (

            <div className="bg-white rounded-3xl border border-blue-100 shadow-sm p-12 text-center">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 text-[#1976d2] flex items-center justify-center mb-4">
                <FaTag className="text-2xl" />
              </div>

              <h3 className="text-xl font-bold text-[#123b70]">
                No Tour Packages
              </h3>

              <p className="text-gray-500 mt-2 mb-6">
                Add your first tour package to display it on the homepage.
              </p>

              <button
                onClick={openAddTourForm}
                className="bg-[#0d47a1] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#123b70] transition"
              >
                Add Tour Package
              </button>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {tourPackages.map((tour) => (

                <div
                  key={tour._id}
                  className="bg-white rounded-2xl border border-blue-100 shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-xl transition duration-300"
                >

                  <div className="w-full h-40 bg-blue-50">

                    {tour.image ? (

                      <img
                        src={getImageUrl(tour.image)}
                        alt={tour.title}
                        className="w-full h-full object-cover"
                      />

                    ) : (

                      <div className="w-full h-full flex items-center justify-center text-[#1976d2]">
                        <FaImage className="text-4xl" />
                      </div>

                    )}

                  </div>


                  <div className="p-5">

                    <span className="inline-block bg-blue-100 text-[#1976d2] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      {tour.label}
                    </span>

                    <h3 className="text-xl font-bold text-[#123b70]">
                      {tour.title}
                    </h3>

                    <p className="text-gray-500 text-sm mt-2 line-clamp-3">
                      {tour.description}
                    </p>

                    <p className="text-xl font-bold text-[#1976d2] mt-4">
                      {tour.price}
                    </p>


                    <div className="flex gap-3 mt-5">

                      <button
                        onClick={() =>
                          openEditTourForm(tour)
                        }
                        className="flex-1 flex items-center justify-center gap-2 border border-blue-200 text-[#0d47a1] py-2.5 rounded-xl font-semibold hover:bg-blue-50 transition"
                      >
                        <FaEdit />
                        Edit
                      </button>


                      <button
                        onClick={() =>
                          deleteTourPackage(tour._id)
                        }
                        className="flex-1 flex items-center justify-center gap-2 border border-red-200 text-red-600 py-2.5 rounded-xl font-semibold hover:bg-red-50 transition"
                      >
                        <FaTrash />
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </div>


      {/* FLIGHT ADD / EDIT MODAL */}

      {showFlightForm && (

        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-lg max-h-[82vh] overflow-y-auto rounded-2xl shadow-2xl">

            <div className="bg-gradient-to-r from-[#0d47a1] to-[#1976d2] px-5 py-4 text-white">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-blue-100 text-xs">
                    Home Page
                  </p>

                  <h2 className="text-xl font-bold">
                    {editingFlightId !== null
                      ? "Edit Flight Deal"
                      : "Add Flight Deal"}
                  </h2>

                </div>


                <button
                  type="button"
                  onClick={closeFlightForm}
                  className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition"
                >
                  <FaTimes />
                </button>

              </div>

            </div>


            <form
              onSubmit={handleFlightSubmit}
              className="p-5 space-y-4"
            >

              {/* FLIGHT IMAGE */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Flight Deal Image
                </label>

                <div className="border-2 border-dashed border-blue-200 rounded-xl overflow-hidden">

                  <div className="flex items-center justify-between gap-2 px-4 py-3">

                    <label className="flex items-center gap-2 min-w-0 flex-1 cursor-pointer">

                      <FaImage className="text-[#1976d2] flex-shrink-0" />

                      <span className="text-sm text-gray-600 truncate">
                        {flightForm.image
                          ? flightForm.image.name
                          : "Choose image from device"}
                      </span>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFlightImageChange}
                        className="hidden"
                      />

                    </label>


                    {flightForm.image && (

                      <button
                        type="button"
                        onClick={() =>
                          setShowFlightImagePreview(
                            !showFlightImagePreview
                          )
                        }
                        className="text-[#0d47a1] text-sm font-semibold px-2 py-1 hover:bg-blue-50 rounded-md transition flex-shrink-0"
                      >
                        {showFlightImagePreview
                          ? "Hide"
                          : "View"}
                      </button>

                    )}

                  </div>


                  {showFlightImagePreview &&
                    flightForm.image && (

                      <div className="border-t border-blue-100 bg-gray-50 p-3">

                        <img
                          src={URL.createObjectURL(
                            flightForm.image
                          )}
                          alt="Flight deal preview"
                          className="w-full h-32 object-cover rounded-lg"
                        />

                      </div>

                    )}

                </div>

              </div>


              {/* TITLE */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={flightForm.title}
                  onChange={handleFlightChange}
                  placeholder="e.g. Cheap Flight Deals"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400"
                />

              </div>


              {/* DESCRIPTION */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Description
                </label>

                <textarea
                  name="description"
                  value={flightForm.description}
                  onChange={handleFlightChange}
                  placeholder="Enter description"
                  rows="3"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                />

              </div>


              {/* PRICE */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Price
                </label>

                <input
                  type="text"
                  name="price"
                  value={flightForm.price}
                  onChange={handleFlightChange}
                  placeholder="e.g. $299"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400"
                />

              </div>


              {/* LABEL */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Label
                </label>

                <input
                  type="text"
                  name="label"
                  value={flightForm.label}
                  onChange={handleFlightChange}
                  placeholder="e.g. FLIGHT DEALS"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400"
                />

              </div>


              {/* BUTTON TEXT */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Button Text
                </label>

                <input
                  type="text"
                  name="buttonText"
                  value={flightForm.buttonText}
                  onChange={handleFlightChange}
                  placeholder="e.g. Book Now"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400"
                />

              </div>


              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">

                <p className="text-sm font-semibold text-[#0d47a1]">
                  Book Now Button
                </p>

                <p className="text-xs text-gray-600 mt-1">
                  The Book Now button remains connected to
                  InterGuide Air's WhatsApp contact.
                </p>

              </div>


              <div className="flex gap-3 pt-1">

                <button
                  type="button"
                  onClick={closeFlightForm}
                  className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-[#0d47a1] text-white py-2.5 rounded-lg font-semibold hover:bg-[#123b70] transition"
                >
                  {editingFlightId !== null
                    ? "Save Changes"
                    : "Add Flight Deal"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* TOUR ADD / EDIT MODAL */}

      {showTourForm && (

        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-lg max-h-[82vh] overflow-y-auto rounded-2xl shadow-2xl">

            <div className="bg-gradient-to-r from-[#0d47a1] to-[#1976d2] px-5 py-4 text-white">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-blue-100 text-xs">
                    Home Page
                  </p>

                  <h2 className="text-xl font-bold">
                    {editingTourId !== null
                      ? "Edit Tour Package"
                      : "Add Tour Package"}
                  </h2>

                </div>


                <button
                  type="button"
                  onClick={closeTourForm}
                  className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition"
                >
                  <FaTimes />
                </button>

              </div>

            </div>


            <form
              onSubmit={handleTourSubmit}
              className="p-5 space-y-4"
            >

              {/* TOUR IMAGE */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tour Package Image
                </label>

                <div className="border-2 border-dashed border-blue-200 rounded-xl overflow-hidden">

                  <div className="flex items-center justify-between gap-2 px-4 py-3">

                    <label className="flex items-center gap-2 min-w-0 flex-1 cursor-pointer">

                      <FaImage className="text-[#1976d2] flex-shrink-0" />

                      <span className="text-sm text-gray-600 truncate">
                        {tourForm.image
                          ? tourForm.image.name
                          : "Choose image from device"}
                      </span>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleTourImageChange}
                        className="hidden"
                      />

                    </label>


                    {tourForm.image && (

                      <button
                        type="button"
                        onClick={() =>
                          setShowTourImagePreview(
                            !showTourImagePreview
                          )
                        }
                        className="text-[#0d47a1] text-sm font-semibold px-2 py-1 hover:bg-blue-50 rounded-md transition flex-shrink-0"
                      >
                        {showTourImagePreview
                          ? "Hide"
                          : "View"}
                      </button>

                    )}

                  </div>


                  {showTourImagePreview &&
                    tourForm.image && (

                      <div className="border-t border-blue-100 bg-gray-50 p-3">

                        <img
                          src={URL.createObjectURL(
                            tourForm.image
                          )}
                          alt="Tour package preview"
                          className="w-full h-32 object-cover rounded-lg"
                        />

                      </div>

                    )}

                </div>

              </div>


              {/* TITLE */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={tourForm.title}
                  onChange={handleTourChange}
                  placeholder="e.g. Amazing Tour Packages"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400"
                />

              </div>


              {/* DESCRIPTION */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Description
                </label>

                <textarea
                  name="description"
                  value={tourForm.description}
                  onChange={handleTourChange}
                  placeholder="Enter description"
                  rows="3"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                />

              </div>


              {/* PRICE */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Price
                </label>

                <input
                  type="text"
                  name="price"
                  value={tourForm.price}
                  onChange={handleTourChange}
                  placeholder="e.g. ₦499,000"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400"
                />

              </div>


              {/* LABEL */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Label
                </label>

                <input
                  type="text"
                  name="label"
                  value={tourForm.label}
                  onChange={handleTourChange}
                  placeholder="e.g. PROMO"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400"
                />

              </div>


              {/* BUTTON TEXT */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Button Text
                </label>

                <input
                  type="text"
                  name="buttonText"
                  value={tourForm.buttonText}
                  onChange={handleTourChange}
                  placeholder="e.g. Explore Packages"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400"
                />

              </div>


              {/* NOTICE */}

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">

                <p className="text-sm font-semibold text-[#0d47a1]">
                  Explore Packages Button
                </p>

                <p className="text-xs text-gray-600 mt-1">
                  The button remains connected to the Tour Packages page.
                </p>

              </div>


              {/* BUTTONS */}

              <div className="flex gap-3 pt-1">

                <button
                  type="button"
                  onClick={closeTourForm}
                  className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-[#0d47a1] text-white py-2.5 rounded-lg font-semibold hover:bg-[#123b70] transition"
                >
                  {editingTourId !== null
                    ? "Save Changes"
                    : "Add Tour Package"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default HomeManagement;