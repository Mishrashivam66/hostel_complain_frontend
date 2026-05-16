import {

  Bell,

} from "lucide-react";

import {

  useNavigate

} from "react-router-dom";

const Navbar = ({

  notifications = []

}) => {

  const navigate =
    useNavigate();

  const user = JSON.parse(

    localStorage.getItem("user")

  );

  return (

    <div className="navbar">

      {/* LEFT */}

      <div className="navbar-left">

        <h1>

          Student Dashboard

        </h1>

        <p>

          Welcome back,
          {

            user?.firstName ||

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

              "/student/notifications"

            )

          }

        >

          <Bell size={20} />

          {

            notifications?.filter(

              (n) => !n.isRead

            ).length > 0 && (

              <span className="notification-dot">

                {

                  notifications?.filter(

                    (n) => !n.isRead

                  ).length

                }

              </span>

            )

          }

        </button>

        {/* PROFILE */}

        <div className="navbar-profile">

          {

            user?.firstName

              ? user.firstName.charAt(0)

              : user?.name?.charAt(0)

          }

        </div>

      </div>

    </div>

  );

};

export default Navbar;