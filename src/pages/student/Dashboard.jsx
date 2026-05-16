import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Activity,
} from "lucide-react";

import StudentLayout from "../../layouts/StudentLayout";

import StatCard from "../../components/cards/StatCard";

import "./Student.css";

const Dashboard = () => {

  // ======================
  // RECENT ACTIVITY
  // ======================

  const activities = [

    {

      title:
        "Electrical Complaint Submitted",

      time:
        "2 Hours Ago",

    },

    {

      title:
        "Worker Assigned",

      time:
        "5 Hours Ago",

    },

    {

      title:
        "Complaint Resolved",

      time:
        "Yesterday",

    },

  ];

  return (

    <StudentLayout>

      <div className="student-page">

        {/* HEADER */}

        <div className="student-header">

          <h1>

            Dashboard

          </h1>

          <p>

            Monitor complaints,
            activities and hostel
            updates

          </p>

        </div>

        {/* STATS */}

        <div className="stats-grid">

          <StatCard
            title="Total Complaints"
            value="15"
            color="#3b82f6"
            icon={
              <ClipboardList
                size={22}
              />
            }
          />

          <StatCard
            title="Pending"
            value="4"
            color="#f59e0b"
            icon={
              <Clock3 size={22} />
            }
          />

          <StatCard
            title="Completed"
            value="9"
            color="#10b981"
            icon={
              <CheckCircle2
                size={22}
              />
            }
          />

          <StatCard
            title="Escalated"
            value="2"
            color="#ef4444"
            icon={
              <AlertTriangle
                size={22}
              />
            }
          />

        </div>

        {/* DASHBOARD GRID */}

        <div className="dashboard-grid">

          {/* RECENT COMPLAINTS */}

          <div className="dashboard-card">

            <div className="dashboard-card-top">

              <h2>

                Recent Complaints

              </h2>

              <TrendingUp size={22} />

            </div>

            {/* ITEM */}

            <div className="recent-item">

              <div>

                <h4>

                  Electrical Issue

                </h4>

                <p>

                  Room G1A

                </p>

              </div>

              <span className="pending">

                Pending

              </span>

            </div>

            {/* ITEM */}

            <div className="recent-item">

              <div>

                <h4>

                  Plumbing Issue

                </h4>

                <p>

                  Room 2B

                </p>

              </div>

              <span className="completed">

                Completed

              </span>

            </div>

            {/* ITEM */}

            <div className="recent-item">

              <div>

                <h4>

                  WiFi Complaint

                </h4>

                <p>

                  Room 3C

                </p>

              </div>

              <span className="escalated">

                Escalated

              </span>

            </div>

          </div>

          {/* ACTIVITY */}

          <div className="dashboard-card">

            <div className="dashboard-card-top">

              <h2>

                Recent Activity

              </h2>

              <Activity size={22} />

            </div>

            {activities.map(

              (item, index) => (

                <div
                  key={index}
                  className="activity-item"
                >

                  <div className="activity-dot"></div>

                  <div>

                    <h4>

                      {item.title}

                    </h4>

                    <p>

                      {item.time}

                    </p>

                  </div>

                </div>

              )

            )}

          </div>

        </div>

      </div>

    </StudentLayout>

  );

};

export default Dashboard;