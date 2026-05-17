import { Users, Search, Filter } from "lucide-react";

import { useEffect, useState } from "react";

import { CSVLink } from "react-csv";

import AdminLayout from "../../layouts/AdminLayout";

import API from "../../services/api";

import "./Admin.css";

const AdminStudents = () => {
  // ======================
  // STATES
  // ======================

  const [students, setStudents] = useState([]);

  const [search, setSearch] = useState("");

  const [hostelFilter, setHostelFilter] = useState("All");

  // ======================
  // FETCH STUDENTS
  // ======================

  const fetchStudents = async () => {
    try {
      const res = await API.get("/admin/students");

      setStudents(res.data.students || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ======================
  // USE EFFECT
  // ======================

  useEffect(() => {
    fetchStudents();
  }, []);

  // ======================
  // REMOVE DUPLICATES
  // ======================

  const uniqueStudents = Array.from(
    new Map(students.map((item) => [item.email, item])).values(),
  );

  // ======================
  // FILTERED STUDENTS
  // ======================

  const filteredStudents = uniqueStudents.filter((item) => {
    const studentName = item.name ? item.name.toLowerCase() : "";

    const studentEmail = item.email ? item.email.toLowerCase() : "";

    const hostel = item.hostel ? item.hostel.toLowerCase() : "";

    const searchText = search.toLowerCase();

    // ======================
    // SEARCH
    // ======================

    const matchesSearch =
      studentName.includes(searchText) ||
      studentEmail.includes(searchText) ||
      hostel.includes(searchText);

    // ======================
    // HOSTEL FILTER
    // ======================

    const matchesHostel =
      hostelFilter === "All" ||
      item.hostel?.toLowerCase() === hostelFilter.toLowerCase();

    return matchesSearch && matchesHostel;
  });

  return (
    <AdminLayout>
      <div className="admin-page">
        {/* ====================== */}
        {/* HEADER */}
        {/* ====================== */}

        <div className="admin-header">
          <h1>Student Management</h1>

          <p>View and manage all registered hostel students</p>
        </div>

        {/* ====================== */}
        {/* SEARCH + FILTER */}
        {/* ====================== */}

        <div className="admin-filter-row">
          {/* SEARCH */}

          <div className="admin-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* FILTER */}

          <div className="admin-filter">
            <Filter size={18} />

            <select
              value={hostelFilter}
              onChange={(e) => setHostelFilter(e.target.value)}
            >
              <option value="All">All Hostels</option>

              <option value="H1">H1</option>

              <option value="H2">H2</option>

              <option value="H3">H3</option>

              <option value="H4">H4</option>

              <option value="H5">H5</option>
            </select>
          </div>
        </div>

        {/* ====================== */}
        {/* EXPORT */}
        {/* ====================== */}

        <div className="export-buttons">
          <CSVLink
            data={filteredStudents}
            filename="students-report.csv"
            className="export-btn"
          >
            Download CSV
          </CSVLink>
        </div>

        {/* ====================== */}
        {/* TABLE */}
        {/* ====================== */}

        <div className="admin-section">
          <div className="admin-section-header">
            <div>
              <h2>Students List</h2>

              <p>
                Total Students:
                {filteredStudents.length}
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
                  <th>Name</th>

                  <th>Email</th>

                  <th>Hostel</th>

                  <th>Room</th>

                  <th>Phone</th>

                  <th>Complaints</th>

                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((item, index) => (
                    <tr key={index}>
                      {/* NAME */}

                      <td>
                        <div className="user-box">
                          <div className="user-avatar">
                            {item.name?.charAt(0)}
                          </div>

                          {item.name}
                        </div>
                      </td>

                      {/* EMAIL */}

                      <td>{item.email}</td>

                      {/* HOSTEL */}

                      <td>{item.hostel || "-"}</td>

                      {/* ROOM */}

                      <td>{item.roomNumber || "-"}</td>

                      {/* PHONE */}

                      <td>{item.phoneNumber || "-"}</td>

                      {/* COMPLAINTS */}

                      <td>{item.totalComplaints || 0}</td>

                      {/* STATUS */}

                      <td>
                        <span
                          className={`status-badge ${
                            item.isApproved
                              ? "status-completed"
                              : "status-pending"
                          }`}
                        >
                          {item.isApproved ? "Approved" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="empty-table">
                      No students found
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

export default AdminStudents;
