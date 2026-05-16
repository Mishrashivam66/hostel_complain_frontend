import {

  useEffect,

  useState

} from "react";

import {

  Menu,

  X,

} from "lucide-react";

import Sidebar from "../components/sidebar/Sidebar";

import Navbar from "../components/navbar/Navbar";

import API from "../services/api";

import "./StudentLayout.css";

const StudentLayout = ({

  children,

}) => {

  // ======================
  // MOBILE MENU
  // ======================

  const [mobileMenu,
    setMobileMenu] =
    useState(false);

  // ======================
  // NOTIFICATIONS
  // ======================

  const [notifications,
    setNotifications] =
    useState([]);

  // ======================
  // FETCH NOTIFICATIONS
  // ======================

  const fetchNotifications =
    async () => {

      try {

        const res =
          await API.get(

            "/notifications"

          );

        setNotifications(

          res.data.notifications

        );

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

    <div className="layout">

      {/* ====================== */}
      {/* MOBILE OVERLAY */}
      {/* ====================== */}

      {mobileMenu && (

        <div

          className="mobile-overlay"

          onClick={() =>

            setMobileMenu(false)

          }

        ></div>

      )}

      {/* ====================== */}
      {/* SIDEBAR */}
      {/* ====================== */}

      <div

        className={`sidebar-wrapper ${

          mobileMenu

            ? "show-sidebar"

            : ""

        }`}

      >

        <Sidebar

          setMobileMenu={

            setMobileMenu

          }

        />

      </div>

      {/* ====================== */}
      {/* MAIN CONTENT */}
      {/* ====================== */}

      <div className="main-content">

        {/* ====================== */}
        {/* MOBILE TOPBAR */}
        {/* ====================== */}

        <div className="mobile-topbar">

          {/* MENU BUTTON */}

          <button

            className="menu-btn"

            onClick={() =>

              setMobileMenu(

                !mobileMenu

              )

            }

          >

            {

              mobileMenu

                ? <X size={28} />

                : <Menu size={28} />

            }

          </button>

          {/* LOGO */}

          <h1>

            AMITY ERP

          </h1>

        </div>

        {/* ====================== */}
        {/* NAVBAR */}
        {/* ====================== */}

        <Navbar

          notifications={

            notifications

          }

        />

        {/* ====================== */}
        {/* PAGE CONTENT */}
        {/* ====================== */}

        <div className="page-content">

          {children}

        </div>

      </div>

    </div>

  );

};

export default StudentLayout;