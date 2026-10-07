require("dotenv").config();

console.log("Email user:", process.env.EMAIL_USER);
console.log("Email password loaded:", !!process.env.EMAIL_PASSWORD);
console.log("Email password length:", process.env.EMAIL_PASSWORD?.length);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
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

app.use(
    express.urlencoded({
        extended: true
    })
);

// =====================================================
// FILE UPLOAD SETUP
// =====================================================

const uploadFolder =
    path.join(__dirname, "uploads");

const storage =
    multer.diskStorage({

        destination: (req, file, cb) => {
            cb(
                null,
                uploadFolder
            );
        },

        filename: (req, file, cb) => {

            const uniqueName =
                Date.now() +
                "-" +
                file.originalname;

            cb(
                null,
                uniqueName
            );
        }
    });

const upload =
    multer({
        storage
    });

app.use(
    "/uploads",
    express.static(uploadFolder)
);

// =====================================================
// MONGODB CONNECTION
// =====================================================

mongoose
    .connect(
        process.env.MONGODB_URI
    )
    .then(() => {

        console.log(
            "MongoDB connected successfully"
        );

    })
    .catch((error) => {

        console.error(
            "MongoDB connection error:",
            error
        );

    });

// =====================================================
// ADMIN MODEL
// =====================================================

const adminSchema =
    new mongoose.Schema({

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

        role: {
            type: String,
            enum: [
                "superadmin",
                "admin"
            ],
            default: "admin"
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

const Admin =
    mongoose.model(
        "Admin",
        adminSchema
    );

// =====================================================
// CONTACT MODEL
// =====================================================

const contactSchema =
    new mongoose.Schema({

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

const Contact =
    mongoose.model(
        "Contact",
        contactSchema
    );

// =====================================================
// HOTEL MODEL
// =====================================================

const hotelSchema =
    new mongoose.Schema({

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

        rating: {
            type: String
        },

        image: String,

        description: String,

        createdAt: {
            type: Date,
            default: Date.now
        }
    });

const Hotel =
    mongoose.model(
        "Hotel",
        hotelSchema
    );

// =====================================================
// FLIGHT MODEL
// =====================================================

const flightSchema =
    new mongoose.Schema({

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

const Flight =
    mongoose.model(
        "Flight",
        flightSchema
    );

// =====================================================
// VISA REQUEST MODEL
// =====================================================

const visaRequestSchema =
    new mongoose.Schema({

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

const VisaRequest =
    mongoose.model(
        "VisaRequest",
        visaRequestSchema
    );

// =====================================================
// HOME FLIGHT MODEL
// =====================================================

const homeFlightSchema =
    new mongoose.Schema({

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

const HomeFlight =
    mongoose.model(
        "HomeFlight",
        homeFlightSchema
    );

// =====================================================
// HOME TOUR MODEL
// =====================================================

const homeTourSchema =
    new mongoose.Schema({

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

const HomeTour =
    mongoose.model(
        "HomeTour",
        homeTourSchema
    );

// =====================================================
// TOUR PACKAGE MODEL
// =====================================================

const tourPackageSchema =
    new mongoose.Schema({

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

const TourPackage =
    mongoose.model(
        "TourPackage",
        tourPackageSchema
    );

// =====================================================
// NODEMAILER
// =====================================================
let transporter = null;

try {
    transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT),
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        requireTLS: true
    });

    transporter.verify((error) => {
        if (error) {
            console.error("❌ SMTP connection error:", error);
        } else {
            console.log("✅ SMTP server is ready to send emails");
        }
    });
} catch (error) {
    console.error("❌ Failed to create transporter:", error);
}

// =====================================================
// TEST EMAIL
// =====================================================

app.get("/test-email", async (req, res) => {
    try {

        await transporter.sendMail({

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
// JWT AUTHENTICATION
// =====================================================

const authenticateAdmin =
    (req, res, next) => {

        try {

            const authHeader =
                req.headers.authorization;

            if (
                !authHeader ||
                !authHeader.startsWith(
                    "Bearer "
                )
            ) {

                return res.status(401).json({
                    message:
                        "Authentication required"
                });
            }

            const token =
                authHeader.split(" ")[1];

            const decoded =
                jwt.verify(
                    token,
                    process.env.JWT_SECRET
                );

            req.admin =
                decoded;

            next();

        } catch (error) {

            return res.status(401).json({
                message:
                    "Invalid or expired token"
            });
        }
    };

// =====================================================
// SUPER ADMIN AUTHORIZATION
// =====================================================

const requireSuperAdmin =
    (req, res, next) => {

        if (!req.admin) {

            return res.status(401).json({
                message:
                    "Authentication required"
            });
        }

        if (
            req.admin.role !==
            "superadmin"
        ) {

            return res.status(403).json({
                message:
                    "Super Admin permission required"
            });
        }

        next();
    };

// =====================================================
// ADMIN SIGNUP
// =====================================================

app.post(
    "/admin/signup",
    async (req, res) => {

        try {

            const {
                fullName,
                email,
                password
            } = req.body;

            if (
                !fullName ||
                !email ||
                !password
            ) {

                return res.status(400).json({
                    message:
                        "Please fill in all fields"
                });
            }

            if (
                password.length < 6
            ) {

                return res.status(400).json({
                    message:
                        "Password must be at least 6 characters"
                });
            }

            const cleanEmail =
                email
                    .toLowerCase()
                    .trim();

            const existingAdmin =
                await Admin.findOne({
                    email:
                        cleanEmail
                });

            if (existingAdmin) {

                return res.status(400).json({
                    message:
                        "An admin with this email already exists"
                });
            }

            const adminCount =
                await Admin.countDocuments();

            if (adminCount > 0) {

                return res.status(403).json({
                    message:
                        "Public admin signup is disabled. Only the Super Admin can create new admin accounts."
                });
            }

            const hashedPassword =
                await bcrypt.hash(
                    password,
                    10
                );

            const admin =
                new Admin({

                    fullName,

                    email:
                        cleanEmail,

                    password:
                        hashedPassword,

                    role:
                        "superadmin"
                });

            await admin.save();

            res.status(201).json({
                message:
                    "Super Admin account created successfully"
            });

        } catch (error) {

            console.error(
                "Admin signup error:",
                error
            );

            res.status(500).json({
                message:
                    "Error creating admin account",

                error:
                    error.message
            });
        }
    }
);

// =====================================================
// ONE-TIME SUPER ADMIN SETUP
// =====================================================

app.post(
    "/admin/setup-superadmin",
    async (req, res) => {

        try {

            const {
                email,
                setupKey
            } = req.body;

            if (
                !email ||
                !setupKey
            ) {

                return res.status(400).json({
                    message:
                        "Email and setup key are required"
                });
            }

            if (
                setupKey !==
                process.env.SUPER_ADMIN_SETUP_KEY
            ) {

                return res.status(403).json({
                    message:
                        "Invalid setup key"
                });
            }

            const existingSuperAdmin =
                await Admin.findOne({
                    role:
                        "superadmin"
                });

            if (existingSuperAdmin) {

                return res.status(403).json({
                    message:
                        "A Super Admin already exists"
                });
            }

            const admin =
                await Admin.findOne({

                    email:
                        email
                            .toLowerCase()
                            .trim()
                });

            if (!admin) {

                return res.status(404).json({
                    message:
                        "Admin account with this email was not found"
                });
            }

            admin.role =
                "superadmin";

            await admin.save();

            res.json({
                message:
                    "Admin account has been promoted to Super Admin successfully"
            });

        } catch (error) {

            console.error(
                "Super Admin setup error:",
                error
            );

            res.status(500).json({
                message:
                    "Error setting up Super Admin",

                error:
                    error.message
            });
        }
    }
);

// =====================================================
// ADMIN LOGIN
// =====================================================

app.post(
    "/admin/login",
    async (req, res) => {

        try {

            const {
                email,
                password
            } = req.body;

            if (
                !email ||
                !password
            ) {

                return res.status(400).json({
                    message:
                        "Please enter your email and password correctly"
                });
            }

            const admin =
                await Admin.findOne({

                    email:
                        email
                            .toLowerCase()
                            .trim()
                });

            if (!admin) {

                return res.status(401).json({
                    message:
                        "Invalid email or password"
                });
            }

            const passwordMatch =
                await bcrypt.compare(
                    password,
                    admin.password
                );

            if (!passwordMatch) {

                return res.status(401).json({
                    message:
                        "Invalid email or password"
                });
            }

            const adminRole =
                admin.role ||
                "admin";

            const token =
                jwt.sign(

                    {
                        id:
                            admin._id,

                        email:
                            admin.email,

                        fullName:
                            admin.fullName,

                        role:
                            adminRole
                    },

                    process.env.JWT_SECRET,

                    {
                        expiresIn:
                            "1d"
                    }
                );

            res.json({

                message:
                    "Login successful",

                token,

                admin: {

                    id:
                        admin._id,

                    fullName:
                        admin.fullName,

                    email:
                        admin.email,

                    role:
                        adminRole
                }
            });

        } catch (error) {

            console.error(
                "Admin login error:",
                error
            );

            res.status(500).json({
                message:
                    "Error logging in",

                error:
                    error.message
            });
        }
    }
);

// =====================================================
// FORGOT PASSWORD
// =====================================================

app.post(
    "/admin/forgot-password",
    async (req, res) => {

        try {

            const {
                email
            } = req.body;

            if (!email) {

                return res.status(400).json({
                    message:
                        "Please enter your email address"
                });
            }

            const cleanEmail =
                email
                    .toLowerCase()
                    .trim();

            const admin =
                await Admin.findOne({
                    email:
                        cleanEmail
                });

            // Do not reveal whether email exists
            if (!admin) {

                return res.json({
                    message:
                        "If an account exists with this email, a password reset link has been sent."
                });
            }

            // Generate secure reset token
            const resetToken =
                crypto
                    .randomBytes(32)
                    .toString("hex");

            // Hash token before saving
            const hashedToken =
                crypto
                    .createHash("sha256")
                    .update(resetToken)
                    .digest("hex");

            admin.resetPasswordToken =
                hashedToken;

            // Token expires after 15 minutes
            admin.resetPasswordExpires =
                Date.now() +
                15 * 60 * 1000;

            await admin.save();

            // Frontend reset page
            const resetLink =
                `http://localhost:3000/Admin/reset-password?token=${resetToken}`;

            // Send reset email
            await transporter.sendMail({

                from:
                    process.env.EMAIL_USER,

                to:
                    admin.email,

                subject:
                    "Reset Your InterGuide Air Admin Password",

                html: `

                    <div style="
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        max-width: 600px;
                        margin: auto;
                        color: #333;
                    ">

                        <h2 style="
                            color: #123b70;
                        ">
                            InterGuide Air Services
                        </h2>

                        <h3>
                            Password Reset Request
                        </h3>

                        <p>
                            Dear ${admin.fullName},
                        </p>

                        <p>
                            We received a request to reset
                            the password for your
                            InterGuide Air admin account.
                        </p>

                        <p>
                            Click the button below to create
                            a new password.
                        </p>

                        <div style="
                            margin: 30px 0;
                        ">

                            <a
                                href="${resetLink}"
                                style="
                                    background-color: #2563eb;
                                    color: white;
                                    padding: 14px 24px;
                                    text-decoration: none;
                                    border-radius: 8px;
                                    display: inline-block;
                                    font-weight: bold;
                                "
                            >
                                Reset Password
                            </a>

                        </div>

                        <p>
                            This link will expire in
                            <strong>
                                15 minutes
                            </strong>.
                        </p>

                        <p>
                            If you did not request a password
                            reset, you can safely ignore this email.
                        </p>

                        <p>
                            Best regards,<br />

                            <strong>
                                InterGuide Air Services
                            </strong>
                        </p>

                    </div>

                `
            });

            res.json({
                message:
                    "If an account exists with this email, a password reset link has been sent."
            });

        } catch (error) {

            console.error(
                "Forgot password error:",
                error
            );

            res.status(500).json({

                message:
                    "Error processing password reset request",

                error:
                    error.message
            });
        }
    }
);

// =====================================================
// RESET PASSWORD
// =====================================================

app.post(
    "/admin/reset-password",
    async (req, res) => {

        try {

            const {
                token,
                password
            } = req.body;

            if (
                !token ||
                !password
            ) {

                return res.status(400).json({
                    message:
                        "Reset token and new password are required"
                });
            }

            if (
                password.length < 6
            ) {

                return res.status(400).json({
                    message:
                        "Password must be at least 6 characters"
                });
            }

            // Hash token received from frontend
            const hashedToken =
                crypto
                    .createHash("sha256")
                    .update(token)
                    .digest("hex");

            const admin =
                await Admin.findOne({

                    resetPasswordToken:
                        hashedToken,

                    resetPasswordExpires: {
                        $gt:
                            Date.now()
                    }
                });

            if (!admin) {

                return res.status(400).json({
                    message:
                        "Password reset link is invalid or has expired"
                });
            }

            // Hash new password
            const hashedPassword =
                await bcrypt.hash(
                    password,
                    10
                );

            admin.password =
                hashedPassword;

            // Clear reset token
            admin.resetPasswordToken =
                null;

            admin.resetPasswordExpires =
                null;

            await admin.save();

            res.json({
                message:
                    "Password reset successfully. You can now log in with your new password."
            });

        } catch (error) {

            console.error(
                "Reset password error:",
                error
            );

            res.status(500).json({

                message:
                    "Error resetting password",

                error:
                    error.message
            });
        }
    }
);

// =====================================================
// GET CURRENT ADMIN
// =====================================================

app.get(
    "/admin/me",
    authenticateAdmin,
    async (req, res) => {

        try {

            const admin =
                await Admin.findById(
                    req.admin.id
                ).select("-password");

            if (!admin) {

                return res.status(404).json({
                    message:
                        "Admin not found"
                });
            }

            res.json(admin);

        } catch (error) {

            res.status(500).json({

                message:
                    "Error getting admin information",

                error:
                    error.message
            });
        }
    }
);

// =====================================================
// SUPER ADMIN - CREATE ADMIN
// =====================================================

app.post(
    "/admin/create",
    authenticateAdmin,
    requireSuperAdmin,
    async (req, res) => {

        try {

            const {
                fullName,
                email,
                password
            } = req.body;

            if (
                !fullName ||
                !email ||
                !password
            ) {

                return res.status(400).json({
                    message:
                        "Please fill in all fields"
                });
            }

            if (
                password.length < 6
            ) {

                return res.status(400).json({
                    message:
                        "Password must be at least 6 characters"
                });
            }

            const cleanEmail =
                email
                    .toLowerCase()
                    .trim();

            const existingAdmin =
                await Admin.findOne({
                    email:
                        cleanEmail
                });

            if (existingAdmin) {

                return res.status(400).json({
                    message:
                        "An admin with this email already exists"
                });
            }

            const hashedPassword =
                await bcrypt.hash(
                    password,
                    10
                );

            const newAdmin =
                new Admin({

                    fullName,

                    email:
                        cleanEmail,

                    password:
                        hashedPassword,

                    role:
                        "admin"
                });

            await newAdmin.save();

            res.status(201).json({

                message:
                    "Admin account created successfully",

                admin: {

                    id:
                        newAdmin._id,

                    fullName:
                        newAdmin.fullName,

                    email:
                        newAdmin.email,

                    role:
                        newAdmin.role
                }
            });

        } catch (error) {

            console.error(
                "Create admin error:",
                error
            );

            res.status(500).json({

                message:
                    "Error creating admin account",

                error:
                    error.message
            });
        }
    }
);

// =====================================================
// SUPER ADMIN - GET ALL ADMINS
// =====================================================

app.get(
    "/admin/all",
    authenticateAdmin,
    requireSuperAdmin,
    async (req, res) => {

        try {

            const admins =
                await Admin.find()
                    .select("-password")
                    .sort({
                        createdAt:
                            -1
                    });

            res.json(admins);

        } catch (error) {

            res.status(500).json({

                message:
                    "Error getting admins",

                error:
                    error.message
            });
        }
    }
);

// =====================================================
// SUPER ADMIN - DELETE ADMIN
// =====================================================

app.delete(
    "/admin/:id",
    authenticateAdmin,
    requireSuperAdmin,
    async (req, res) => {

        try {

            const admin =
                await Admin.findById(
                    req.params.id
                );

            if (!admin) {

                return res.status(404).json({
                    message:
                        "Admin not found"
                });
            }

            if (
                admin.role ===
                "superadmin"
            ) {

                return res.status(403).json({
                    message:
                        "The Super Admin cannot be deleted"
                });
            }

            await Admin.findByIdAndDelete(
                req.params.id
            );

            res.json({
                message:
                    "Admin deleted successfully"
            });

        } catch (error) {

            res.status(500).json({

                message:
                    "Error deleting admin",

                error:
                    error.message
            });
        }
    }
);

// =====================================================
// CONTACT FORM
// =====================================================

app.post("/contact", async (req, res) => {
    try {
        console.log("📩 Contact form received");

        const {
            firstName,
            lastName,
            Email,
            Telephone,
            message
        } = req.body;

        const fullName =
            `${firstName || ""} ${lastName || ""}`.trim();

        const cleanEmail =
            Email
                ? Email.trim().toLowerCase()
                : "";

        const cleanPhone =
            Telephone
                ? Telephone.trim()
                : "";

        const newContact = new Contact({
            name: fullName,
            email: cleanEmail,
            phone: cleanPhone,
            subject: "Contact Form Message",
            message: message
        });

        await newContact.save();

        console.log("✅ Contact saved to MongoDB");

        // =====================================================
        // EMAIL COMPANY
        // =====================================================

        console.log("📧 Sending company email to:", process.env.COMPANY_EMAIL);

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to:  process.env.COMPANY_EMAIL,
            subject: `New Contact Message from ${fullName}`,
            html: `
                <h2>New Contact Message</h2>

                <p>
                    <strong>First Name:</strong>
                    ${firstName || "Not provided"}
                </p>

                <p>
                    <strong>Last Name:</strong>
                    ${lastName || "Not provided"}
                </p>

                <p>
                    <strong>Email:</strong>
                    ${cleanEmail || "Not provided"}
                </p>

                <p>
                    <strong>Telephone:</strong>
                    ${cleanPhone || "Not provided"}
                </p>

                <p>
                    <strong>Message:</strong>
                    ${message || "No message"}
                </p>
            `
        });

        console.log("✅ Company email sent");

        // =====================================================
        // EMAIL CUSTOMER
        // =====================================================

        console.log("📧 Sending customer confirmation to:", cleanEmail);

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: cleanEmail,
            subject: "We Received Your Message - InterGuide Air Services",

            html: `
                <div style="
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                ">

                    <img
                        src="cid:interguide-contact-logo"
                        alt="InterGuide Air Services"
                        style="width: 180px;"
                    />

                    <h2>
                        Thank You for Contacting
                        InterGuide Air Services
                    </h2>

                    <p>
                        Dear ${firstName || "Customer"},
                    </p>

                    <p>
                        We have received your message
                        and our team will get back to
                        you as soon as possible.
                    </p>

                    <p>
                        Thank you for choosing
                        <strong>InterGuide Air Services</strong>.
                    </p>

                    <p>
                        Best regards,<br />
                        <strong>InterGuide Air Services</strong>
                    </p>

                </div>
            `,

            attachments: [
                {
                    filename: "InterGuide.png",

                    path: path.join(
                        __dirname,
                        "assets",
                        "InterGuide.png"
                    ),

                    cid: "interguide-contact-logo"
                }
            ]
        });

        console.log("✅ Customer confirmation email sent");

        res.status(201).json({
            message: "Message sent successfully"
        });

    } catch (error) {
        console.error("❌ Contact error:", error);

        res.status(500).json({
            message: "Error sending message",
            error: error.message
        });
    }
});
// =====================================================
// VISA REQUEST
// =====================================================

app.post(
    "/visa-requests",
    async (req, res) => {

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

            const cleanEmail =
                email
                    ? email.trim().toLowerCase()
                    : "";

            const cleanPhone =
                phone
                    ? phone.trim()
                    : "";

            const newVisaRequest =
                new VisaRequest({

                    firstName,

                    lastName,

                    email:
                        cleanEmail,

                    nationality,

                    phone:
                        cleanPhone,

                    destination,

                    outboundDate,

                    inboundDate

                });

            await newVisaRequest.save();

            // =====================================================
            // EMAIL COMPANY
            // =====================================================

            await transporter.sendMail({

                from:
                    process.env.EMAIL_USER,

                to:
                    process.env.COMPANY_EMAIL,

                subject:
                    "New Visa Assistance Request",

                html: `

                    <h2>
                        New Visa Assistance Request
                    </h2>

                    <p>
                        <strong>
                            First Name:
                        </strong>
                        ${firstName || "Not provided"}
                    </p>

                    <p>
                        <strong>
                            Last Name:
                        </strong>
                        ${lastName || "Not provided"}
                    </p>

                    <p>
                        <strong>
                            Email:
                        </strong>
                        ${cleanEmail || "Not provided"}
                    </p>

                    <p>
                        <strong>
                            Phone:
                        </strong>
                        ${cleanPhone || "Not provided"}
                    </p>

                    <p>
                        <strong>
                            Nationality:
                        </strong>
                        ${nationality || "Not provided"}
                    </p>

                    <p>
                        <strong>
                            Destination:
                        </strong>
                        ${destination || "Not provided"}
                    </p>

                    <p>
                        <strong>
                            Outbound Date:
                        </strong>
                        ${outboundDate || "Not provided"}
                    </p>

                    <p>
                        <strong>
                            Inbound Date:
                        </strong>
                        ${inboundDate || "Not provided"}
                    </p>

                `
            });

            // =====================================================
            // EMAIL CUSTOMER
            // =====================================================

            await transporter.sendMail({

                from:
                    process.env.EMAIL_USER,

                to:
                    cleanEmail,

                subject:
                    "Visa Assistance Request Received - InterGuide Air Services",

                html: `

                    <div style="
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                    ">

                        <img
                            src="cid:interguide-visa-logo"
                            alt="InterGuide Air Services"
                            style="width: 180px;"
                        />

                        <h2>
                            Visa Assistance Request Received
                        </h2>

                        <p>
                            Dear ${firstName || "Customer"},
                        </p>

                        <p>
                            Thank you for submitting your
                            visa assistance request to
                            InterGuide Air Services.
                        </p>

                        <p>
                            Our team has received your request
                            and will review your travel details.
                        </p>

                        <p>
                            <strong>
                                Destination:
                            </strong>
                            ${destination}
                        </p>

                        <p>
                            <strong>
                                Outbound Date:
                            </strong>
                            ${outboundDate}
                        </p>

                        <p>
                            <strong>
                                Inbound Date:
                            </strong>
                            ${inboundDate}
                        </p>

                        <p>
                            We will contact you with the
                            next steps.
                        </p>

                        <p>
                            Best regards,<br />

                            <strong>
                                InterGuide Air Services
                            </strong>
                        </p>

                    </div>

                `,

                attachments: [

                    {
                        filename:
                            "InterGuide.png",

                        path:
                            path.join(
                                __dirname,
                                "assets",
                                "InterGuide.png"
                            ),

                        cid:
                            "interguide-visa-logo"
                    }

                ]
            });

            res.status(201).json({

                message:
                    "Visa request submitted successfully"

            });

        } catch (error) {

            console.error(
                "Visa request error:",
                error
            );

            res.status(500).json({

                message:
                    "Error submitting visa request",

                error:
                    error.message

            });
        }
    }
);

// =====================================================
// HOTEL CRUD
// =====================================================

// GET ALL HOTELS

app.get(
    "/hotels",
    async (req, res) => {

        try {

            const hotels =
                await Hotel.find()
                    .sort({
                        createdAt:
                            -1
                    });

            res.json(hotels);

        } catch (error) {

            res.status(500).json({

                message:
                    "Error getting hotels",

                error:
                    error.message
            });
        }
    }
);

// CREATE HOTEL

app.post(
    "/hotels",
    authenticateAdmin,
    upload.single("image"),
    async (req, res) => {

        try {

            const {
                name,
                location,
                price,
                description
            } = req.body;

            if (
                !name ||
                !location ||
                !price
            ) {

                return res.status(400).json({

                    message:
                        "Name, location and price are required"
                });
            }

            const hotel =
                new Hotel({

                    name,

                    location,

                    price,

                    description,

                    image:
                        req.file
                            ? `/uploads/${req.file.filename}`
                            : ""
                });

            await hotel.save();

            res.status(201).json(
                hotel
            );

        } catch (error) {

            console.error(
                "Create hotel error:",
                error
            );

            res.status(500).json({

                message:
                    "Error creating hotel",

                error:
                    error.message
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

            const updateData = {
                ...req.body
            };

            if (req.file) {

                updateData.image =
                    `/uploads/${req.file.filename}`;
            }

            const updatedHotel =
                await Hotel.findByIdAndUpdate(

                    req.params.id,

                    updateData,

                    {
                        new: true,
                        runValidators: true
                    }
                );

            if (!updatedHotel) {

                return res.status(404).json({

                    message:
                        "Hotel not found"
                });
            }

            res.json(
                updatedHotel
            );

        } catch (error) {

            console.error(
                "Update hotel error:",
                error
            );

            res.status(500).json({

                message:
                    "Error updating hotel",

                error:
                    error.message
            });
        }
    }
);

// DELETE HOTEL

app.delete(
    "/hotels/:id",
    authenticateAdmin,
    async (req, res) => {

        try {

            const deletedHotel =
                await Hotel.findByIdAndDelete(
                    req.params.id
                );

            if (!deletedHotel) {

                return res.status(404).json({

                    message:
                        "Hotel not found"
                });
            }

            res.json({

                message:
                    "Hotel deleted successfully"
            });

        } catch (error) {

            res.status(500).json({

                message:
                    "Error deleting hotel",

                error:
                    error.message
            });
        }
    }
);

// =====================================================
// FLIGHT CRUD
// =====================================================

// GET ALL FLIGHTS

app.get(
    "/flights",
    async (req, res) => {

        try {

            const flights =
                await Flight.find()
                    .sort({
                        createdAt:
                            -1
                    });

            res.json(flights);

        } catch (error) {

            res.status(500).json({

                message:
                    "Error getting flights",

                error:
                    error.message
            });
        }
    }
);

// CREATE FLIGHT

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

                    message:
                        "All flight fields are required"
                });
            }

            const flight =
                new Flight({

                    airline,

                    departure,

                    destination,

                    startDate,

                    endDate,

                    price,

                    image:
                        req.file
                            ? `/uploads/${req.file.filename}`
                            : ""
                });

            await flight.save();

            res.status(201).json(
                flight
            );

        } catch (error) {

            console.error(
                "Create flight error:",
                error
            );

            res.status(500).json({

                message:
                    "Error creating flight",

                error:
                    error.message
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

            const updateData = {
                ...req.body
            };

            if (req.file) {

                updateData.image =
                    `/uploads/${req.file.filename}`;
            }

            const updatedFlight =
                await Flight.findByIdAndUpdate(

                    req.params.id,

                    updateData,

                    {
                        new: true,
                        runValidators: true
                    }
                );

            if (!updatedFlight) {

                return res.status(404).json({

                    message:
                        "Flight not found"
                });
            }

            res.json(
                updatedFlight
            );

        } catch (error) {

            console.error(
                "Update flight error:",
                error
            );

            res.status(500).json({

                message:
                    "Error updating flight",

                error:
                    error.message
            });
        }
    }
);

// DELETE FLIGHT

app.delete(
    "/flights/:id",
    authenticateAdmin,
    async (req, res) => {

        try {

            const deletedFlight =
                await Flight.findByIdAndDelete(
                    req.params.id
                );

            if (!deletedFlight) {

                return res.status(404).json({

                    message:
                        "Flight not found"
                });
            }

            res.json({

                message:
                    "Flight deleted successfully"
            });

        } catch (error) {

            res.status(500).json({

                message:
                    "Error deleting flight",

                error:
                    error.message
            });
        }
    }
);

// =====================================================
// HOME FLIGHT CRUD
// =====================================================

// GET HOME FLIGHTS

app.get(
    "/home-flights",
    async (req, res) => {

        try {

            const flights =
                await HomeFlight.find()
                    .sort({
                        createdAt:
                            -1
                    });

            res.json(flights);

        } catch (error) {

            console.error(
                "Get home flights error:",
                error
            );

            res.status(500).json({

                message:
                    "Error getting home flights",

                error:
                    error.message
            });
        }
    }
);

// CREATE HOME FLIGHT

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

            if (
                !title ||
                !description ||
                !label ||
                !price ||
                !buttonText
            ) {

                return res.status(400).json({

                    message:
                        "Title, description, label, price and button text are required"
                });
            }

            const homeFlight =
                new HomeFlight({

                    title,

                    description,

                    label,

                    price,

                    buttonText,

                    image:
                        req.file
                            ? `/uploads/${req.file.filename}`
                            : ""
                });

            await homeFlight.save();

            res.status(201).json(
                homeFlight
            );

        } catch (error) {

            console.error(
                "Create home flight error:",
                error
            );

            res.status(500).json({

                message:
                    "Error creating home flight",

                error:
                    error.message
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

                title:
                    req.body.title,

                description:
                    req.body.description,

                label:
                    req.body.label,

                price:
                    req.body.price,

                buttonText:
                    req.body.buttonText
            };

            if (req.file) {

                updateData.image =
                    `/uploads/${req.file.filename}`;
            }

            const updatedFlight =
                await HomeFlight.findByIdAndUpdate(

                    req.params.id,

                    updateData,

                    {
                        new: true,
                        runValidators: true
                    }
                );

            if (!updatedFlight) {

                return res.status(404).json({

                    message:
                        "Home flight not found"
                });
            }

            res.json(
                updatedFlight
            );

        } catch (error) {

            console.error(
                "Update home flight error:",
                error
            );

            res.status(500).json({

                message:
                    "Error updating home flight",

                error:
                    error.message
            });
        }
    }
);

// DELETE HOME FLIGHT

app.delete(
    "/home-flights/:id",
    authenticateAdmin,
    async (req, res) => {

        try {

            const deletedFlight =
                await HomeFlight.findByIdAndDelete(
                    req.params.id
                );

            if (!deletedFlight) {

                return res.status(404).json({

                    message:
                        "Home flight not found"
                });
            }

            res.json({

                message:
                    "Home flight deleted successfully"
            });

        } catch (error) {

            console.error(
                "Delete home flight error:",
                error
            );

            res.status(500).json({

                message:
                    "Error deleting home flight",

                error:
                    error.message
            });
        }
    }
);

// =====================================================
// HOME TOUR CRUD
// =====================================================

// GET HOME TOURS

app.get(
    "/home-tours",
    async (req, res) => {

        try {

            const tours =
                await HomeTour.find()
                    .sort({
                        createdAt:
                            -1
                    });

            res.json(tours);

        } catch (error) {

            console.error(
                "Get home tours error:",
                error
            );

            res.status(500).json({

                message:
                    "Error getting home tours",

                error:
                    error.message
            });
        }
    }
);

// CREATE HOME TOUR

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

            if (
                !title ||
                !description ||
                !price ||
                !label ||
                !buttonText
            ) {

                return res.status(400).json({

                    message:
                        "Title, description, price, label and button text are required"
                });
            }

            const homeTour =
                new HomeTour({

                    title,

                    description,

                    price,

                    label,

                    buttonText,

                    image:
                        req.file
                            ? `/uploads/${req.file.filename}`
                            : ""
                });

            await homeTour.save();

            res.status(201).json(
                homeTour
            );

        } catch (error) {

            console.error(
                "Create home tour error:",
                error
            );

            res.status(500).json({

                message:
                    "Error creating home tour",

                error:
                    error.message
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

                title:
                    req.body.title,

                description:
                    req.body.description,

                price:
                    req.body.price,

                label:
                    req.body.label,

                buttonText:
                    req.body.buttonText
            };

            if (req.file) {

                updateData.image =
                    `/uploads/${req.file.filename}`;
            }

            const updatedTour =
                await HomeTour.findByIdAndUpdate(

                    req.params.id,

                    updateData,

                    {
                        new: true,
                        runValidators: true
                    }
                );

            if (!updatedTour) {

                return res.status(404).json({

                    message:
                        "Home tour not found"
                });
            }

            res.json(
                updatedTour
            );

        } catch (error) {

            console.error(
                "Update home tour error:",
                error
            );

            res.status(500).json({

                message:
                    "Error updating home tour",

                error:
                    error.message
            });
        }
    }
);

// DELETE HOME TOUR

app.delete(
    "/home-tours/:id",
    authenticateAdmin,
    async (req, res) => {

        try {

            const deletedTour =
                await HomeTour.findByIdAndDelete(
                    req.params.id
                );

            if (!deletedTour) {

                return res.status(404).json({

                    message:
                        "Home tour not found"
                });
            }

            res.json({

                message:
                    "Home tour deleted successfully"
            });

        } catch (error) {

            console.error(
                "Delete home tour error:",
                error
            );

            res.status(500).json({

                message:
                    "Error deleting home tour",

                error:
                    error.message
            });
        }
    }
);

// =====================================================
// TOUR PACKAGE CRUD
// =====================================================

// GET ALL TOUR PACKAGES

app.get(
    "/tour-packages",
    async (req, res) => {

        try {

            const tourPackages =
                await TourPackage.find()
                    .sort({
                        createdAt:
                            1
                    });

            res.json(
                tourPackages
            );

        } catch (error) {

            console.error(
                "Get tour packages error:",
                error
            );

            res.status(500).json({

                message:
                    "Error getting tour packages",

                error:
                    error.message
            });
        }
    }
);

// CREATE TOUR PACKAGE

app.post(
    "/tour-packages",
    authenticateAdmin,
    upload.fields([
        {
            name: "image1",
            maxCount: 1
        },
        {
            name: "image2",
            maxCount: 1
        }
    ]),
    async (req, res) => {

        try {

            const {
                name
            } = req.body;

            if (!name) {

                return res.status(400).json({

                    message:
                        "Tour package name is required"
                });
            }

            if (
                !req.files ||
                !req.files.image1 ||
                !req.files.image2
            ) {

                return res.status(400).json({

                    message:
                        "Both images are required"
                });
            }

            const existingPackage =
                await TourPackage.findOne({
                    name:
                        name.trim()
                });

            if (existingPackage) {

                return res.status(400).json({

                    message:
                        "This tour package already exists"
                });
            }

            const tourPackage =
                new TourPackage({

                    name:
                        name.trim(),

                    image1:
                        `/uploads/${req.files.image1[0].filename}`,

                    image2:
                        `/uploads/${req.files.image2[0].filename}`
                });

            await tourPackage.save();

            res.status(201).json(
                tourPackage
            );

        } catch (error) {

            console.error(
                "Create tour package error:",
                error
            );

            res.status(500).json({

                message:
                    "Error creating tour package",

                error:
                    error.message
            });
        }
    }
);

// UPDATE TOUR PACKAGE

app.put(
    "/tour-packages/:id",
    authenticateAdmin,
    upload.fields([
        {
            name: "image1",
            maxCount: 1
        },
        {
            name: "image2",
            maxCount: 1
        }
    ]),
    async (req, res) => {

        try {

            const updateData = {};

            if (req.files) {

                if (
                    req.files.image1 &&
                    req.files.image1.length > 0
                ) {

                    updateData.image1 =
                        `/uploads/${req.files.image1[0].filename}`;
                }

                if (
                    req.files.image2 &&
                    req.files.image2.length > 0
                ) {

                    updateData.image2 =
                        `/uploads/${req.files.image2[0].filename}`;
                }
            }

            const updatedTourPackage =
                await TourPackage.findByIdAndUpdate(

                    req.params.id,

                    updateData,

                    {
                        new: true,
                        runValidators: true
                    }
                );

            if (!updatedTourPackage) {

                return res.status(404).json({

                    message:
                        "Tour package not found"
                });
            }

            res.json(
                updatedTourPackage
            );

        } catch (error) {

            console.error(
                "Update tour package error:",
                error
            );

            res.status(500).json({

                message:
                    "Error updating tour package",

                error:
                    error.message
            });
        }
    }
);

// =====================================================
// TEST ROUTE
// =====================================================

app.get(
    "/",
    (req, res) => {

        res.json({

            message:
                "InterGuide Air backend is running"
        });

    }
);

// =====================================================
// SERVER
// =====================================================

const PORT = 5000;

app.listen(
    PORT,
    () => {

        console.log(
            `Server is running on port ${PORT}`
        );

    }
);