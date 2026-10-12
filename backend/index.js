
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const app = express();

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================================================
// CLOUDINARY CONFIGURATION
// =====================================================

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "interguide-air",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        resource_type: "image"
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});

// =====================================================
// MONGODB CONNECTION
// =====================================================

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => console.error("MongoDB connection error:", error));

// =====================================================
// DATABASE MODELS
// =====================================================

const adminSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Admin = mongoose.model("Admin", adminSchema);

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    subject: String,
    message: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Contact = mongoose.model("Contact", contactSchema);

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    rating: String,
    image: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Hotel = mongoose.model("Hotel", hotelSchema);

const flightSchema = new mongoose.Schema({
    airline: {
        type: String,
        required: true
    },
    departure: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Flight = mongoose.model("Flight", flightSchema);

const visaRequestSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    nationality: {
        type: String,
        required: true,
        trim: true
    },
    destination: {
        type: String,
        required: true,
        trim: true
    },
    outboundDate: {
        type: String,
        required: true
    },
    inboundDate: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const VisaRequest = mongoose.model("VisaRequest", visaRequestSchema);

const homeFlightSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    label: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: String,
        required: true,
        trim: true
    },
    buttonText: {
        type: String,
        required: true,
        trim: true
    },
    image: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const HomeFlight = mongoose.model("HomeFlight", homeFlightSchema);

const homeTourSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: String,
        required: true,
        trim: true
    },
    label: {
        type: String,
        required: true,
        trim: true
    },
    buttonText: {
        type: String,
        required: true,
        trim: true
    },
    image: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const HomeTour = mongoose.model("HomeTour", homeTourSchema);

const tourPackageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    image1: {
        type: String,
        required: true
    },
    image2: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const TourPackage = mongoose.model("TourPackage", tourPackageSchema);

// =====================================================
// EMAIL CONFIGURATION
// =====================================================

let transporter = null;

try {
    const emailPort = Number(process.env.EMAIL_PORT || 587);

    transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: emailPort,
        secure: emailPort === 465,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        requireTLS: emailPort !== 465
    });

    transporter.verify((error) => {
        if (error) {
            console.error("SMTP connection error:", error.message);
        } else {
            console.log("SMTP server is ready to send emails");
        }
    });
} catch (error) {
    console.error("Failed to create email transporter:", error.message);
}

const sendEmail = async (options) => {
    if (!transporter) {
        throw new Error("Email service is not configured.");
    }

    return transporter.sendMail(options);
};

// =====================================================
// TEST EMAIL
// =====================================================

app.get("/test-email", async (req, res) => {
    try {
        await sendEmail({
            from: process.env.EMAIL_USER,
            to: process.env.COMPANY_EMAIL,
            subject: "InterGuide Air - Test Email",
            text: "This is a test email from the InterGuide Air backend."
        });

        res.json({
            message: "Test email sent successfully"
        });
    } catch (error) {
        console.error("Test email error:", error);

        res.status(500).json({
            message: "Test email failed",
            error: error.message
        });
    }
});

// =====================================================
// ADMIN AUTHENTICATION MIDDLEWARE
// =====================================================

const authenticateAdmin = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const allowedEmail = process.env.ADMIN_ALLOWED_EMAIL
            ?.toLowerCase()
            .trim();

        if (
            !allowedEmail ||
            decoded.email?.toLowerCase().trim() !== allowedEmail
        ) {
            return res.status(403).json({
                message: "Admin access denied"
            });
        }

        req.admin = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

// =====================================================
// ADMIN SIGNUP
// =====================================================

app.post("/admin/signup", async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "Please fill in all fields"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        const cleanEmail = email.toLowerCase().trim();

        const allowedEmail = process.env.ADMIN_ALLOWED_EMAIL
            ?.toLowerCase()
            .trim();

        if (!allowedEmail || cleanEmail !== allowedEmail) {
            return res.status(403).json({
                message: "This email is not authorized to create an Admin account."
            });
        }

        const existingAdmin = await Admin.findOne({
            email: cleanEmail
        });

        if (existingAdmin) {
            return res.status(400).json({
                message: "An Admin account with this email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new Admin({
            fullName,
            email: cleanEmail,
            password: hashedPassword
        });

        await admin.save();

        res.status(201).json({
            message: "Admin account created successfully"
        });
    } catch (error) {
        console.error("Admin signup error:", error);

        res.status(500).json({
            message: "Error creating Admin account",
            error: error.message
        });
    }
});

// =====================================================
// ADMIN LOGIN
// =====================================================

app.post("/admin/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter your email and password correctly"
            });
        }

        const cleanEmail = email.toLowerCase().trim();

        const allowedEmail = process.env.ADMIN_ALLOWED_EMAIL
            ?.toLowerCase()
            .trim();

        if (!allowedEmail || cleanEmail !== allowedEmail) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const admin = await Admin.findOne({
            email: cleanEmail
        });

        if (!admin) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            admin.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: admin._id,
                email: admin.email,
                fullName: admin.fullName
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login successful",
            token,
            admin: {
                id: admin._id,
                fullName: admin.fullName,
                email: admin.email
            }
        });
    } catch (error) {
        console.error("Admin login error:", error);

        res.status(500).json({
            message: "Error logging in",
            error: error.message
        });
    }
});

// =====================================================
// FORGOT PASSWORD
// =====================================================

app.post("/admin/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Please enter your email address"
            });
        }

        const cleanEmail = email.toLowerCase().trim();

        const allowedEmail = process.env.ADMIN_ALLOWED_EMAIL
            ?.toLowerCase()
            .trim();

        const genericMessage =
            "If an account exists with this email, a password reset link has been sent.";

        if (!allowedEmail || cleanEmail !== allowedEmail) {
            return res.json({ message: genericMessage });
        }

        const admin = await Admin.findOne({
            email: cleanEmail
        });

        if (!admin) {
            return res.json({ message: genericMessage });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");

        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        admin.resetPasswordToken = hashedToken;
        admin.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

        await admin.save();

        const resetLink =
            `https://interguide-air.onrender.com/Admin/reset-password?token=${resetToken}`;

        await sendEmail({
            from: process.env.EMAIL_USER,
            to: admin.email,
            subject: "Reset Your InterGuide Air Admin Password",
            html: `
                <div style="font-family:Arial,sans-serif;line-height:1.6;max-width:600px;margin:auto;color:#333">
                    <h2 style="color:#123b70">InterGuide Air Services</h2>
                    <h3>Password Reset Request</h3>
                    <p>Dear ${admin.fullName},</p>
                    <p>We received a request to reset the password for your InterGuide Air admin account.</p>
                    <p>Click the button below to create a new password.</p>
                    <div style="margin:30px 0">
                        <a href="${resetLink}" style="background:#2563eb;color:white;padding:14px 24px;text-decoration:none;border-radius:8px;display:inline-block;font-weight:bold">
                            Reset Password
                        </a>
                    </div>
                    <p>This link will expire in <strong>15 minutes</strong>.</p>
                    <p>If you did not request a password reset, you can safely ignore this email.</p>
                    <p>Best regards,<br><strong>InterGuide Air Services</strong></p>
                </div>
            `
        });

        res.json({ message: genericMessage });
    } catch (error) {
        console.error("Forgot password error:", error);

        res.status(500).json({
            message: "Error processing password reset request",
            error: error.message
        });
    }
});

// =====================================================
// RESET PASSWORD
// =====================================================

app.post("/admin/reset-password", async (req, res) => {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            return res.status(400).json({
                message: "Reset token and new password are required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const admin = await Admin.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!admin) {
            return res.status(400).json({
                message: "Password reset link is invalid or has expired"
            });
        }

        const allowedEmail = process.env.ADMIN_ALLOWED_EMAIL
            ?.toLowerCase()
            .trim();

        if (
            !allowedEmail ||
            admin.email.toLowerCase().trim() !== allowedEmail
        ) {
            return res.status(403).json({
                message: "Password reset is not authorized"
            });
        }

        admin.password = await bcrypt.hash(password, 10);
        admin.resetPasswordToken = null;
        admin.resetPasswordExpires = null;

        await admin.save();

        res.json({
            message: "Password reset successfully. You can now log in with your new password."
        });
    } catch (error) {
        console.error("Reset password error:", error);

        res.status(500).json({
            message: "Error resetting password",
            error: error.message
        });
    }
});

// =====================================================
// GET CURRENT ADMIN
// =====================================================

app.get("/admin/me", authenticateAdmin, async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id)
            .select("-password -resetPasswordToken -resetPasswordExpires");

        if (!admin) {
            return res.status(404).json({
                message: "Admin not found"
            });
        }

        const allowedEmail = process.env.ADMIN_ALLOWED_EMAIL
            ?.toLowerCase()
            .trim();

        if (
            !allowedEmail ||
            admin.email.toLowerCase().trim() !== allowedEmail
        ) {
            return res.status(403).json({
                message: "Admin access denied"
            });
        }

        res.json(admin);
    } catch (error) {
        res.status(500).json({
            message: "Error getting admin information",
            error: error.message
        });
    }
});

// =====================================================
// CONTACT FORM
// =====================================================

app.post("/contact", async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            Email,
            Telephone,
            message
        } = req.body;

        const fullName =
            `${firstName || ""} ${lastName || ""}`.trim();

        const cleanEmail = Email
            ? Email.trim().toLowerCase()
            : "";

        const cleanPhone = Telephone
            ? Telephone.trim()
            : "";

        if (!fullName || !cleanEmail || !message) {
            return res.status(400).json({
                message: "Name, email and message are required"
            });
        }

        const newContact = new Contact({
            name: fullName,
            email: cleanEmail,
            phone: cleanPhone,
            subject: "Contact Form Message",
            message
        });

        await newContact.save();

        await sendEmail({
            from: process.env.EMAIL_USER,
            to: process.env.COMPANY_EMAIL,
            subject: `New Contact Message from ${fullName}`,
            html: `
                <h2>New Contact Message</h2>
                <p><strong>Name:</strong> ${fullName}</p>
                <p><strong>Email:</strong> ${cleanEmail}</p>
                <p><strong>Telephone:</strong> ${cleanPhone || "Not provided"}</p>
                <p><strong>Message:</strong> ${message}</p>
            `
        });

        const logoPath = path.join(
            __dirname,
            "assets",
            "InterGuide.png"
        );

        await sendEmail({
            from: process.env.EMAIL_USER,
            to: cleanEmail,
            subject: "We Received Your Message - InterGuide Air Services",
            html: `
                <div style="font-family:Arial,sans-serif;line-height:1.6">
                    <img src="cid:interguide-contact-logo" alt="InterGuide Air Services" style="width:180px"/>
                    <h2>Thank You for Contacting InterGuide Air Services</h2>
                    <p>Dear ${firstName || "Customer"},</p>
                    <p>We have received your message and our team will get back to you as soon as possible.</p>
                    <p>Thank you for choosing <strong>InterGuide Air Services</strong>.</p>
                    <p>Best regards,<br><strong>InterGuide Air Services</strong></p>
                </div>
            `,
            attachments: [{
                filename: "InterGuide.png",
                path: logoPath,
                cid: "interguide-contact-logo"
            }]
        });

        res.status(201).json({
            message: "Message sent successfully"
        });
    } catch (error) {
        console.error("Contact error:", error);

        res.status(500).json({
            message: "Error sending message",
            error: error.message
        });
    }
});

// =====================================================
// VISA REQUEST
// =====================================================

app.post("/visa-requests", async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            nationality,
            phone,
            destination,
            outboundDate,
            inboundDate
        } = req.body;

        const cleanEmail = email
            ? email.trim().toLowerCase()
            : "";

        const cleanPhone = phone
            ? phone.trim()
            : "";

        const visaRequest = new VisaRequest({
            firstName,
            lastName,
            email: cleanEmail,
            nationality,
            phone: cleanPhone,
            destination,
            outboundDate,
            inboundDate
        });

        await visaRequest.save();

        await sendEmail({
            from: process.env.EMAIL_USER,
            to: process.env.COMPANY_EMAIL,
            subject: "New Visa Assistance Request",
            html: `
                <h2>New Visa Assistance Request</h2>
                <p><strong>First Name:</strong> ${firstName}</p>
                <p><strong>Last Name:</strong> ${lastName}</p>
                <p><strong>Email:</strong> ${cleanEmail}</p>
                <p><strong>Phone:</strong> ${cleanPhone}</p>
                <p><strong>Nationality:</strong> ${nationality}</p>
                <p><strong>Destination:</strong> ${destination}</p>
                <p><strong>Outbound Date:</strong> ${outboundDate}</p>
                <p><strong>Inbound Date:</strong> ${inboundDate}</p>
            `
        });

        const logoPath = path.join(
            __dirname,
            "assets",
            "InterGuide.png"
        );

        await sendEmail({
            from: process.env.EMAIL_USER,
            to: cleanEmail,
            subject: "Visa Assistance Request Received - InterGuide Air Services",
            html: `
                <div style="font-family:Arial,sans-serif;line-height:1.6">
                    <img src="cid:interguide-visa-logo" alt="InterGuide Air Services" style="width:180px"/>
                    <h2>Visa Assistance Request Received</h2>
                    <p>Dear ${firstName || "Customer"},</p>
                    <p>Thank you for submitting your visa assistance request to InterGuide Air Services.</p>
                    <p>Our team has received your request and will review your travel details.</p>
                    <p><strong>Destination:</strong> ${destination}</p>
                    <p><strong>Outbound Date:</strong> ${outboundDate}</p>
                    <p><strong>Inbound Date:</strong> ${inboundDate}</p>
                    <p>We will contact you with the next steps.</p>
                    <p>Best regards,<br><strong>InterGuide Air Services</strong></p>
                </div>
            `,
            attachments: [{
                filename: "InterGuide.png",
                path: logoPath,
                cid: "interguide-visa-logo"
            }]
        });

        res.status(201).json({
            message: "Visa request submitted successfully"
        });
    } catch (error) {
        console.error("Visa request error:", error);

        res.status(500).json({
            message: "Error submitting visa request",
            error: error.message
        });
    }
});

// =====================================================
// HOTEL CRUD
// =====================================================

// GET HOTELS

app.get("/hotels", async (req, res) => {
    try {
        const hotels = await Hotel.find().sort({ createdAt: -1 });
        res.json(hotels);
    } catch (error) {
        res.status(500).json({
            message: "Error getting hotels",
            error: error.message
        });
    }
});

// CREATE HOTEL - SAVE CLOUDINARY URL

app.post(
    "/hotels",
    authenticateAdmin,
    upload.single("image"),
    async (req, res) => {
        try {
            const { name, location, price, description } = req.body;

            if (!name || !location || !price) {
                return res.status(400).json({
                    message: "Name, location and price are required"
                });
            }

            const hotel = new Hotel({
                name,
                location,
                price,
                description,
                image: req.file ? req.file.path : ""
            });

            await hotel.save();
            res.status(201).json(hotel);
        } catch (error) {
            console.error("Create hotel error:", error);

            res.status(500).json({
                message: "Error creating hotel",
                error: error.message
            });
        }
    }
);

// UPDATE HOTEL

app.put(
    "/hotels/:id",
    authenticateAdmin,
    upload.single("image"),
    async (req, res) => {
        try {
            const updateData = { ...req.body };

            if (req.file) {
                updateData.image = req.file.path;
            }

            const updatedHotel = await Hotel.findByIdAndUpdate(
                req.params.id,
                updateData,
                { new: true, runValidators: true }
            );

            if (!updatedHotel) {
                return res.status(404).json({
                    message: "Hotel not found"
                });
            }

            res.json(updatedHotel);
        } catch (error) {
            console.error("Update hotel error:", error);

            res.status(500).json({
                message: "Error updating hotel",
                error: error.message
            });
        }
    }
);

// DELETE HOTEL

app.delete("/hotels/:id", authenticateAdmin, async (req, res) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);

        if (!deletedHotel) {
            return res.status(404).json({
                message: "Hotel not found"
            });
        }

        res.json({
            message: "Hotel deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting hotel",
            error: error.message
        });
    }
});

// =====================================================
// FLIGHT CRUD
// =====================================================

// GET FLIGHTS

app.get("/flights", async (req, res) => {
    try {
        const flights = await Flight.find().sort({ createdAt: -1 });
        res.json(flights);
    } catch (error) {
        res.status(500).json({
            message: "Error getting flights",
            error: error.message
        });
    }
});

// CREATE FLIGHT - SAVE CLOUDINARY URL

app.post(
    "/flights",
    authenticateAdmin,
    upload.single("image"),
    async (req, res) => {
        try {
            const {
                airline,
                departure,
                destination,
                startDate,
                endDate,
                price
            } = req.body;

            if (
                !airline ||
                !departure ||
                !destination ||
                !startDate ||
                !endDate ||
                !price
            ) {
                return res.status(400).json({
                    message: "All flight fields are required"
                });
            }

            const flight = new Flight({
                airline,
                departure,
                destination,
                startDate,
                endDate,
                price,
                image: req.file ? req.file.path : ""
            });

            await flight.save();
            res.status(201).json(flight);
        } catch (error) {
            console.error("Create flight error:", error);

            res.status(500).json({
                message: "Error creating flight",
                error: error.message
            });
        }
    }
);

// UPDATE FLIGHT

app.put(
    "/flights/:id",
    authenticateAdmin,
    upload.single("image"),
    async (req, res) => {
        try {
            const updateData = { ...req.body };

            if (req.file) {
                updateData.image = req.file.path;
            }

            const updatedFlight = await Flight.findByIdAndUpdate(
                req.params.id,
                updateData,
                { new: true, runValidators: true }
            );

            if (!updatedFlight) {
                return res.status(404).json({
                    message: "Flight not found"
                });
            }

            res.json(updatedFlight);
        } catch (error) {
            console.error("Update flight error:", error);

            res.status(500).json({
                message: "Error updating flight",
                error: error.message
            });
        }
    }
);

// DELETE FLIGHT

app.delete("/flights/:id", authenticateAdmin, async (req, res) => {
    try {
        const deletedFlight = await Flight.findByIdAndDelete(req.params.id);

        if (!deletedFlight) {
            return res.status(404).json({
                message: "Flight not found"
            });
        }

        res.json({
            message: "Flight deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting flight",
            error: error.message
        });
    }
});

// =====================================================
// HOME FLIGHT CRUD
// =====================================================

// GET HOME FLIGHTS

app.get("/home-flights", async (req, res) => {
    try {
        const flights = await HomeFlight.find().sort({ createdAt: -1 });
        res.json(flights);
    } catch (error) {
        console.error("Get home flights error:", error);

        res.status(500).json({
            message: "Error getting home flights",
            error: error.message
        });
    }
});

// CREATE HOME FLIGHT - SAVE CLOUDINARY URL

app.post(
    "/home-flights",
    authenticateAdmin,
    upload.single("image"),
    async (req, res) => {
        try {
            const {
                title,
                description,
                label,
                price,
                buttonText
            } = req.body;

            if (!title || !description || !label || !price || !buttonText) {
                return res.status(400).json({
                    message: "Title, description, label, price and button text are required"
                });
            }

            const homeFlight = new HomeFlight({
                title,
                description,
                label,
                price,
                buttonText,
                image: req.file ? req.file.path : ""
            });

            await homeFlight.save();
            res.status(201).json(homeFlight);
        } catch (error) {
            console.error("Create home flight error:", error);

            res.status(500).json({
                message: "Error creating home flight",
                error: error.message
            });
        }
    }
);

// UPDATE HOME FLIGHT

app.put(
    "/home-flights/:id",
    authenticateAdmin,
    upload.single("image"),
    async (req, res) => {
        try {
            const updateData = {
                title: req.body.title,
                description: req.body.description,
                label: req.body.label,
                price: req.body.price,
                buttonText: req.body.buttonText
            };

            if (req.file) {
                updateData.image = req.file.path;
            }

            const updatedFlight = await HomeFlight.findByIdAndUpdate(
                req.params.id,
                updateData,
                { new: true, runValidators: true }
            );

            if (!updatedFlight) {
                return res.status(404).json({
                    message: "Home flight not found"
                });
            }

            res.json(updatedFlight);
        } catch (error) {
            console.error("Update home flight error:", error);

            res.status(500).json({
                message: "Error updating home flight",
                error: error.message
            });
        }
    }
);

// DELETE HOME FLIGHT

app.delete("/home-flights/:id", authenticateAdmin, async (req, res) => {
    try {
        const deletedFlight = await HomeFlight.findByIdAndDelete(req.params.id);

        if (!deletedFlight) {
            return res.status(404).json({
                message: "Home flight not found"
            });
        }

        res.json({
            message: "Home flight deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting home flight",
            error: error.message
        });
    }
});

// =====================================================
// HOME TOUR CRUD
// =====================================================

// GET HOME TOURS

app.get("/home-tours", async (req, res) => {
    try {
        const tours = await HomeTour.find().sort({ createdAt: -1 });
        res.json(tours);
    } catch (error) {
        console.error("Get home tours error:", error);

        res.status(500).json({
            message: "Error getting home tours",
            error: error.message
        });
    }
});

// CREATE HOME TOUR - SAVE CLOUDINARY URL

app.post(
    "/home-tours",
    authenticateAdmin,
    upload.single("image"),
    async (req, res) => {
        try {
            const {
                title,
                description,
                price,
                label,
                buttonText
            } = req.body;

            if (!title || !description || !price || !label || !buttonText) {
                return res.status(400).json({
                    message: "Title, description, price, label and button text are required"
                });
            }

            const homeTour = new HomeTour({
                title,
                description,
                price,
                label,
                buttonText,
                image: req.file ? req.file.path : ""
            });

            await homeTour.save();
            res.status(201).json(homeTour);
        } catch (error) {
            console.error("Create home tour error:", error);

            res.status(500).json({
                message: "Error creating home tour",
                error: error.message
            });
        }
    }
);

// UPDATE HOME TOUR

app.put(
    "/home-tours/:id",
    authenticateAdmin,
    upload.single("image"),
    async (req, res) => {
        try {
            const updateData = {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                label: req.body.label,
                buttonText: req.body.buttonText
            };

            if (req.file) {
                updateData.image = req.file.path;
            }

            const updatedTour = await HomeTour.findByIdAndUpdate(
                req.params.id,
                updateData,
                { new: true, runValidators: true }
            );

            if (!updatedTour) {
                return res.status(404).json({
                    message: "Home tour not found"
                });
            }

            res.json(updatedTour);
        } catch (error) {
            console.error("Update home tour error:", error);

            res.status(500).json({
                message: "Error updating home tour",
                error: error.message
            });
        }
    }
);

// DELETE HOME TOUR

app.delete("/home-tours/:id", authenticateAdmin, async (req, res) => {
    try {
        const deletedTour = await HomeTour.findByIdAndDelete(req.params.id);

        if (!deletedTour) {
            return res.status(404).json({
                message: "Home tour not found"
            });
        }

        res.json({
            message: "Home tour deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting home tour",
            error: error.message
        });
    }
});

// =====================================================
// TOUR PACKAGE CRUD
// =====================================================

// GET ALL TOUR PACKAGES

app.get("/tour-packages", async (req, res) => {
    try {
        const tourPackages = await TourPackage.find().sort({ createdAt: 1 });
        res.json(tourPackages);
    } catch (error) {
        console.error("Get tour packages error:", error);

        res.status(500).json({
            message: "Error getting tour packages",
            error: error.message
        });
    }
});

// CREATE TOUR PACKAGE - SAVE CLOUDINARY URLS

app.post(
    "/tour-packages",
    authenticateAdmin,
    upload.fields([
        { name: "image1", maxCount: 1 },
        { name: "image2", maxCount: 1 }
    ]),
    async (req, res) => {
        try {
            const { name } = req.body;

            if (!name || !name.trim()) {
                return res.status(400).json({
                    message: "Tour package name is required"
                });
            }

            if (
                !req.files ||
                !req.files.image1?.length ||
                !req.files.image2?.length
            ) {
                return res.status(400).json({
                    message: "Both images are required"
                });
            }

            const cleanName = name.trim();

            const existingPackage = await TourPackage.findOne({
                name: cleanName
            });

            if (existingPackage) {
                return res.status(400).json({
                    message: "This tour package already exists"
                });
            }

            const tourPackage = new TourPackage({
                name: cleanName,
                image1: req.files.image1[0].path,
                image2: req.files.image2[0].path
            });

            await tourPackage.save();

            res.status(201).json(tourPackage);
        } catch (error) {
            console.error("Create tour package error:", error);

            if (error.code === 11000) {
                return res.status(400).json({
                    message: "This tour package already exists"
                });
            }

            res.status(500).json({
                message: "Error creating tour package",
                error: error.message
            });
        }
    }
);

// UPDATE TOUR PACKAGE - SAVE CLOUDINARY URLS

app.put(
    "/tour-packages/:id",
    authenticateAdmin,
    upload.fields([
        { name: "image1", maxCount: 1 },
        { name: "image2", maxCount: 1 }
    ]),
    async (req, res) => {
        try {
            const updateData = {};

            if (req.body.name?.trim()) {
                updateData.name = req.body.name.trim();
            }

            if (req.files?.image1?.length) {
                updateData.image1 = req.files.image1[0].path;
            }

            if (req.files?.image2?.length) {
                updateData.image2 = req.files.image2[0].path;
            }

            const updatedTourPackage = await TourPackage.findByIdAndUpdate(
                req.params.id,
                updateData,
                { new: true, runValidators: true }
            );

            if (!updatedTourPackage) {
                return res.status(404).json({
                    message: "Tour package not found"
                });
            }

            res.json(updatedTourPackage);
        } catch (error) {
            console.error("Update tour package error:", error);

            if (error.code === 11000) {
                return res.status(400).json({
                    message: "A tour package with this name already exists"
                });
            }

            res.status(500).json({
                message: "Error updating tour package",
                error: error.message
            });
        }
    }
);

// DELETE TOUR PACKAGE

app.delete("/tour-packages/:id", authenticateAdmin, async (req, res) => {
    try {
        const deletedPackage = await TourPackage.findByIdAndDelete(
            req.params.id
        );

        if (!deletedPackage) {
            return res.status(404).json({
                message: "Tour package not found"
            });
        }

        res.json({
            message: "Tour package deleted successfully"
        });
    } catch (error) {
        console.error("Delete tour package error:", error);

        res.status(500).json({
            message: "Error deleting tour package",
            error: error.message
        });
    }
});

// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/", (req, res) => {
    res.json({
        message: "InterGuide Air backend is running"
    });
});

// =====================================================
// SERVER
// =====================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});