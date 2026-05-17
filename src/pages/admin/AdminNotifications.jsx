import { Bell } from "lucide-react";

import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import API from "../../services/api";

import "./Admin.css";

const AdminNotifications = () => {
  // ======================
  // STATES
  // ======================

  const [notifications, setNotifications] = useState([]);

  // ======================
  // FETCH
  // ======================

  const fetchNotifications = async () => {
    try {
      const res = await API.get("/admin/notifications");

      setNotifications(res.data.notifications || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ======================
  // MARK AS READ
  // ======================

  const markAsRead = async (id) => {
    try {
      const res = await API.put(`/notifications/read/${id}`);

      console.log(res.data);

      // UPDATE UI

      setNotifications(
        notifications.map((item) =>
          item._id === id
            ? {
                ...item,

                isRead: true,
              }
            : item,
        ),
      );

      // UPDATE BELL COUNT

      setUnreadCount((prev) => (prev > 0 ? prev - 1 : 0));
    } catch (error) {
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
          <h1>Notifications</h1>

          <p>Manage all admin notifications</p>
        </div>

        {/* ====================== */}
        {/* LIST */}
        {/* ====================== */}

        <div className="admin-section">
          {notifications.length > 0 ? (
            notifications.map((item, index) => (
              <div
                key={index}
                className={`notification-card ${
                  item.isRead ? "read-notification" : ""
                }`}
              >
                {/* LEFT */}

                <div className="notification-left">
                  <div className="notification-icon">
                    <Bell size={20} />
                  </div>

                  <div>
                    <h3>{item.title}</h3>

                    <p>{item.message}</p>
                  </div>
                </div>

                {/* RIGHT */}

                {!item.isRead && (
                  <button
                    className="mark-read-btn"
                    onClick={() => markAsRead(item._id)}
                  >
                    Mark Read
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="empty-table">No notifications found</div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNotifications;
