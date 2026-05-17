import { useEffect, useState } from "react";

import { Eye, Clock3, CheckCircle2, AlertTriangle } from "lucide-react";

import { useNavigate } from "react-router-dom";

import API from "../../services/api";

import StudentLayout from "../../layouts/StudentLayout";

import "./Student.css";

const MyComplaints = () => {
  const navigate = useNavigate();

  // ======================
  // STATES
  // ======================

  const [complaints, setComplaints] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedDescription, setSelectedDescription] = useState("");

  // ======================
  // FETCH COMPLAINTS
  // ======================

  const fetchComplaints = async () => {
    try {
      const res = await API.get("/complaints/my");

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
  // STATUS ICON
  // ======================

  const getStatusIcon = (status) => {
    if (status === "Pending") {
      return <Clock3 size={18} />;
    }

    if (status === "Completed") {
      return <CheckCircle2 size={18} />;
    }

    return <AlertTriangle size={18} />;
  };

  return (
    <StudentLayout>
      <div className="student-page">
        {/* ====================== */}
        {/* HEADER */}
        {/* ====================== */}

        <div className="student-header">
          <h1>My Complaints</h1>

          <p>Track all complaint updates and progress</p>
        </div>

        {/* ====================== */}
        {/* LOADING */}
        {/* ====================== */}

        {loading && <div className="empty-box">Loading complaints...</div>}

        {/* ====================== */}
        {/* EMPTY */}
        {/* ====================== */}

        {!loading && complaints.length === 0 && (
          <div className="empty-box">No complaints found 🚀</div>
        )}

        {/* ====================== */}
        {/* COMPLAINT LIST */}
        {/* ====================== */}

        <div className="complaint-list">
          {complaints.map((complaint) => (
            <div
              key={complaint._id}
              className={`complaint-card ${
                complaint.isEscalated ? "escalated-card" : ""
              }`}
            >
              {/* ====================== */}
              {/* TOP */}
              {/* ====================== */}

              <div className="complaint-top">
                <div>
                  <h2>{complaint.category}</h2>

                  <p className="complaint-id">{complaint.complaintId}</p>
                </div>

                {/* STATUS */}

                <span
                  className={`status ${complaint.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {getStatusIcon(complaint.status)}

                  {complaint.status}
                </span>
              </div>

              {/* ====================== */}
              {/* DESCRIPTION */}
              {/* ====================== */}

              <div>
                <p className="complaint-description">
                  {complaint.description?.split(" ").slice(0, 20).join(" ")}

                  {complaint.description?.split(" ").length > 20 && "..."}
                </p>

                {complaint.description?.split(" ").length > 20 && (
                  <button
                    className="view-more-btn"
                    onClick={() =>
                      setSelectedDescription(complaint.description)
                    }
                  >
                    View More
                  </button>
                )}
              </div>

              {/* ====================== */}
              {/* WORKER */}
              {/* ====================== */}

              <div className="worker-info">
                <span>
                  Worker:
                  {complaint.assignedWorker || " Not Assigned"}
                </span>
              </div>

              {/* ====================== */}
              {/* INFO */}
              {/* ====================== */}

              <div className="complaint-bottom">
                <span>
                  Hostel:
                  {complaint.hostel}
                </span>

                <span>
                  Room:
                  {complaint.room}
                </span>

                <span>
                  {new Date(complaint.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* ====================== */}
              {/* DEADLINE */}
              {/* ====================== */}

              <div className="deadline-box">
                Deadline:
                {complaint.completionDeadline
                  ? new Date(complaint.completionDeadline).toLocaleString()
                  : "-"}
              </div>

              {/* ====================== */}
              {/* BUTTON */}
              {/* ====================== */}

              <button
                className="details-btn"
                onClick={() =>
                  navigate(`/student/complaint-details/${complaint._id}`)
                }
              >
                <Eye size={18} />
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ====================== */}
      {/* DESCRIPTION MODAL */}
      {/* ====================== */}

      {selectedDescription && (
        <div
          className="desc-modal-overlay"
          onClick={() => setSelectedDescription("")}
        >
          <div className="desc-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Complaint Description</h2>

            <p>{selectedDescription}</p>

            <button
              className="close-modal-btn"
              onClick={() => setSelectedDescription("")}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </StudentLayout>
  );
};

export default MyComplaints;
