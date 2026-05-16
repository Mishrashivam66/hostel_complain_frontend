import {

  useEffect,

  useState,

} from "react";

import {

  Eye,

  Clock3,

  CheckCircle2,

  AlertTriangle,

} from "lucide-react";

import {

  useNavigate,

} from "react-router-dom";

import API from "../../services/api";

import StudentLayout from "../../layouts/StudentLayout";

import "./Student.css";

const MyComplaints = () => {

  const navigate =
    useNavigate();

  // ======================
  // STATE
  // ======================

  const [complaints,
    setComplaints] =
    useState([]);

  // ======================
  // FETCH COMPLAINTS
  // ======================

  const fetchComplaints =
    async () => {

      try {

        const res =
          await API.get(

            "/complaints/my"

          );

        setComplaints(

          res.data.complaints

        );

      } catch (error) {

        console.log(error);

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

  const getStatusIcon = (

    status

  ) => {

    if (status === "Pending") {

      return <Clock3 size={18} />;

    }

    if (status === "Completed") {

      return (
        <CheckCircle2 size={18} />
      );

    }

    return (
      <AlertTriangle size={18} />
    );

  };

  return (

    <StudentLayout>

      <div className="student-page">

        {/* HEADER */}

        <div className="student-header">

          <h1>

            My Complaints

          </h1>

          <p>

            Track all complaint
            updates and progress

          </p>

        </div>

        {/* EMPTY */}

        {complaints.length === 0 && (

          <div className="empty-box">

            No complaints found

          </div>

        )}

        {/* LIST */}

        <div className="complaint-list">

          {complaints.map(

            (complaint) => (

              <div

                key={complaint._id}

                className="complaint-card"

              >

                {/* TOP */}

                <div className="complaint-top">

                  <div>

                    <h2>

                      {complaint.category}

                    </h2>

                    <p className="complaint-id">

                      {
                        complaint.complaintId
                      }

                    </p>

                  </div>

                  <span

                    className={`status ${

                      complaint.status
                        .toLowerCase()

                    }`}

                  >

                    {getStatusIcon(

                      complaint.status

                    )}

                    {complaint.status}

                  </span>

                </div>

                {/* DESCRIPTION */}

                <p className="complaint-description">

                  {
                    complaint.description
                  }

                </p>

                {/* INFO */}

                <div className="complaint-bottom">

                  <span>

                    Hostel:
                    {
                      complaint.hostel
                    }

                  </span>

                  <span>

                    Room:
                    {
                      complaint.room
                    }

                  </span>

                  <span>

                    {

                      new Date(

                        complaint.createdAt

                      ).toLocaleDateString()

                    }

                  </span>

                </div>

                {/* BUTTON */}

                <button

                  className="details-btn"

                  onClick={() =>

                    navigate(

                      `/student/complaint-details/${complaint._id}`

                    )

                  }

                >

                  <Eye size={18} />

                  View Details

                </button>

              </div>

            )

          )}

        </div>

      </div>

    </StudentLayout>

  );

};

export default MyComplaints;