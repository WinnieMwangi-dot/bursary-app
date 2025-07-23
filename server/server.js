const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
const nodemailer = require("nodemailer");
const { Parser } = require("json2csv");
const fs = require("fs");
const path = require("path");

const BursaryApplication = require("./models/BursaryApplication");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve uploaded files

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// 📩 Confirmation email
const sendConfirmationEmail = (to, fullName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Bursary Application Received",
    text: `Hello ${fullName},\n\nYour bursary application has been received successfully.`
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.error("Email error:", err);
    else console.log("Email sent:", info.response);
  });
};

// 📝 Submit application
app.post("/api/apply", upload.single("document"), async (req, res) => {
  try {
    const { fullName, email, school, familyIncome } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const application = new BursaryApplication({
      fullName,
      email,
      school,
      familyIncome,
      fileUrl
    });

    await application.save();
    sendConfirmationEmail(email, fullName);
    res.status(201).json({ message: "Application submitted and saved!" });
  } catch (err) {
    console.error("❌ Error saving application:", err);
    res.status(500).json({ error: "Server error." });
  }
});

// 🔍 Get all with optional search
app.get("/api/applications", async (req, res) => {
  const { search } = req.query;
  const filter = search
    ? {
        $or: [
          { fullName: new RegExp(search, "i") },
          { school: new RegExp(search, "i") }
        ]
      }
    : {};

  try {
    const apps = await BursaryApplication.find(filter).sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch applications." });
  }
});

// ✅ Approve or reject application
app.put("/api/applications/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    const updated = await BursaryApplication.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

// 📤 Export to CSV
app.get("/api/export", async (req, res) => {
  try {
    const apps = await BursaryApplication.find();
    const parser = new Parser();
    const csv = parser.parse(apps);
    const filePath = path.join(__dirname, "applications.csv");
    fs.writeFileSync(filePath, csv);
    res.download(filePath);
  } catch (err) {
    res.status(500).json({ error: "Export failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
