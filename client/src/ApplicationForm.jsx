import React, { useState } from "react";
import axios from "axios";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    school: "",
    familyIncome: "",
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const formPayload = new FormData();
    formPayload.append("fullName", formData.fullName);
    formPayload.append("email", formData.email);
    formPayload.append("school", formData.school);
    formPayload.append("familyIncome", formData.familyIncome);
    if (file) formPayload.append("document", file);

    try {
      const res = await axios.post("http://localhost:5000/api/apply", formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message || "Application submitted!");
      setFormData({
        fullName: "",
        email: "",
        school: "",
        familyIncome: "",
      });
      setFile(null);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Apply for Bursary</h2>
      {message && <div className="text-green-600 mb-3">{message}</div>}
      {error && <div className="text-red-600 mb-3">{error}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">School</label>
          <input
            type="text"
            name="school"
            value={formData.school}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Family Income</label>
          <input
            type="number"
            name="familyIncome"
            value={formData.familyIncome}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Upload ID or Supporting Document (PDF)</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="w-full mt-1"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;
