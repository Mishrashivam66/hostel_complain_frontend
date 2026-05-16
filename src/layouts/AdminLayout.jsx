import {
  LayoutDashboard,
  Users,
  UserCog,
  ClipboardList,
  Bell,
  LogOut,
} from "lucide-react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

import "./AdminLayout.css";

const AdminLayout = ({

  children,

}) => {

  // ======================
  // LOCATION
  // ======================

  const location =
    useLocation();

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

  // ======================
  // STATES
  // ======================

  const [

    unreadCount,

    setUnreadCount,

  ] = useState(0);

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

        const unread =

          res.data.notifications
          .filter(

            (item) =>

              !item.isRead

          ).length;

        setUnreadCount(
          unread
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

  // ======================
  // LOGOUT
  // ======================

  const handleLogout =
    () => {

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      navigate("/login");

    };

  // ======================
  // MENU ITEMS
  // ======================

  const menuItems = [

    {

      name:
        "Dashboard",

      icon:
        <LayoutDashboard size={20} />,

      path:
        "/admin/dashboard",

    },

    {

      name:
        "Approvals",

      icon:
        <Users size={20} />,

      path:
        "/admin/approvals",

    },

    {

      name:
        "Students",

      icon:
        <Users size={20} />,

      path:
        "/admin/students",

    },

    {

      name:
        "Workers",

      icon:
        <UserCog size={20} />,

      path:
        "/admin/workers",

    },

    {

      name:
        "Complaints",

      icon:
        <ClipboardList size={20} />,

      path:
        "/admin/complaints",

    },

    {

      name:
        "Notifications",

      icon:
        <Bell size={20} />,

      path:
        "/admin/notifications",

    },

  ];

  return (

    <div className="admin-layout">

      {/* ====================== */}
      {/* SIDEBAR */}
      {/* ====================== */}

      <div className="admin-sidebar">

        <div className="admin-logo">

          <h2>

            Hostel Admin

          </h2>

        </div>

        {/* MENU */}

        <div className="admin-menu">

          {

            menuItems.map(

              (
                item,
                index
              ) => (

                <Link

                  key={index}

                  to={item.path}

                  className={`admin-menu-item ${

                    location.pathname ===
                    item.path

                    ? "active-admin"

                    : ""

                  }`}

                >

                  {item.icon}

                  <span>

                    {item.name}

                  </span>

                </Link>

              )

            )

          }

        </div>

        {/* LOGOUT */}

        <button

          className="logout-btn"

          onClick={handleLogout}

        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

      {/* ====================== */}
      {/* MAIN */}
      {/* ====================== */}

      <div className="admin-main">

        {/* TOPBAR */}

        <div className="admin-topbar">

          {/* LEFT */}

          <div>

            <h1>

              Admin Dashboard

            </h1>

            <p>

              Welcome back,
              {

                user?.name

              }

            </p>

          </div>

          {/* RIGHT */}

          <div className="admin-top-right">

            {/* NOTIFICATION */}

            <Link

              to="/admin/notifications"

              className="notification-box"

            >

              <Bell size={22} />

              {

                unreadCount > 0 && (

                  <span className="notification-count">

                    {

                      unreadCount

                    }

                  </span>

                )

              }

            </Link>

            {/* PROFILE */}

            <div className="admin-profile">

              {

                user?.name
                ?.charAt(0)

              }

            </div>

          </div>

        </div>

        {/* CONTENT */}

        <div className="admin-content">

          {

            children

          }

        </div>

      </div>

    </div>

  );

};

export default AdminLayout;