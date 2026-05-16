import {
  ClipboardList,
  CheckCircle2,
  AlertTriangle,
  Users,
  UserCog,
  Clock3,
  ArrowUpRight,
  Building2,
  BarChart3,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import AdminLayout from "../../layouts/AdminLayout";

import API from "../../services/api";

import "./Admin.css";

const AdminDashboard = () => {

  // ======================
  // STATES
  // ======================

  const [
    hostelStudents,
    setHostelStudents,
  ] = useState([]);

  const [
    hostelComplaints,
    setHostelComplaints,
  ] = useState([]);

  const [
    dashboardStats,
    setDashboardStats,
  ] = useState({});

  const [
    overdueComplaints,
    setOverdueComplaints,
  ] = useState([]);

  // ======================
  // FETCH ANALYTICS
  // ======================

  const fetchAnalytics =
    async () => {

      try {

        const studentRes =
          await API.get(
            "/admin/hostel-students"
          );

        const complaintRes =
          await API.get(
            "/admin/hostel-complaints"
          );

        const statsRes =
          await API.get(
            "/admin/dashboard-stats"
          );

        const overdueRes =
          await API.get(
            "/admin/overdue-complaints"
          );

        setHostelStudents(
          studentRes.data.stats || []
        );

        setHostelComplaints(
          complaintRes.data.stats || []
        );

        setDashboardStats(
          statsRes.data.stats || {}
        );

        setOverdueComplaints(
          overdueRes.data.complaints || []
        );

      }

      catch (error) {

        console.log(error);

      }

    };

  // ======================
  // USE EFFECT
  // ======================

  useEffect(() => {

    fetchAnalytics();

  }, []);

  // ======================
  // STATS
  // ======================

  const stats = [

    {
      title:
        "Total Complaints",

      value:
        dashboardStats?.totalComplaints || 0,

      icon:
        <ClipboardList size={30} />,
    },

    {
      title:
        "Completed",

      value:
        dashboardStats?.completedComplaints || 0,

      icon:
        <CheckCircle2 size={30} />,
    },

    {
      title:
        "Pending",

      value:
        dashboardStats?.pendingComplaints || 0,

      icon:
        <Clock3 size={30} />,
    },

    {
      title:
        "Overdue",

      value:
        dashboardStats?.overdueComplaints || 0,

      icon:
        <AlertTriangle size={30} />,
    },

    {
      title:
        "Students",

      value:
        dashboardStats?.totalStudents || 0,

      icon:
        <Users size={30} />,
    },

    {
      title:
        "Workers",

      value:
        dashboardStats?.totalWorkers || 0,

      icon:
        <UserCog size={30} />,
    },

  ];

  return (

    <AdminLayout>

      <div className="admin-page">

        {/* ====================== */}
        {/* HEADER */}
        {/* ====================== */}

        <div className="admin-header">

          <h1>

            Admin Dashboard

          </h1>

          <p>

            Monitor complaints,
            hostel analytics and
            system activity in real-time

          </p>

        </div>

        {/* ====================== */}
        {/* MAIN STATS */}
        {/* ====================== */}

        <div className="admin-stats-grid">

          {

            stats.map(

              (
                item,
                index
              ) => (

                <div
                  key={index}
                  className="admin-stat-card"
                >

                  <div className="admin-stat-icon">

                    {item.icon}

                  </div>

                  <div className="admin-stat-content">

                    <h2>

                      {item.value}

                    </h2>

                    <p>

                      {item.title}

                    </p>

                  </div>

                  <ArrowUpRight
                    className="stat-arrow"
                    size={22}
                  />

                </div>

              )

            )

          }

        </div>

        {/* ====================== */}
        {/* HOSTEL ANALYTICS */}
        {/* ====================== */}

        <div className="admin-section">

          <div className="admin-section-header">

            <div>

              <h2>

                Hostel Analytics

              </h2>

              <p>

                Hostel-wise students
                and complaint tracking

              </p>

            </div>

          </div>

          <div className="admin-stats-grid">

            {

              hostelStudents.map(

                (
                  item,
                  index
                ) => (

                  <div
                    key={index}
                    className="admin-stat-card"
                  >

                    <div className="admin-stat-icon">

                      <Building2 size={30} />

                    </div>

                    <div className="admin-stat-content">

                      <h2>

                        {

                          item.totalStudents

                        }

                      </h2>

                      <p>

                        {

                          item._id

                        } Students

                      </p>

                    </div>

                  </div>

                )

              )

            }

            {

              hostelComplaints.map(

                (
                  item,
                  index
                ) => (

                  <div
                    key={index}
                    className="admin-stat-card"
                  >

                    <div className="admin-stat-icon">

                      <BarChart3 size={30} />

                    </div>

                    <div className="admin-stat-content">

                      <h2>

                        {

                          item.totalComplaints

                        }

                      </h2>

                      <p>

                        {

                          item._id

                        } Complaints

                      </p>

                    </div>

                  </div>

                )

              )

            }

          </div>

        </div>

        {/* ====================== */}
        {/* INSIGHTS */}
        {/* ====================== */}

        <div className="admin-section">

          <div className="admin-section-header">

            <div>

              <h2>

                Complaint Insights

              </h2>

              <p>

                Daily and monthly
                complaint monitoring

              </p>

            </div>

          </div>

          <div className="admin-stats-grid">

            <div className="admin-stat-card">

              <div className="admin-stat-icon">

                <Clock3 size={30} />

              </div>

              <div className="admin-stat-content">

                <h2>

                  {

                    dashboardStats?.todayComplaints || 0

                  }

                </h2>

                <p>

                  Today's Complaints

                </p>

              </div>

            </div>

            <div className="admin-stat-card">

              <div className="admin-stat-icon">

                <BarChart3 size={30} />

              </div>

              <div className="admin-stat-content">

                <h2>

                  {

                    dashboardStats?.monthlyComplaints || 0

                  }

                </h2>

                <p>

                  Monthly Complaints

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ====================== */}
        {/* OVERDUE TABLE */}
        {/* ====================== */}

        <div className="admin-section">

          <div className="admin-section-header">

            <div>

              <h2>

                Overdue Complaints

              </h2>

              <p>

                Complaints delayed
                more than 24 hours

              </p>

            </div>

          </div>

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>

                <tr>

                  <th>ID</th>

                  <th>Student</th>

                  <th>Hostel</th>

                  <th>Category</th>

                  <th>Status</th>

                </tr>

              </thead>

              <tbody>

                {

                  overdueComplaints.length > 0

                  ?

                  overdueComplaints.map(

                    (
                      item,
                      index
                    ) => (

                      <tr key={index}>

                        <td>

                          {

                            item.complaintId

                          }

                        </td>

                        <td>

                          {

                            item.studentName

                          }

                        </td>

                        <td>

                          {

                            item.hostel

                          }

                        </td>

                        <td>

                          {

                            item.category

                          }

                        </td>

                        <td>

                          <span
                            className="status-badge status-pending"
                          >

                            {

                              item.status

                            }

                          </span>

                        </td>

                      </tr>

                    )

                  )

                  :

                  <tr>

                    <td
                      colSpan="5"
                      className="empty-table"
                    >

                      No overdue complaints

                    </td>

                  </tr>

                }

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </AdminLayout>

  );

};

export default AdminDashboard;