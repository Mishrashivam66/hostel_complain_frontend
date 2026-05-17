import { useEffect, useState } from "react";

import StudentLayout from "../../layouts/StudentLayout";

import API from "../../services/api";

import "./Student.css";

const Notifications = () => {
  // =====================================
  // STATE
  // =====================================

  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(true);

  // =====================================
  // FETCH NOTIFICATIONS
  // =====================================

  const fetchNotifications = async () => {
    try {
      const res = await API.get("/notifications");

      console.log(res.data);

      setNotifications(res.data.notifications || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // MARK READ
  // =====================================

  const markAsRead = async (id) => {
    try {
      await API.put(`/notifications/read/${id}`);

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
    } catch (error) {
      console.log(error);
    }
  };

  // =====================================
  // USE EFFECT
  // =====================================

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <StudentLayout>
      <div className="student-page">
        {/* ===================================== */}
        {/* HEADER */}
        {/* ===================================== */}

        <div className="student-header">
          <h1>Notifications</h1>

          <p>Complaint updates and alerts</p>
        </div>

        {/* ===================================== */}
        {/* LOADING */}
        {/* ===================================== */}

        {loading && <div className="empty-box">Loading notifications...</div>}

        {/* ===================================== */}
        {/* EMPTY */}
        {/* ===================================== */}

        {!loading && notifications.length === 0 && (
          <div className="empty-box">No notifications found</div>
        )}

        {/* ===================================== */}
        {/* LIST */}
        {/* ===================================== */}

        {notifications.length > 0 && (
          <div className="notification-list">
            {notifications.map((item) => (
              <div
                key={item._id}
                className={`notification-card ${
                  item.isRead ? "read" : "unread"
                }`}
              >
                {/* ICON */}

                <div className="notification-icon">
                  {item.type === "completed"
                    ? "✅"
                    : item.type === "accepted"
                      ? "🛠️"
                      : item.type === "escalated"
                        ? "⚠️"
                        : item.type === "progress"
                          ? "🚧"
                          : "🔔"}
                </div>

                {/* CONTENT */}

                <div className="notification-content">
                  <h3>{item.title}</h3>

                  <p>{item.message}</p>

                  <span>{new Date(item.createdAt).toLocaleString()}</span>
                </div>

                {/* MARK READ */}

                {!item.isRead && (
                  <button
                    className="mark-read-btn"
                    onClick={() => markAsRead(item._id)}
                  >
                    Mark Read
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default Notifications;
