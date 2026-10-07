import React, { useEffect, useState } from 'react';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaImage,
  FaMapMarkerAlt,
  FaBed,
  FaMoneyBillWave,
  FaHotel,
} from 'react-icons/fa';

const API_URL = 'http://localhost:5000/hotels';

const AdminHotelManagement = () => {
  const [hotels, setHotels] = useState([]);

  const [hotelForm, setHotelForm] = useState({
    name: '',
    location: '',
    description: '',
    price: '',
    image: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);

  // Image preview state
  const [showImagePreview, setShowImagePreview] = useState(false);

  // ==============================
  // GET HOTELS
  // ==============================
  const fetchHotels = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error('Failed to fetch hotels');
      }

      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // ==============================
  // ADD HOTEL
  // ==============================
  const handleAddHotel = () => {
    setEditingHotel(null);

    setHotelForm({
      name: '',
      location: '',
      description: '',
      price: '',
      image: null,
    });

    setShowImagePreview(false);
    setIsModalOpen(true);
  };

  // ==============================
  // EDIT HOTEL
  // ==============================
  const handleEditHotel = (hotel) => {
    setEditingHotel(hotel);

    setHotelForm({
      name: hotel.name || '',
      location: hotel.location || '',
      description: hotel.description || '',
      price: hotel.price || '',
      image: hotel.image || null,
    });

    setShowImagePreview(false);
    setIsModalOpen(true);
  };

  // ==============================
  // IMAGE SELECT
  // ==============================
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setHotelForm((previous) => ({
      ...previous,
      image: file,
    }));

    // Automatically show the preview after selecting an image
    setShowImagePreview(true);
  };

  // ==============================
  // INPUT CHANGE
  // ==============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setHotelForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==============================
  // SAVE HOTEL
  // ==============================
  const handleSaveHotel = async () => {
    if (
      !hotelForm.name.trim() ||
      !hotelForm.location.trim() ||
      !hotelForm.description.trim() ||
      !hotelForm.price.trim()
    ) {
      alert('Please fill in all hotel details.');
      return;
    }

    const token = localStorage.getItem('adminToken');

    if (!token) {
      alert('You are not logged in as an admin.');
      return;
    }

    try {
      const formData = new FormData();

      formData.append('name', hotelForm.name);
      formData.append('location', hotelForm.location);
      formData.append('description', hotelForm.description);
      formData.append('price', hotelForm.price);

      if (hotelForm.image instanceof File) {
        formData.append('image', hotelForm.image);
      }

      let response;

      // ==============================
      // UPDATE HOTEL
      // ==============================
      if (editingHotel) {
        response = await fetch(
          `${API_URL}/${editingHotel._id}`,
          {
            method: 'PUT',

            headers: {
              Authorization: `Bearer ${token}`,
            },

            body: formData,
          }
        );
      }

      // ==============================
      // ADD HOTEL
      // ==============================
      else {
        response = await fetch(API_URL, {
          method: 'POST',

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formData,
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to save hotel'
        );
      }

      await fetchHotels();

      setIsModalOpen(false);

      setHotelForm({
        name: '',
        location: '',
        description: '',
        price: '',
        image: null,
      });

      setEditingHotel(null);
      setShowImagePreview(false);

    } catch (error) {
      console.error('Error saving hotel:', error);

      alert(
        error.message ||
          'Something went wrong while saving the hotel.'
      );
    }
  };

  // ==============================
  // DELETE HOTEL
  // ==============================
  const handleDeleteHotel = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this hotel deal?'
    );

    if (!confirmDelete) return;

    const token = localStorage.getItem('adminToken');

    if (!token) {
      alert('You are not logged in as an admin.');
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: 'DELETE',

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to delete hotel'
        );
      }

      await fetchHotels();

    } catch (error) {
      console.error('Error deleting hotel:', error);

      alert(
        error.message ||
          'Something went wrong while deleting the hotel.'
      );
    }
  };

  // ==============================
  // CLOSE MODAL
  // ==============================
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingHotel(null);
    setShowImagePreview(false);

    setHotelForm({
      name: '',
      location: '',
      description: '',
      price: '',
      image: null,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">

      {/* ==============================
          PAGE HEADER
      ============================== */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Hotel Management
          </h1>

          <p className="text-gray-500 mt-1">
            Add, edit and manage hotel deals displayed on the website.
          </p>
        </div>

        <button
          onClick={handleAddHotel}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition"
        >
          <FaPlus />
          Add Hotel Deal
        </button>

      </div>

      {/* ==============================
          HOTEL CARDS
      ============================== */}

      {hotels.length === 0 ? (

        <div className="bg-white rounded-xl shadow-sm p-10 text-center">

          <FaHotel className="text-5xl text-gray-300 mx-auto mb-4" />

          <h2 className="text-xl font-semibold text-gray-600">
            No Hotel Deals Yet
          </h2>

          <p className="text-gray-400 mt-2">
            Click "Add Hotel Deal" to add your first hotel.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {hotels.map((hotel) => (

            <div
              key={hotel._id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >

              {/* IMAGE */}

              <div className="h-44 bg-gray-200">

                {hotel.image ? (

                  <img
                    src={`http://localhost:5000${hotel.image}`}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />

                ) : (

                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">

                    <FaHotel className="text-4xl mb-2" />

                    <span>No Image</span>

                  </div>

                )}

              </div>

              {/* HOTEL INFO */}

              <div className="p-4">

                <h2 className="text-lg font-bold text-gray-800">
                  {hotel.name}
                </h2>

                {/* LOCATION */}

                <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">

                  <FaMapMarkerAlt className="text-blue-600" />

                  <span>{hotel.location}</span>

                </div>

                {/* ROOM / PACKAGE DETAILS */}

                <div className="flex items-start gap-2 text-gray-600 text-sm mt-2">

                  <FaBed className="text-blue-600 mt-1" />

                  <span>{hotel.description}</span>

                </div>

                {/* PRICE */}

                <div className="flex items-center gap-2 text-lg font-bold text-blue-600 mt-3">

                  <FaMoneyBillWave />

                  <span>{hotel.price}</span>

                </div>

                {/* BUTTONS */}

                <div className="flex gap-3 mt-4">

                  <button
                    onClick={() => handleEditHotel(hotel)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-100 text-blue-700 hover:bg-blue-200 py-2 rounded-lg font-medium transition"
                  >
                    <FaEdit />
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDeleteHotel(hotel._id)
                    }
                    className="flex-1 flex items-center justify-center gap-2 bg-red-100 text-red-700 hover:bg-red-200 py-2 rounded-lg font-medium transition"
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

      {/* ==============================
          ADD / EDIT MODAL
      ============================== */}

      {isModalOpen && (

        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between p-5 border-b">

              <h2 className="text-xl font-bold text-gray-800">

                {editingHotel
                  ? 'Edit Hotel Deal'
                  : 'Add Hotel Deal'}

              </h2>

              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-red-500 text-xl"
              >
                <FaTimes />
              </button>

            </div>

            {/* FORM */}

            <div className="p-5 space-y-4">

              {/* IMAGE */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hotel Image
                </label>

                {/* IMAGE SELECTOR */}

                <div className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">

                  <div className="flex items-center justify-between gap-2 px-4 py-3">

                    {/* FILE SELECT */}

                    <label className="flex items-center gap-2 min-w-0 flex-1 cursor-pointer">

                      <FaImage className="text-blue-600 flex-shrink-0" />

                      <span className="text-sm text-gray-600 truncate">

                        {hotelForm.image

                          ? typeof hotelForm.image === 'string'
                            ? hotelForm.image.split('/').pop()
                            : hotelForm.image.name

                          : 'Upload hotel image'}

                      </span>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />

                    </label>

                    {/* VIEW / HIDE BUTTON */}

                    {hotelForm.image && (

                      <button
                        type="button"
                        onClick={() =>
                          setShowImagePreview(
                            !showImagePreview
                          )
                        }
                        className="text-blue-600 text-sm font-semibold px-2 py-1 hover:bg-blue-50 rounded-md transition flex-shrink-0"
                      >
                        {showImagePreview
                          ? 'Hide'
                          : 'View'}
                      </button>

                    )}

                  </div>

                  {/* IMAGE PREVIEW */}

                  {showImagePreview && hotelForm.image && (

                    <div className="border-t border-gray-200 bg-gray-50 p-3">

                      <img
                        src={
                          typeof hotelForm.image === 'string'
                            ? `http://localhost:5000${hotelForm.image}`
                            : URL.createObjectURL(
                                hotelForm.image
                              )
                        }
                        alt="Hotel preview"
                        className="w-full h-32 object-cover rounded-lg"
                      />

                    </div>

                  )}

                </div>

              </div>

              {/* HOTEL NAME */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Hotel Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={hotelForm.name}
                  onChange={handleChange}
                  placeholder="e.g. Eko Hotel & Suites"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* LOCATION */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={hotelForm.location}
                  onChange={handleChange}
                  placeholder="e.g. Victoria Island, Lagos"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* ROOM / PACKAGE DETAILS */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Room / Package Details
                </label>

                <textarea
                  name="description"
                  value={hotelForm.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="e.g. Deluxe Room • Breakfast Included • Free Wi-Fi"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none resize-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* PRICE */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Starting Price
                </label>

                <input
                  type="text"
                  name="price"
                  value={hotelForm.price}
                  onChange={handleChange}
                  placeholder="e.g. ₦150,000"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

            {/* MODAL FOOTER */}

            <div className="flex justify-end gap-3 p-5 border-t">

              <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveHotel}
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                {editingHotel
                  ? 'Save Changes'
                  : 'Add Hotel Deal'}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default AdminHotelManagement;