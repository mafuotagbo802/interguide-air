import React, { useEffect, useState } from 'react';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaMoneyBillWave,
  FaTimes,
  FaImage,
  FaCalendarAlt,
} from 'react-icons/fa';

const AdminFlightManagement = () => {
  // =====================================================
  // FLIGHT DATA
  // =====================================================

  const [flightDeals, setFlightDeals] = useState([]);

  // =====================================================
  // MODAL & EDITING STATES
  // =====================================================

  const [showForm, setShowForm] = useState(false);
  const [editingFlightId, setEditingFlightId] = useState(null);
  const [showImagePreview, setShowImagePreview] = useState(false);

  // =====================================================
  // FORM DATA
  // =====================================================

  const [flightForm, setFlightForm] = useState({
    airline: '',
    departure: '',
    destination: '',
    startDate: '',
    endDate: '',
    price: '',
    image: null,
  });

  // =====================================================
  // FETCH FLIGHTS
  // =====================================================

  const fetchFlights = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/flights'
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(
          data.message || 'Failed to fetch flights'
        );
        return;
      }

      setFlightDeals(data);
    } catch (error) {
      console.error(
        'Error fetching flights:',
        error
      );
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  // =====================================================
  // OPEN ADD FORM
  // =====================================================

  const openAddForm = () => {
    setEditingFlightId(null);

    setFlightForm({
      airline: '',
      departure: '',
      destination: '',
      startDate: '',
      endDate: '',
      price: '',
      image: null,
    });

    setShowImagePreview(false);
    setShowForm(true);
  };

  // =====================================================
  // OPEN EDIT FORM
  // =====================================================

  const openEditForm = (flight) => {
    setEditingFlightId(flight._id);

    setFlightForm({
      airline: flight.airline || '',
      departure: flight.departure || '',
      destination: flight.destination || '',
      startDate: flight.startDate || '',
      endDate: flight.endDate || '',
      price: flight.price || '',
      image: null,
    });

    setShowImagePreview(false);
    setShowForm(true);
  };

  // =====================================================
  // CLOSE FORM
  // =====================================================

  const closeForm = () => {
    setShowForm(false);
    setEditingFlightId(null);
    setShowImagePreview(false);

    setFlightForm({
      airline: '',
      departure: '',
      destination: '',
      startDate: '',
      endDate: '',
      price: '',
      image: null,
    });
  };

  // =====================================================
  // HANDLE INPUT CHANGES
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFlightForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // HANDLE IMAGE UPLOAD
  // =====================================================

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFlightForm((previous) => ({
      ...previous,
      image: file,
    }));

    setShowImagePreview(true);
  };

  // =====================================================
  // SAVE FLIGHT
  // =====================================================

  const handleSaveFlight = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem(
      'adminToken'
    );
    if (!token) {
      alert(
        'Authentication required. Please log in again.'
      );
      return;
    }

    try {
      const formData = new FormData();

      formData.append(
        'airline',
        flightForm.airline
      );

      formData.append(
        'departure',
        flightForm.departure
      );

      formData.append(
        'destination',
        flightForm.destination
      );

      formData.append(
        'startDate',
        flightForm.startDate
      );

      formData.append(
        'endDate',
        flightForm.endDate
      );

      formData.append(
        'price',
        flightForm.price
      );

      // Add image only when a new image is selected
      if (flightForm.image) {
        formData.append(
          'image',
          flightForm.image
        );
      }

      // =================================================
      // EDIT FLIGHT
      // =================================================

      if (editingFlightId !== null) {
        const response = await fetch(
          `http://localhost:5000/flights/${editingFlightId}`,
          {
            method: 'PUT',

            headers: {
              Authorization: `Bearer ${token}`,
            },

            body: formData,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            alert(
              'Your session has expired. Please log in again.'
            );

            localStorage.removeItem(
              'adminToken'
            );

            localStorage.removeItem(
              'adminInfo'
            );

            return;
          }

          alert(
            data.message ||
              'Failed to update flight'
          );

          return;
        }

        alert(
          'Flight updated successfully'
        );
      }

      // =================================================
      // ADD FLIGHT
      // =================================================

      else {
        const response = await fetch(
          'http://localhost:5000/flights',
          {
            method: 'POST',

            headers: {
              Authorization: `Bearer ${token}`,
            },

            body: formData,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            alert(
              'Your session has expired. Please log in again.'
            );

            localStorage.removeItem(
              'adminToken'
            );

            localStorage.removeItem(
              'adminInfo'
            );

            return;
          }

          alert(
            data.message ||
              'Failed to add flight'
          );

          return;
        }

        alert(
          'Flight added successfully'
        );
      }

      await fetchFlights();

      closeForm();

    } catch (error) {
      console.error(
        'Error saving flight:',
        error
      );

      alert(
        'Something went wrong while saving the flight.'
      );
    }
  };

  // =====================================================
  // DELETE FLIGHT
  // =====================================================

  const handleDeleteFlight = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this flight deal?'
    );

    if (!confirmed) return;

    const token = localStorage.getItem(
      'adminToken'
    );

    if (!token) {
      alert(
        'Authentication required. Please log in again.'
      );

      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/flights/${id}`,
        {
          method: 'DELETE',

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          alert(
            'Your session has expired. Please log in again.'
          );

          localStorage.removeItem(
            'adminToken'
          );

          localStorage.removeItem(
            'adminInfo'
          );

          return;
        }

        alert(
          data.message ||
            'Failed to delete flight'
        );

        return;
      }

      alert(
        'Flight deleted successfully'
      );

      await fetchFlights();

    } catch (error) {
      console.error(
        'Error deleting flight:',
        error
      );

      alert(
        'Something went wrong while deleting the flight.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Flight Page
          </h1>

          <p className="text-gray-500 mt-1">
            Add, edit or remove flight deals that appear on the
            InterGuide Air Flight page.
          </p>

        </div>

        <button
          onClick={openAddForm}
          className="flex items-center justify-center gap-2 bg-white text-[#0d47a1] px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition duration-300"
        >
          <FaPlus />
          Add Flight Deal
        </button>

      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="p-6 md:p-10 max-w-7xl mx-auto">

        <div>

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-2xl font-bold text-[#123b70]">
                Flight Deals
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                {flightDeals.length} flight deal
                {flightDeals.length !== 1
                  ? 's'
                  : ''}{' '}
                available
              </p>

            </div>

          </div>

          {/* =====================================================
              EMPTY STATE
          ===================================================== */}

          {flightDeals.length === 0 ? (

            <div className="bg-white rounded-3xl border border-blue-100 shadow-sm p-12 text-center">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 text-[#1976d2] flex items-center justify-center mb-4">

                <FaImage className="text-2xl" />

              </div>

              <h3 className="text-xl font-bold text-[#123b70]">
                No Flight Deals
              </h3>

              <p className="text-gray-500 mt-2 mb-6">
                Add your first flight deal to display it on the website.
              </p>

              <button
                onClick={openAddForm}
                className="bg-[#0d47a1] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#123b70] transition"
              >
                Add Flight Deal
              </button>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {flightDeals.map((flight) => (

                <div
                  key={flight._id}
                  className="bg-white rounded-2xl border border-blue-100 shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-xl transition duration-300"
                >

                  {/* =================================================
                      IMAGE
                  ================================================= */}

                  <div className="w-full h-40 bg-blue-50">

                    {flight.image ? (

                      <img
                        src={`http://localhost:5000${flight.image}`}
                        alt={flight.airline}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display =
                            'none';
                        }}
                      />

                    ) : (

                      <div className="w-full h-full flex items-center justify-center text-[#1976d2]">

                        <FaImage className="text-4xl" />

                      </div>

                    )}

                  </div>

                  {/* =================================================
                      CARD HEADER
                  ================================================= */}

                  <div className="bg-gradient-to-r from-[#0d47a1] to-[#1976d2] p-5 text-white">

                    <p className="text-blue-100 text-sm">
                      Airline
                    </p>

                    <h3 className="text-xl font-bold mt-1">
                      {flight.airline}
                    </h3>

                  </div>

                  {/* =================================================
                      CARD BODY
                  ================================================= */}

                  <div className="p-5">

                    {/* ROUTE */}

                    <div className="flex items-center gap-3 mb-5">

                      <div className="flex-1">

                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                          From
                        </p>

                        <p className="font-bold text-[#123b70]">
                          {flight.departure}
                        </p>

                      </div>

                      <div className="flex-1 text-right">

                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                          To
                        </p>

                        <p className="font-bold text-[#123b70]">
                          {flight.destination}
                        </p>

                      </div>

                    </div>

                    {/* DATE */}

                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">

                      <div className="flex items-center gap-2 text-gray-500">

                        <FaCalendarAlt className="text-[#1976d2]" />

                        <span className="text-sm">
                          Available
                        </span>

                      </div>

                      <span className="font-semibold text-gray-700 text-sm">
                        {flight.startDate} - {flight.endDate}
                      </span>

                    </div>

                    {/* PRICE */}

                    <div className="flex items-center justify-between mt-3">

                      <div className="flex items-center gap-2 text-gray-500">

                        <FaMoneyBillWave className="text-green-500" />

                        <span className="text-sm">
                          Starting From
                        </span>

                      </div>

                      <span className="font-bold text-[#0d47a1]">
                        {flight.price}
                      </span>

                    </div>

                    {/* ACTION BUTTONS */}

                    <div className="flex gap-3 mt-5">

                      <button
                        onClick={() =>
                          openEditForm(flight)
                        }
                        className="flex-1 flex items-center justify-center gap-2 border border-blue-200 text-[#0d47a1] py-2.5 rounded-xl font-semibold hover:bg-blue-50 transition"
                      >
                        <FaEdit />
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteFlight(
                            flight._id
                          )
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

        </div>

      </div>

      {/* =====================================================
          ADD / EDIT MODAL
      ===================================================== */}

      {showForm && (

        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-lg max-h-[82vh] overflow-y-auto rounded-2xl shadow-2xl">

            {/* MODAL HEADER */}

            <div className="bg-gradient-to-r from-[#0d47a1] to-[#1976d2] px-5 py-4 text-white">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-blue-100 text-xs">
                    Flight Management
                  </p>

                  <h2 className="text-xl font-bold">
                    {editingFlightId !== null
                      ? 'Edit Flight Deal'
                      : 'Add Flight Deal'}
                  </h2>

                </div>

                <button
                  onClick={closeForm}
                  className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition"
                >
                  <FaTimes />
                </button>

              </div>

            </div>

            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={handleSaveFlight}
              className="p-5 space-y-4"
            >

              {/* IMAGE UPLOAD */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Flight Deal Image
                </label>

                <div className="border-2 border-dashed border-blue-200 rounded-xl overflow-hidden">

                  {/* IMAGE SELECT ROW */}

                  <div className="flex items-center justify-between gap-2 px-4 py-3">

                    <label className="flex items-center gap-2 min-w-0 flex-1 cursor-pointer">

                      <FaImage className="text-[#1976d2] flex-shrink-0" />

                      <span className="text-sm text-gray-600 truncate">
                        {flightForm.image
                          ? flightForm.image.name
                          : 'Choose image from device'}
                      </span>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />

                    </label>

                    {/* VIEW / HIDE BUTTON */}

                    {flightForm.image && (

                      <button
                        type="button"
                        onClick={() =>
                          setShowImagePreview(
                            !showImagePreview
                          )
                        }
                        className="text-[#0d47a1] text-sm font-semibold px-2 py-1 hover:bg-blue-50 rounded-md transition flex-shrink-0"
                      >
                        {showImagePreview
                          ? 'Hide'
                          : 'View'}
                      </button>

                    )}

                  </div>

                  {/* DROPDOWN IMAGE PREVIEW */}

                  {showImagePreview &&
                    flightForm.image && (

                      <div className="border-t border-blue-100 bg-gray-50 p-3">

                        <img
                          src={URL.createObjectURL(
                            flightForm.image
                          )}
                          alt="Flight preview"
                          className="w-full h-32 object-cover rounded-lg"
                        />

                      </div>

                    )}

                </div>

              </div>

              {/* AIRLINE */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Airline Name
                </label>

                <input
                  type="text"
                  name="airline"
                  value={flightForm.airline}
                  onChange={handleChange}
                  placeholder="e.g. Air Peace"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400"
                />

              </div>

              {/* ROUTE */}

              <div className="grid grid-cols-2 gap-4">

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Departure
                  </label>

                  <input
                    type="text"
                    name="departure"
                    value={flightForm.departure}
                    onChange={handleChange}
                    placeholder="Lagos"
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400"
                  />

                </div>

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Destination
                  </label>

                  <input
                    type="text"
                    name="destination"
                    value={flightForm.destination}
                    onChange={handleChange}
                    placeholder="London"
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400"
                  />

                </div>

              </div>

              {/* DATES */}

              <div className="grid grid-cols-2 gap-4">

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Start Date
                  </label>

                  <input
                    type="date"
                    name="startDate"
                    value={flightForm.startDate}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400"
                  />

                </div>

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    End Date
                  </label>

                  <input
                    type="date"
                    name="endDate"
                    value={flightForm.endDate}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400"
                  />

                </div>

              </div>

              {/* PRICE */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Starting Price
                </label>

                <input
                  type="text"
                  name="price"
                  value={flightForm.price}
                  onChange={handleChange}
                  placeholder="e.g. ₦85,000"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400"
                />

              </div>

              {/* WHATSAPP NOTICE */}

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">

                <p className="text-sm font-semibold text-[#0d47a1]">
                  Book Now Button
                </p>

                <p className="text-xs text-gray-600 mt-1">
                  The Book Now button remains connected to InterGuide Air's
                  WhatsApp contact.
                </p>

              </div>

              {/* FORM BUTTONS */}

              <div className="flex gap-3 pt-1">

                <button
                  type="button"
                  onClick={closeForm}
                  className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-[#0d47a1] text-white py-2.5 rounded-lg font-semibold hover:bg-[#123b70] transition"
                >
                  {editingFlightId !== null
                    ? 'Save Changes'
                    : 'Add Flight Deal'}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default AdminFlightManagement;