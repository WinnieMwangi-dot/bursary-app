import { useEffect, useState } from "react";
import axios from "axios";

function Applications() {
  const [applications, setApplications] = useState([]);

  const fetchApplications = () => {
    axios.get("http://localhost:5000/api/applications")
      .then((res) => setApplications(res.data))
      .catch((err) => console.error("Error loading applications", err));
  };

  const updateStatus = (id, status) => {
    axios.patch(`http://localhost:5000/api/applications/${id}`, { status })
      .then(() => fetchApplications())
      .catch((err) => console.error("Error updating status", err));
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Submitted Bursary Applications</h2>
      <table className="min-w-full bg-white border rounded shadow-md">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2 px-4 text-left">Full Name</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">School</th>
            <th className="py-2 px-4 text-left">Income</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{app.fullName}</td>
              <td className="py-2 px-4">{app.email}</td>
              <td className="py-2 px-4">{app.school}</td>
              <td className="py-2 px-4">Ksh {app.familyIncome.toLocaleString()}</td>
              <td className="py-2 px-4 capitalize">{app.status}</td>
              <td className="py-2 px-4 space-x-2">
                <button
                  onClick={() => updateStatus(app._id, "approved")}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(app._id, "rejected")}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Applications;
