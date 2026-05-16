import {
  ClipboardList,
  Clock3,
  AlertTriangle,
  CheckCircle2,
  Search,
  Filter,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import API from "../../services/api";

import "./Worker.css";

const WorkerDashboard = () => {

  // ======================
  // STATES
  // ======================

  const [
    complaints,
    setComplaints,
  ] = useState([]);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState("All");

  // ======================
  // FETCH COMPLAINTS
  // ======================

  const fetchComplaints =
    async () => {

      try {

        const res =
          await API.get(
            "/worker/complaints"
          );

        setComplaints(
          res.data.complaints || []
        );

      }

      catch (error) {

        console.log(error);

      }

    };

  // ======================
  // ACCEPT COMPLAINT
  // ======================

  const acceptComplaint =
    async (id) => {

      try {

        await API.put(

          `/worker/complaints/${id}/accept`

        );

        fetchComplaints();

      }

      catch (error) {

        console.log(error);

      }

    };

  // ======================
  // COMPLETE COMPLAINT
  // ======================

  const completeComplaint =
    async (id) => {

      try {

        await API.put(

          `/worker/complaints/${id}/complete`

        );

        fetchComplaints();

      }

      catch (error) {

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
  // FILTERED COMPLAINTS
  // ======================

  const filteredComplaints =

    complaints.filter((item) => {

      const studentName =

        item.studentName
        ? item.studentName.toLowerCase()
        : "";

      const complaintCategory =

        item.category
        ? item.category.toLowerCase()
        : "";

      const searchText =
        search.toLowerCase();

      const matchesSearch =

        studentName.includes(
          searchText
        )

        ||

        complaintCategory.includes(
          searchText
        )

        ||

        item.complaintId
          ?.toLowerCase()
          .includes(searchText);

      const matchesStatus =

        statusFilter === "All"

        ||

        item.status === statusFilter;

      return (

        matchesSearch

        &&

        matchesStatus

      );

    });

  // ======================
  // COUNTS
  // ======================

  const totalComplaints =
    complaints.length;

  const pendingComplaints =

    complaints.filter(

      (item) =>

        item.status ===
        "Pending"

    ).length;

  const progressComplaints =

    complaints.filter(

      (item) =>

        item.status ===
        "In Progress"

    ).length;

  const completedComplaints =

    complaints.filter(

      (item) =>

        item.status ===
        "Completed"

    ).length;

  return (

    <div className="worker-page">

      {/* ====================== */}
      {/* HEADER */}
      {/* ====================== */}

      <div className="worker-header">

        <h1>

          Worker Dashboard

        </h1>

        <p>

          Manage hostel complaints
          and work progress

        </p>

      </div>

      {/* ====================== */}
      {/* STATS */}
      {/* ====================== */}

      <div className="worker-grid">

        {/* TOTAL */}

        <div className="worker-card">

          <div className="worker-icon">

            <ClipboardList size={28} />

          </div>

          <div>

            <h2>

              {

                totalComplaints

              }

            </h2>

            <p>

              Total Complaints

            </p>

          </div>

        </div>

        {/* PENDING */}

        <div className="worker-card">

          <div className="worker-icon pending">

            <Clock3 size={28} />

          </div>

          <div>

            <h2>

              {

                pendingComplaints

              }

            </h2>

            <p>

              Pending

            </p>

          </div>

        </div>

        {/* IN PROGRESS */}

        <div className="worker-card">

          <div className="worker-icon progress">

            <AlertTriangle size={28} />

          </div>

          <div>

            <h2>

              {

                progressComplaints

              }

            </h2>

            <p>

              In Progress

            </p>

          </div>

        </div>

        {/* COMPLETED */}

        <div className="worker-card">

          <div className="worker-icon completed">

            <CheckCircle2 size={28} />

          </div>

          <div>

            <h2>

              {

                completedComplaints

              }

            </h2>

            <p>

              Completed

            </p>

          </div>

        </div>

      </div>

      {/* ====================== */}
      {/* FILTER ROW */}
      {/* ====================== */}

      <div className="worker-filter-row">

        {/* SEARCH */}

        <div className="worker-search">

          <Search size={18} />

          <input

            type="text"

            placeholder="Search complaints..."

            value={search}

            onChange={(e) =>

              setSearch(
                e.target.value
              )

            }

          />

        </div>

        {/* FILTER */}

        <div className="worker-filter">

          <Filter size={18} />

          <select

            value={statusFilter}

            onChange={(e) =>

              setStatusFilter(
                e.target.value
              )

            }

          >

            <option value="All">

              All Status

            </option>

            <option value="Pending">

              Pending

            </option>

            <option value="In Progress">

              In Progress

            </option>

            <option value="Completed">

              Completed

            </option>

          </select>

        </div>

      </div>

      {/* ====================== */}
      {/* TABLE */}
      {/* ====================== */}

      <div className="worker-table-box">

        <div className="worker-table-header">

          <h2>

            Complaint Requests

          </h2>

        </div>

        <div className="worker-table-wrapper">

          <table className="worker-table">

            <thead>

              <tr>

                <th>

                  Complaint ID

                </th>

                <th>

                  Student

                </th>

                <th>

                  Hostel

                </th>

                <th>

                  Room

                </th>

                <th>

                  Category

                </th>

                <th>

                  Status

                </th>

                <th>

                  Action

                </th>

              </tr>

            </thead>

            <tbody>

              {

                filteredComplaints.length > 0

                ?

                filteredComplaints.map(

                  (
                    item,
                    index
                  ) => (

                    <tr key={index}>

                      {/* ID */}

                      <td>

                        {

                          item.complaintId

                        }

                      </td>

                      {/* STUDENT */}

                      <td>

                        {

                          item.studentName

                        }

                      </td>

                      {/* HOSTEL */}

                      <td>

                        {

                          item.hostel

                        }

                      </td>

                      {/* ROOM */}

                      <td>

                        {

                          item.room

                        }

                      </td>

                      {/* CATEGORY */}

                      <td>

                        {

                          item.category

                        }

                      </td>

                      {/* STATUS */}

                      <td>

                        <span

                          className={`worker-status ${

                            item.status ===
                            "Completed"

                            ? "completed-status"

                            : item.status ===
                              "In Progress"

                            ? "progress-status"

                            : "pending-status"

                          }`}

                        >

                          {

                            item.status

                          }

                        </span>

                      </td>

                      {/* ACTION */}

                      <td>

                        {

                          item.status ===
                          "Pending"

                          ?

                          <button

                            className="accept-btn"

                            onClick={() =>

                              acceptComplaint(
                                item._id
                              )

                            }

                          >

                            Accept

                          </button>

                          :

                          item.status ===
                          "In Progress"

                          ?

                          <button

                            className="complete-btn"

                            onClick={() =>

                              completeComplaint(
                                item._id
                              )

                            }

                          >

                            Complete

                          </button>

                          :

                          <span className="completed-text">

                            Completed

                          </span>

                        }

                      </td>

                    </tr>

                  )

                )

                :

                <tr>

                  <td

                    colSpan="7"

                    className="empty-worker"

                  >

                    No complaints available

                  </td>

                </tr>

              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

};

export default WorkerDashboard;