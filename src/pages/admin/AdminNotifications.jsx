import {
  Bell,
  AlertTriangle,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import AdminLayout from "../../layouts/AdminLayout";

import API from "../../services/api";

import "./Admin.css";

const AdminNotifications = () => {

  // ======================
  // STATES
  // ======================

  const [
    notifications,
    setNotifications,
  ] = useState([]);

  // ======================
  // FETCH NOTIFICATIONS
  // ======================

  const fetchNotifications =
    async () => {

      try {

        const res =
          await API.get(
            "/admin/notifications"
          );

        setNotifications(
          res.data.notifications || []
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

    fetchNotifications();

  }, []);

  return (

    <AdminLayout>

      <div className="admin-page">

        {/* ====================== */}
        {/* HEADER */}
        {/* ====================== */}

        <div className="admin-header">

          <h1>

            Notifications

          </h1>

          <p>

            Monitor overdue complaints
            and escalation alerts

          </p>

        </div>

        {/* ====================== */}
        {/* NOTIFICATIONS */}
        {/* ====================== */}

        <div className="notification-list">

          {

            notifications.length > 0

            ?

            notifications.map(

              (
                item,
                index
              ) => (

                <div

                  key={index}

                  className={`notification-card ${

                    item.isRead
                    ? "read-card"
                    : ""

                  }`}

                >

                  {/* ICON */}

                  <div className="notification-icon">

                    <AlertTriangle size={24} />

                  </div>

                  {/* CONTENT */}

                  <div className="notification-content">

                    <h3>

                      {

                        item.title

                      }

                    </h3>

                    <p>

                      {

                        item.message

                      }

                    </p>

                    <span className="notification-time">

                      {

                        new Date(

                          item.createdAt

                        ).toLocaleString()

                      }

                    </span>

                  </div>

                </div>

              )

            )

            :

            <div className="empty-notification">

              <Bell size={55} />

              <h2>

                No Notifications

              </h2>

            </div>

          }

        </div>

      </div>

    </AdminLayout>

  );

};

export default AdminNotifications;