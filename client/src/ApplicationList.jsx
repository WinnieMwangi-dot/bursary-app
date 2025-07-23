import React, { useEffect, useState } from "react";
import axios from "axios";

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");

  const fetchApps = async () => {
    const res = await axios.get(`http://localhost:5000/api/applications?search=${search}`);
    setApplications(res.data);
  };

  useEffect(() => { fetchApps(); }, [search]);

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/applications/${id}/status`, { status });
    fetchApps();
  };

  const handleExport = async () => {
    const res = await axios.get("http://localhost:5000/api/export", { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "applications.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Applications</h2>
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or school..."
          className="input w-full"
        />
        <button onClick={handleExport} className="btn-secondary">Export CSV</button>
      </div>
      <table className="w-full text-sm table-auto border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Name</th>
            <th>Email</th>
            <th>School</th>
            <th>Income</th>
            <th>Document</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app._id} className="border-t">
              <td className="p-2">{app.fullName}</td>
              <td>{app.email}</td>
              <td>{app.school}</td>
              <td>KES {app.familyIncome}</td>
              <td>
                {app.fileUrl ? (
                  <a
                    href={`http://localhost:5000${app.fileUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    View
                  </a>
                ) : "—"}
              </td>
              <td>{app.status || "Pending"}</td>
              <td className="space-x-2">
                <button onClick={() => updateStatus(app._id, "approved")} className="btn-green">Approve</button>
                <button onClick={() => updateStatus(app._id, "rejected")} className="btn-red">Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationList;
