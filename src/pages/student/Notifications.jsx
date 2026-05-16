import StudentLayout from "../../layouts/StudentLayout";

import "./Student.css";

const Notifications = () => {

  // ======================
  // DUMMY DATA
  // ======================

  const notifications = [

    {

      id: 1,

      type: "info",

      title:
        "Complaint Assigned",

      message:
        "Electrician assigned for room 204 issue.",

      time:
        "2 minutes ago",

    },

    {

      id: 2,

      type: "success",

      title:
        "Complaint Completed",

      message:
        "Plumbing complaint resolved successfully.",

      time:
        "1 hour ago",

    },

    {

      id: 3,

      type: "warning",

      title:
        "New Announcement",

      message:
        "Hostel maintenance scheduled this weekend.",

      time:
        "Today",

    },

  ];

  return (

    <StudentLayout>

      <div className="student-page">

        {/* HEADER */}

        <div className="student-header">

          <h1>

            Notifications

          </h1>

          <p>

            Latest complaint updates
            and announcements

          </p>

        </div>

        {/* LIST */}

        <div className="notification-list">

          {notifications.map(

            (item) => (

              <div

                key={item.id}

                className={`notification-card ${

                  item.type

                }`}

              >

                {/* ICON */}

                <div className="notification-icon">

                  {

                    item.type ===
                    "success"

                      ? "✅"

                      : item.type ===
                        "warning"

                      ? "⚠️"

                      : "🔔"

                  }

                </div>

                {/* CONTENT */}

                <div className="notification-content">

                  <h3>

                    {item.title}

                  </h3>

                  <p>

                    {item.message}

                  </p>

                  <span>

                    {item.time}

                  </span>

                </div>

              </div>

            )

          )}

        </div>

      </div>

    </StudentLayout>

  );

};

export default Notifications;