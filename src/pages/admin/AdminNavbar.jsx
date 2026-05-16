import {

  Bell,

} from "lucide-react";

import {

  useNavigate,

} from "react-router-dom";

const AdminNavbar = () => {

  const navigate =
    useNavigate();

  // ======================
  // USER
  // ======================

  const user =
    JSON.parse(

      localStorage.getItem(
        "user"
      )

    );

  return (

    <div className="navbar">

      {/* LEFT */}

      <div className="navbar-left">

        <h1>

          Admin Dashboard

        </h1>

        <p>

          Welcome back,
          {" "}

          {

            user?.firstName

            ||

            user?.name

          }

        </p>

      </div>

      {/* RIGHT */}

      <div className="navbar-right">

        {/* NOTIFICATION */}

        <button

          className="notification-btn"

          onClick={() =>

            navigate(

              "/admin/notifications"

            )

          }

        >

          <Bell size={20} />

          <span className="notification-dot">

            3

          </span>

        </button>

        {/* PROFILE */}

        <div className="navbar-profile">

          {

            user?.firstName

              ? user.firstName
                  .charAt(0)

              : user?.name
                  ?.charAt(0)

          }

        </div>

      </div>

    </div>

  );

};

export default AdminNavbar;