import React, { useState } from "react";
import API_URL from "../api";
import {
    FaImage,
    FaSave,
    FaTimes,
    FaUpload
} from "react-icons/fa";

// =====================================================
// TOUR PACKAGE IMAGES
// =====================================================

import Family from "../assets/Family.jpg";
import Family2 from "../assets/Family2.jpg";

import Corporate from "../assets/Corporate.jpg";
import Coporate2 from "../assets/Coporate2.jpg";

import Religion from "../assets/Religion.jpg";
import Religion2 from "../assets/Religion2.jpg";

import Honeymoon from "../assets/Honeymoon.jpg";
import Honeymoon2 from "../assets/Honeymoon2.jpg";

import Beach from "../assets/Beach.jpg";
import Beach2 from "../assets/Beach2.jpg";

import Spa from "../assets/Spa.jpg";
import Spa2 from "../assets/Spa2.jpg";

import Culture from "../assets/Culture.jpg";
import Culture2 from "../assets/Culture2.jpg";

import Education from "../assets/Education.jpg";
import Education2 from "../assets/Education2.jpg";


// =====================================================
// TOUR PACKAGE DATA
// =====================================================

const defaultPackages = [
    {
        name: "Family Tours",
        description:
            "Quality time, amazing places, unforgettable moments.",
        image1: Family,
        image2: Family2
    },

    {
        name: "Corporate & Group Tours",
        description:
            "Build stronger teams with memorable experiences.",
        image1: Corporate,
        image2: Coporate2
    },

    {
        name: "Religious Pilgrimage Tours",
        description:
            "A spiritual journey to meaningful destinations.",
        image1: Religion,
        image2: Religion2
    },

    {
        name: "Honeymoon Tours",
        description:
            "Start your forever in the most beautiful places.",
        image1: Honeymoon,
        image2: Honeymoon2
    },

    {
        name: "Beach Holidays",
        description:
            "Sun, sand and pure relaxation.",
        image1: Beach,
        image2: Beach2
    },

    {
        name: "Wellness and Spa",
        description:
            "Relax. Rejuvenate. Feel renewed.",
        image1: Spa,
        image2: Spa2
    },

    {
        name: "Cultural Holidays",
        description:
            "Discover new cultures, traditions and ways of life.",
        image1: Culture,
        image2: Culture2
    },

    {
        name: "Educational Tours",
        description:
            "Learn, explore and grow.",
        image1: Education,
        image2: Education2
    }
];


// =====================================================
// IMAGE URL HELPER
// =====================================================

const getImageUrl = (image) => {

    if (!image) {
        return "";
    }

    // Uploaded image from backend
    if (image.startsWith("/")) {
        return `${API_URL}${image}`;
    }

    // Already a complete URL
    if (
        image.startsWith("http://") ||
        image.startsWith("https://") ||
        image.startsWith("blob:")
    ) {
        return image;
    }

    return image;
};


// =====================================================
// CONVERT DEFAULT IMAGE TO FILE
// =====================================================

const convertImageToFile = async (
    imageUrl,
    fileName
) => {

    const response =
        await fetch(imageUrl);

    const blob =
        await response.blob();

    return new File(
        [blob],
        fileName,
        {
            type:
                blob.type ||
                "image/jpeg"
        }
    );
};


// =====================================================
// COMPONENT
// =====================================================

const AdminTourPackageManagement = () => {

    // =================================================
    // STATE
    // =================================================

    const [
        packages,
        setPackages
    ] = useState(
        defaultPackages.map(
            (item) => ({
                ...item,
                image1File: null,
                image2File: null,
                saved: false
            })
        )
    );

    const [
        loading,
        setLoading
    ] = useState(false);

    const [
        savingIndex,
        setSavingIndex
    ] = useState(null);

    const [
        expandedImage,
        setExpandedImage
    ] = useState(null);


    // =================================================
    // LOAD SAVED PACKAGES
    // =================================================

    const loadPackages = async () => {

        try {

            setLoading(true);

            const response =
                await fetch(
                    `${API_URL}/tour-packages`
                );

            if (!response.ok) {
                throw new Error(
                    "Failed to load tour packages"
                );
            }

            const savedPackages =
                await response.json();

            setPackages(
                (currentPackages) => {

                    return currentPackages.map(
                        (defaultPackage) => {

                            const savedPackage =
                                savedPackages.find(
                                    (item) =>
                                        item.name ===
                                        defaultPackage.name
                                );

                            if (!savedPackage) {
                                return defaultPackage;
                            }

                            return {
                                ...defaultPackage,

                                image1:
                                    savedPackage.image1
                                        ? savedPackage.image1
                                        : defaultPackage.image1,

                                image2:
                                    savedPackage.image2
                                        ? savedPackage.image2
                                        : defaultPackage.image2,

                                databaseId:
                                    savedPackage._id,

                                image1File:
                                    null,

                                image2File:
                                    null,

                                saved:
                                    true
                            };
                        }
                    );
                }
            );

        } catch (error) {

            console.error(
                "Load tour packages error:",
                error
            );

        } finally {

            setLoading(false);
        }
    };


    // =================================================
    // LOAD DATABASE DATA WHEN PAGE OPENS
    // =================================================

    React.useEffect(() => {

        loadPackages();

    }, []);


    // =================================================
    // CHOOSE IMAGE
    // =================================================

    const handleImageChange = (
        event,
        index,
        imageNumber
    ) => {

        const file =
            event.target.files[0];

        if (!file) {
            return;
        }

        const previewUrl =
            URL.createObjectURL(file);

        setPackages(
            (currentPackages) => {

                const updatedPackages =
                    [...currentPackages];

                if (
                    imageNumber === 1
                ) {

                    updatedPackages[index] = {
                        ...updatedPackages[index],

                        image1:
                            previewUrl,

                        image1File:
                            file,

                        saved:
                            false
                    };

                } else {

                    updatedPackages[index] = {
                        ...updatedPackages[index],

                        image2:
                            previewUrl,

                        image2File:
                            file,

                        saved:
                            false
                    };
                }

                return updatedPackages;
            }
        );
    };


    // =================================================
    // CANCEL IMAGE CHANGE
    // =================================================

    const cancelImageChange = (
        index,
        imageNumber
    ) => {

        setPackages(
            (currentPackages) => {

                const updatedPackages =
                    [...currentPackages];

                const currentPackage =
                    updatedPackages[index];

                const defaultPackage =
                    defaultPackages[index];

                if (
                    imageNumber === 1
                ) {

                    updatedPackages[index] = {

                        ...currentPackage,

                        image1:
                            currentPackage.databaseId
                                ? currentPackage.image1
                                : defaultPackage.image1,

                        image1File:
                            null
                    };

                } else {

                    updatedPackages[index] = {

                        ...currentPackage,

                        image2:
                            currentPackage.databaseId
                                ? currentPackage.image2
                                : defaultPackage.image2,

                        image2File:
                            null
                    };
                }

                return updatedPackages;
            }
        );
    };


    // =================================================
    // SAVE PACKAGE
    // =================================================

    const handleSave = async (
        index
    ) => {

        const packageData =
            packages[index];

        try {

            setSavingIndex(index);

            const token =
                localStorage.getItem(
                    "adminToken"
                );

            if (!token) {

                alert(
                    "Your admin session has expired. Please log in again."
                );

                return;
            }


            // =============================================
            // FORM DATA
            // =============================================

            const formData =
                new FormData();

            formData.append(
                "name",
                packageData.name
            );


            // =============================================
            // IMAGE 1
            // =============================================

            if (
                packageData.image1File
            ) {

                formData.append(
                    "image1",
                    packageData.image1File
                );

            } else {

                // Use the existing/default image
                // when this package is being created
                const image1File =
                    await convertImageToFile(
                        getImageUrl(
                            packageData.image1
                        ),
                        `${packageData.name}-image1.jpg`
                    );

                formData.append(
                    "image1",
                    image1File
                );
            }


            // =============================================
            // IMAGE 2
            // =============================================

            if (
                packageData.image2File
            ) {

                formData.append(
                    "image2",
                    packageData.image2File
                );

            } else {

                // Use the existing/default image
                // when this package is being created
                const image2File =
                    await convertImageToFile(
                        getImageUrl(
                            packageData.image2
                        ),
                        `${packageData.name}-image2.jpg`
                    );

                formData.append(
                    "image2",
                    image2File
                );
            }


            // =============================================
            // CREATE OR UPDATE
            // =============================================

            let response;

            // If package already exists in MongoDB
            if (
                packageData.databaseId
            ) {

                response =
                    await fetch(

                        `${API_URL}/tour-packages/${packageData.databaseId}`,

                        {
                            method:
                                "PUT",

                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            },

                            body:
                                formData
                        }
                    );

            } else {

                // First save for this package
                response =
                    await fetch(

                        `${API_URL}/tour-packages`,

                        {
                            method:
                                "POST",

                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            },

                            body:
                                formData
                        }
                    );
            }


            // =============================================
            // HANDLE RESPONSE
            // =============================================

            const data =
                await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to save tour package"
                );
            }


            // =============================================
            // UPDATE FRONTEND WITH DATABASE DATA
            // =============================================

            setPackages(
                (currentPackages) => {

                    const updatedPackages =
                        [...currentPackages];

                    updatedPackages[index] = {

                        ...updatedPackages[index],

                        databaseId:
                            data._id,

                        image1:
                            data.image1,

                        image2:
                            data.image2,

                        image1File:
                            null,

                        image2File:
                            null,

                        saved:
                            true
                    };

                    return updatedPackages;
                }
            );

            alert(
                `${packageData.name} images saved successfully.`
            );

        } catch (error) {

            console.error(
                "Save tour package error:",
                error
            );

            alert(
                error.message ||
                "Something went wrong while saving."
            );

        } finally {

            setSavingIndex(null);
        }
    };


    // =================================================
    // IMAGE PREVIEW TOGGLE
    // =================================================

    const togglePreview = (
        index,
        imageNumber
    ) => {

        const key =
            `${index}-${imageNumber}`;

        if (
            expandedImage === key
        ) {

            setExpandedImage(null);

        } else {

            setExpandedImage(key);
        }
    };


    // =================================================
    // RENDER
    // =================================================

    return (

        <div className="min-h-screen bg-gray-100 p-4 md:p-8">

            {/* =========================================
                PAGE HEADER
            ========================================= */}

            <div className="mb-8">

                <h1 className="
                    text-2xl
                    md:text-3xl
                    font-bold
                    text-gray-800
                ">
                    Tour Packages Management
                </h1>

                <p className="
                    text-gray-500
                    mt-2
                ">
                    Change the images used for each tour package.
                </p>

            </div>


            {/* =========================================
                LOADING
            ========================================= */}

            {loading && (

                <div className="
                    bg-white
                    rounded-xl
                    p-4
                    mb-6
                    shadow-sm
                    text-blue-600
                    font-medium
                ">
                    Loading saved tour package images...
                </div>

            )}


            {/* =========================================
                PACKAGE GRID
            ========================================= */}

            <div className="
                grid
                grid-cols-1
                lg:grid-cols-2
                gap-6
            ">

                {packages.map(
                    (
                        packageData,
                        index
                    ) => (

                        <div
                            key={
                                packageData.name
                            }
                            className="
                                bg-white
                                rounded-2xl
                                shadow-sm
                                border
                                border-gray-200
                                overflow-hidden
                            "
                        >

                            {/* =================================
                                PACKAGE HEADER
                            ================================= */}

                            <div className="
                                p-5
                                border-b
                                border-gray-100
                            ">

                                <div className="
                                    flex
                                    items-start
                                    justify-between
                                    gap-4
                                ">

                                    <div>

                                        <h2 className="
                                            text-lg
                                            md:text-xl
                                            font-bold
                                            text-gray-800
                                        ">
                                            {
                                                packageData.name
                                            }
                                        </h2>

                                        <p className="
                                            text-sm
                                            text-gray-500
                                            mt-1
                                        ">
                                            {
                                                packageData.description
                                            }
                                        </p>

                                    </div>


                                    {/* SAVED STATUS */}

                                    {packageData.saved && (

                                        <span className="
                                            shrink-0
                                            text-xs
                                            font-semibold
                                            px-3
                                            py-1
                                            rounded-full
                                            bg-green-100
                                            text-green-700
                                        ">
                                            Saved
                                        </span>

                                    )}

                                </div>

                            </div>


                            {/* =================================
                                IMAGE CONTROLS
                            ================================= */}

                            <div className="
                                p-5
                                space-y-5
                            ">

                                {/* =================================
                                    IMAGE 1
                                ================================= */}

                                <div>

                                    <div className="
                                        flex
                                        items-center
                                        justify-between
                                        mb-2
                                    ">

                                        <h3 className="
                                            font-semibold
                                            text-gray-700
                                        ">
                                            Image 1
                                        </h3>

                                    </div>


                                    {/* FILE SELECT */}

                                    <label className="
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        w-full
                                        border-2
                                        border-dashed
                                        border-gray-300
                                        rounded-xl
                                        px-4
                                        py-3
                                        cursor-pointer
                                        hover:border-blue-500
                                        hover:bg-blue-50
                                        transition
                                    ">

                                        <FaUpload className="
                                            text-blue-600
                                        " />

                                        <span className="
                                            text-sm
                                            text-gray-600
                                        ">
                                            Choose Image 1
                                        </span>

                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={
                                                (event) =>
                                                    handleImageChange(
                                                        event,
                                                        index,
                                                        1
                                                    )
                                            }
                                        />

                                    </label>


                                    {/* IMAGE PREVIEW BAR */}

                                    <div className="
                                        mt-3
                                        border
                                        border-gray-200
                                        rounded-xl
                                        overflow-hidden
                                    ">

                                        <div className="
                                            flex
                                            items-center
                                            justify-between
                                            px-4
                                            py-3
                                            bg-gray-50
                                        ">

                                            <div className="
                                                flex
                                                items-center
                                                gap-3
                                                min-w-0
                                            ">

                                                <FaImage className="
                                                    text-blue-600
                                                    shrink-0
                                                " />

                                                <span className="
                                                    text-sm
                                                    text-gray-600
                                                    truncate
                                                ">
                                                    Image 1
                                                </span>

                                            </div>


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    togglePreview(
                                                        index,
                                                        1
                                                    )
                                                }
                                                className="
                                                    text-sm
                                                    font-medium
                                                    text-blue-600
                                                    hover:text-blue-800
                                                "
                                            >
                                                {
                                                    expandedImage ===
                                                    `${index}-1`
                                                        ? "Hide"
                                                        : "View"
                                                }
                                            </button>

                                        </div>


                                        {/* EXPANDED PREVIEW */}

                                        {expandedImage ===
                                            `${index}-1` && (

                                            <div className="
                                                p-3
                                                bg-white
                                            ">

                                                <img
                                                    src={
                                                        getImageUrl(
                                                            packageData.image1
                                                        )
                                                    }
                                                    alt={
                                                        `${packageData.name}`
                                                    }
                                                    className="
                                                        w-full
                                                        h-48
                                                        object-cover
                                                        rounded-lg
                                                    "
                                                />

                                            </div>

                                        )}

                                    </div>


                                    {/* CANCEL IMAGE 1 */}

                                    {packageData.image1File && (

                                        <button
                                            type="button"
                                            onClick={() =>
                                                cancelImageChange(
                                                    index,
                                                    1
                                                )
                                            }
                                            className="
                                                flex
                                                items-center
                                                gap-2
                                                mt-2
                                                text-sm
                                                text-red-600
                                                hover:text-red-800
                                            "
                                        >

                                            <FaTimes />

                                            Cancel Image 1 Change

                                        </button>

                                    )}

                                </div>


                                {/* =================================
                                    IMAGE 2
                                ================================= */}

                                <div>

                                    <div className="
                                        flex
                                        items-center
                                        justify-between
                                        mb-2
                                    ">

                                        <h3 className="
                                            font-semibold
                                            text-gray-700
                                        ">
                                            Image 2
                                        </h3>

                                    </div>


                                    {/* FILE SELECT */}

                                    <label className="
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        w-full
                                        border-2
                                        border-dashed
                                        border-gray-300
                                        rounded-xl
                                        px-4
                                        py-3
                                        cursor-pointer
                                        hover:border-blue-500
                                        hover:bg-blue-50
                                        transition
                                    ">

                                        <FaUpload className="
                                            text-blue-600
                                        " />

                                        <span className="
                                            text-sm
                                            text-gray-600
                                        ">
                                            Choose Image 2
                                        </span>

                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={
                                                (event) =>
                                                    handleImageChange(
                                                        event,
                                                        index,
                                                        2
                                                    )
                                            }
                                        />

                                    </label>


                                    {/* IMAGE PREVIEW BAR */}

                                    <div className="
                                        mt-3
                                        border
                                        border-gray-200
                                        rounded-xl
                                        overflow-hidden
                                    ">

                                        <div className="
                                            flex
                                            items-center
                                            justify-between
                                            px-4
                                            py-3
                                            bg-gray-50
                                        ">

                                            <div className="
                                                flex
                                                items-center
                                                gap-3
                                                min-w-0
                                            ">

                                                <FaImage className="
                                                    text-blue-600
                                                    shrink-0
                                                " />

                                                <span className="
                                                    text-sm
                                                    text-gray-600
                                                    truncate
                                                ">
                                                    Image 2
                                                </span>

                                            </div>


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    togglePreview(
                                                        index,
                                                        2
                                                    )
                                                }
                                                className="
                                                    text-sm
                                                    font-medium
                                                    text-blue-600
                                                    hover:text-blue-800
                                                "
                                            >
                                                {
                                                    expandedImage ===
                                                    `${index}-2`
                                                        ? "Hide"
                                                        : "View"
                                                }
                                            </button>

                                        </div>


                                        {/* EXPANDED PREVIEW */}

                                        {expandedImage ===
                                            `${index}-2` && (

                                            <div className="
                                                p-3
                                                bg-white
                                            ">

                                                <img
                                                    src={
                                                        getImageUrl(
                                                            packageData.image2
                                                        )
                                                    }
                                                    alt={
                                                        `${packageData.name}`
                                                    }
                                                    className="
                                                        w-full
                                                        h-48
                                                        object-cover
                                                        rounded-lg
                                                    "
                                                />

                                            </div>

                                        )}

                                    </div>


                                    {/* CANCEL IMAGE 2 */}

                                    {packageData.image2File && (

                                        <button
                                            type="button"
                                            onClick={() =>
                                                cancelImageChange(
                                                    index,
                                                    2
                                                )
                                            }
                                            className="
                                                flex
                                                items-center
                                                gap-2
                                                mt-2
                                                text-sm
                                                text-red-600
                                                hover:text-red-800
                                            "
                                        >

                                            <FaTimes />

                                            Cancel Image 2 Change

                                        </button>

                                    )}

                                </div>


                                {/* =================================
                                    SAVE BUTTON
                                ================================= */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleSave(index)
                                    }
                                    disabled={
                                        savingIndex === index
                                    }
                                    className="
                                        w-full
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        bg-blue-700
                                        hover:bg-blue-800
                                        disabled:bg-gray-400
                                        text-white
                                        font-semibold
                                        py-3
                                        rounded-xl
                                        transition
                                    "
                                >

                                    <FaSave />

                                    {savingIndex === index
                                        ? "Saving..."
                                        : "Save Changes"}

                                </button>

                            </div>

                        </div>

                    )
                )}

            </div>

        </div>
    );
};

export default AdminTourPackageManagement;