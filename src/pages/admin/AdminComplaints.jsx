import { Search, Filter, ClipboardList } from "lucide-react";

import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import API from "../../services/api";

import "./Admin.css";

const AdminComplaints = () => {
  // ======================
  // STATES
  // ======================

  const [complaints, setComplaints] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  // ======================
  // FETCH COMPLAINTS
  // ======================

  const fetchComplaints = async () => {
    try {
      const res = await API.get("/admin/complaints");

      setComplaints(res.data.complaints || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // USE EFFECT
  // ======================

  useEffect(() => {
    fetchComplaints();
  }, []);

  // ======================
  // FILTER
  // ======================

  const filteredComplaints = complaints.filter((item) => {
    const searchText = search.toLowerCase();

    const studentName = item.studentName?.toLowerCase() || "";

    const category = item.category?.toLowerCase() || "";

    const complaintId = item.complaintId?.toLowerCase() || "";

    const worker = item.assignedWorker?.toLowerCase() || "";

    const matchesSearch =
      studentName.includes(searchText) ||
      category.includes(searchText) ||
      complaintId.includes(searchText) ||
      worker.includes(searchText);

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="admin-page">
        {/* ====================== */}
        {/* HEADER */}
        {/* ====================== */}

        <div className="admin-header">
          <h1>Complaints List</h1>

          <p>Monitor all hostel complaints</p>
        </div>

        {/* ====================== */}
        {/* FILTER ROW */}
        {/* ====================== */}

        <div className="admin-filter-row">
          {/* SEARCH */}

          <div className="admin-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search complaints..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* FILTER */}

          <div className="admin-filter">
            <Filter size={18} />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>

              <option value="Pending">Pending</option>

              <option value="In Progress">In Progress</option>

              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* ====================== */}
        {/* TABLE */}
        {/* ====================== */}

        <div className="admin-section">
          <div className="admin-section-header">
            <div>
              <h2>Complaints Table</h2>

              <p>
                Total Complaints:
                {filteredComplaints.length}
              </p>
            </div>
          </div>

          {/* ====================== */}
          {/* TABLE */}
          {/* ====================== */}

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Complaint ID</th>

                  <th>Student</th>

                  <th>Hostel</th>

                  <th>Room</th>

                  <th>Category</th>

                  <th>Phone</th>

                  <th>Status</th>

                  <th>Worker</th>

                  <th>Escalated</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="empty-table">
                      Loading complaints...
                    </td>
                  </tr>
                ) : filteredComplaints.length > 0 ? (
                  filteredComplaints.map((item, index) => (
                    <tr key={index}>
                      {/* ID */}

                      <td>
                        <div className="user-box">
                          <div className="user-avatar">
                            <ClipboardList size={16} />
                          </div>

                          {item.complaintId}
                        </div>
                      </td>

                      {/* STUDENT */}

                      <td>{item.studentName || "Unknown"}</td>

                      {/* HOSTEL */}

                      <td>{item.hostel}</td>

                      {/* ROOM */}

                      <td>{item.room}</td>

                      {/* CATEGORY */}

                      <td>{item.category}</td>

                      {/* PHONE */}

                      <td>{item.phoneNumber}</td>

                      {/* STATUS */}

                      <td>
                        <span
                          className={`status-badge ${
                            item.status === "Completed"
                              ? "status-completed"
                              : item.status === "In Progress"
                                ? "status-assigned"
                                : "status-pending"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      {/* WORKER */}

                      <td>{item.assignedWorker || "-"}</td>

                      {/* ESCALATED */}

                      <td>
                        {item.isEscalated ? (
                          <span className="status-badge status-pending">
                            Yes
                          </span>
                        ) : (
                          <span className="status-badge status-completed">
                            No
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="empty-table">
                      No complaints found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminComplaints;
