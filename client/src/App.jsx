import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ApplicationForm from "./ApplicationForm";
import ApplicationList from "./ApplicationList";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <nav className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-purple-700">🎓 Bursary Portal</h1>
          <div className="space-x-4">
            <Link to="/" className="text-blue-500 hover:underline">Apply</Link>
            <Link to="/applications" className="text-blue-500 hover:underline">Applications</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<ApplicationForm />} />
          <Route path="/applications" element={<ApplicationList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
