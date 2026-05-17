import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Activity,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import StudentLayout from "../../layouts/StudentLayout";

import StatCard from "../../components/cards/StatCard";

import API from "../../services/api";

import "./Student.css";

const Dashboard = () => {

  // ======================
  // STATES
  // ======================

  const [
    complaints,
    setComplaints,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

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

          res.data.complaints || []

        );

      }

      catch (error) {

        console.log(error);

      }

      finally {

        setLoading(false);

      }

    };

  // ======================
  // USE EFFECT
  // ======================

  useEffect(() => {

    fetchComplaints();

  }, []);

  return (

    <StudentLayout>

      <div className="student-page">

        {/* ====================== */}
        {/* HEADER */}
        {/* ====================== */}

        <div className="student-header">

          <h1>

            Dashboard

          </h1>

          <p>

            Monitor complaints, workers and hostel updates

          </p>

        </div>

        {/* ====================== */}
        {/* STATS */}
        {/* ====================== */}

        <div className="stats-grid">

          {/* PENDING */}

          <StatCard

            title="Pending"

            value={

              complaints.filter(

                (item) =>

                  item.status ===
                  "Pending"

              ).length

            }

            color="#f59e0b"

            icon={
              <Clock3 size={22} />
            }

          />

          {/* IN PROGRESS */}

          <StatCard

            title="In Progress"

            value={

              complaints.filter(

                (item) =>

                  item.status ===
                  "In Progress"

              ).length

            }

            color="#3b82f6"

            icon={
              <ClipboardList size={22} />
            }

          />

          {/* COMPLETED */}

          <StatCard

            title="Completed"

            value={

              complaints.filter(

                (item) =>

                  item.status ===
                  "Completed"

              ).length

            }

            color="#10b981"

            icon={
              <CheckCircle2 size={22} />
            }

          />

          {/* ESCALATED */}

          <StatCard

            title="Escalated"

            value={

              complaints.filter(

                (item) =>

                  item.isEscalated

              ).length

            }

            color="#ef4444"

            icon={
              <AlertTriangle size={22} />
            }

          />

        </div>

        {/* ====================== */}
        {/* DASHBOARD GRID */}
        {/* ====================== */}

        <div className="dashboard-grid">

          {/* ====================== */}
          {/* RECENT COMPLAINTS */}
          {/* ====================== */}

          <div className="dashboard-card">

            <div className="dashboard-card-top">

              <h2>

                Recent Complaints

              </h2>

              <TrendingUp size={22} />

            </div>

            {

              loading

              ?

              <div className="empty-dashboard">

                <h3>

                  Loading complaints...

                </h3>

              </div>

              :

              complaints.length > 0

              ?

              complaints

                .slice(0, 5)

                .map((item, index) => (

                  <div

                    className="recent-item"

                    key={index}

                  >

                    <div>

                      {/* CATEGORY */}

                      <h4>

                        {

                          item.category

                        }

                      </h4>

                      {/* ROOM */}

                      <p>

                        Room:
                        {

                          item.room

                        }

                      </p>

                      {/* WORKER */}

                      <p>

                        Worker:
                        {

                          item.assignedWorker

                          ||

                          "Not Assigned"

                        }

                      </p>

                      {/* DEADLINE */}

                      <p>

                        Deadline:

                        {

                          item.completionDeadline

                          ?

                          new Date(

                            item.completionDeadline

                          ).toLocaleString()

                          :

                          "-"

                        }

                      </p>

                    </div>

                    {/* STATUS */}

                    <span

                      className={

                        item.status ===
                        "Completed"

                        ?

                        "completed"

                        :

                        item.status ===
                        "In Progress"

                        ?

                        "assigned"

                        :

                        item.isEscalated

                        ?

                        "escalated"

                        :

                        "pending"

                      }

                    >

                      {

                        item.status

                      }

                    </span>

                  </div>

                ))

              :

              <div className="empty-dashboard">

                <h3>

                  No complaints yet 🚀

                </h3>

                <p>

                  Create your first hostel complaint

                </p>

              </div>

            }

          </div>

          {/* ====================== */}
          {/* RECENT ACTIVITY */}
          {/* ====================== */}

          <div className="dashboard-card">

            <div className="dashboard-card-top">

              <h2>

                Recent Activity

              </h2>

              <Activity size={22} />

            </div>

            {

              loading

              ?

              <div className="empty-dashboard">

                <h3>

                  Loading activity...

                </h3>

              </div>

              :

              complaints.length > 0

              ?

              complaints

                .slice(0, 5)

                .map((item, index) => (

                  <div

                    key={index}

                    className="activity-item"

                  >

                    <div className="activity-dot">

                    </div>

                    <div>

                      <h4>

                        {

                          item.category

                        }

                        {" "}
                        Complaint

                      </h4>

                      <p>

                        {

                          new Date(

                            item.createdAt

                          ).toLocaleString()

                        }

                      </p>

                    </div>

                  </div>

                ))

              :

              <div className="empty-dashboard">

                <h3>

                  No activity yet

                </h3>

              </div>

            }

          </div>

        </div>

      </div>

    </StudentLayout>

  );

};

export default Dashboard;