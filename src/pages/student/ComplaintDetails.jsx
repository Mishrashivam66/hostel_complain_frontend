import "./ComplaintDetails.css";


import {

  useEffect,

  useState,

} from "react";

import {

  useParams,

} from "react-router-dom";

import API from "../../services/api";

import StudentLayout from "../../layouts/StudentLayout";

import "./Student.css";

const ComplaintDetails = () => {

  const { id } = useParams();

  const [complaint,
    setComplaint] =
    useState(null);

  // ======================
  // FETCH
  // ======================

  const fetchComplaint =
    async () => {

      try {

        const res =
          await API.get(

            `/complaints/${id}`

          );

        setComplaint(

          res.data.complaint

        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchComplaint();

  }, []);

  // ======================
  // LOADING
  // ======================

  if (!complaint) {

    return (

      <StudentLayout>

        <div className="student-page">

          Loading...

        </div>

      </StudentLayout>

    );

  }

  return (

  <StudentLayout>

    <div className="student-page">

      {/* HEADER */}

      <div className="student-header">

        <h1>

          Complaint Details

        </h1>

        <p>

          Complete complaint
          information

        </p>

      </div>

      {/* CARD */}

      <div className="details-card">

        {/* TOP */}

        <div className="details-top">

          <div>

            <h2>

              {complaint.category}

            </h2>

            <p className="complaint-id">

              Complaint ID:
              {

                complaint.complaintId

              }

            </p>

          </div>

          <span

            className={`status-badge ${

              complaint.status
                .toLowerCase()

            }`}

          >

            {

              complaint.status

            }

          </span>

        </div>

        {/* GRID */}

        <div className="details-grid">

          {[

            {

              label: "Hostel",

              value:
                complaint.hostel,

            },

            {

              label: "Floor",

              value:
                complaint.floor,

            },

            {

              label: "Room",

              value:
                complaint.room,

            },

            {

              label: "Phone",

              value:
                complaint.phoneNumber,

            },

            {

              label:
                "Available Time",

              value:
                `${complaint.availabilityFrom} - ${complaint.availabilityTo}`,

            },

            {

              label: "Email",

              value:
                complaint.studentEmail,

            },

          ].map((item, index) => (

            <div

              key={index}

              className="details-item"

            >

              <p className="details-label">

                {item.label}

              </p>

              <h3 className="details-value">

                {item.value}

              </h3>

            </div>

          ))}

        </div>

        {/* DESCRIPTION */}

        <div className="description-box">

          <h3>

            Complaint Description

          </h3>

          <p>

            {

              complaint.description

            }

          </p>

        </div>

      </div>

    </div>

  </StudentLayout>

);

};

export default ComplaintDetails;