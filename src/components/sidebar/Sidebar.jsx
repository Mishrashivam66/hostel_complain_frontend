import "./Sidebar.css";
git branch -M maingit
import {
  LayoutDashboard,
  FilePlus2,
  ClipboardList,
  User,
  Bell,
  LogOut,
} from "lucide-react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";


import {
  Settings as SettingsIcon,
} from "lucide-react";

const Sidebar = ({

  setMobileMenu,

}) => {

  const navigate = useNavigate();

  const location = useLocation();

  // ======================
  // HANDLE NAVIGATION
  // ======================

  const handleNavigate = (

    path

  ) => {

    navigate(path);

    // MOBILE MENU CLOSE

    if (window.innerWidth < 900) {

      setMobileMenu(false);

    }

  };

  // ======================
  // HANDLE LOGOUT
  // ======================

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/");

  };

  return (

    <div className="sidebar">

      {/* TOP */}

      <div>

        {/* LOGO */}

        <h1 className="sidebar-logo">

          AMITY ERP

        </h1>

        {/* MENU */}

        <div className="sidebar-menu">

          {/* DASHBOARD */}

          <button

            onClick={() =>
              handleNavigate(
                "/student/dashboard"
              )
            }

            className={`sidebar-item ${
              location.pathname ===
              "/student/dashboard"
                ? "active"
                : ""
            }`}
          >

            <LayoutDashboard size={20} />

            Dashboard

          </button>

          {/* CREATE COMPLAINT */}

          <button

            onClick={() =>
              handleNavigate(
                "/student/create-complaint"
              )
            }

            className={`sidebar-item ${
              location.pathname ===
              "/student/create-complaint"
                ? "active"
                : ""
            }`}
          >

            <FilePlus2 size={20} />

            Create Complaint

          </button>

          {/* MY COMPLAINTS */}

          <button

            onClick={() =>
              handleNavigate(
                "/student/my-complaints"
              )
            }

            className={`sidebar-item ${
              location.pathname ===
              "/student/my-complaints"
                ? "active"
                : ""
            }`}
          >

            <ClipboardList size={20} />

            My Complaints

          </button>

          {/* NOTIFICATIONS */}

          <button

            onClick={() =>
              handleNavigate(
                "/student/notifications"
              )
            }

            className={`sidebar-item ${
              location.pathname ===
              "/student/notifications"
                ? "active"
                : ""
            }`}
          >

            <Bell size={20} />

            Notifications

          </button>




          {/* SETTINGS */}

<button

  onClick={() =>
    handleNavigate(
      "/student/settings"
    )
  }

  className={`sidebar-item ${
    location.pathname ===
    "/student/settings"
      ? "active"
      : ""
  }`}
>

  <SettingsIcon size={20} />

  Settings

</button>

          {/* PROFILE */}

          <button

            onClick={() =>
              handleNavigate(
                "/student/profile"
              )
            }

            className={`sidebar-item ${
              location.pathname ===
              "/student/profile"
                ? "active"
                : ""
            }`}
          >

            <User size={20} />

            Profile

          </button>

        </div>

      </div>

      {/* LOGOUT */}

      <button
        onClick={handleLogout}
        className="sidebar-logout"
      >

        <LogOut size={20} />

        Logout

      </button>

    </div>

  );

};

export default Sidebar;