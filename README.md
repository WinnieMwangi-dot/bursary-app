# 🎓 MERN Bursary Application System

A full-stack bursary application management system built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This platform allows students to apply for bursaries online by submitting details and uploading documents. Administrators can view, approve/reject applications, and export data in CSV format.

---

## 📦 Features

- 📝 Online application form
- 📁 File/document uploads (PDF, Images)
- 📧 Email confirmation to applicants
- 🧑‍💼 Admin dashboard for approvals
- 🔍 Search and filter applications
- 📤 Export to CSV
- 📱 Responsive user interface

---

## 🚀 Tech Stack

| Layer        | Technology                    |
|--------------|-------------------------------|
| Frontend     | React + Vite + Tailwind CSS   |
| Backend      | Node.js + Express.js          |
| Database     | MongoDB + Mongoose            |
| File Uploads | Multer                        |
| Email        | Nodemailer                    |
| Deployment   | Vercel (frontend), Render (backend)

---

## 📁 Project Structure


---

## ⚙️ Full Setup Instructions

### 🔽 Prerequisites

- Node.js and npm installed
- MongoDB Atlas account or local MongoDB setup
- Git installed
- A Gmail or SMTP-enabled email account for sending emails

---

### 1️⃣ Clone the Project

```bash
git clone https://github.com/your-username/mern-bursary-app.git
cd mern-bursary-app
2. BACKEND SET UP
cd server
npm install
3.Create a .env file inside server:
env
Copy
Edit
PORT=5000
MONGO_URI=your_mongo_connection_string
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
CLIENT_URL=http://localhost:5173
You can use Mailtrap for testing emails in development.

Start the backend server:
bash
Copy
Edit
npm run dev
3️⃣ Frontend Setup
bash
Copy
Edit
cd ../client
npm install
Create a .env file inside client:
env
Copy
Edit
VITE_API_URL=http://localhost:5000
Start the frontend server:
bash
Copy
Edit
npm run dev

