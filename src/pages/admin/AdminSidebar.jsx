import {
  LayoutDashboard,
  ShieldCheck,
  ClipboardList,
  AlertTriangle,
  Users,
  Bell,
  LogOut,
  UserCog,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

const AdminSidebar = ({ setMobileMenu }) => {
  const navigate = useNavigate();

  // ======================
  // LOGOUT
  // ======================

  const handleLogout = () => {
    localStorage.clear();

    navigate("/login");
  };

  // ======================
  // CLOSE MOBILE MENU
  // ======================

  const closeMenu = () => {
    if (window.innerWidth < 900) {
      setMobileMenu(false);
    }
  };

  return (
    <div className="sidebar">
      {/* TOP */}

      <div>
        {/* LOGO */}

        <h1 className="sidebar-logo">ADMIN ERP</h1>

        {/* MENU */}

        <div className="sidebar-menu">
          {/* DASHBOARD */}

          <NavLink
            to="/admin/dashboard"
            className="sidebar-item"
            onClick={closeMenu}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          {/* COMPLAINTS */}

          <NavLink
            to="/admin/complaints"
            className="sidebar-item"
            onClick={closeMenu}
          >
            <ClipboardList size={20} />
            Complaints
          </NavLink>

          {/* OVERDUE */}

          <NavLink
            to="/admin/overdue"
            className="sidebar-item"
            onClick={closeMenu}
          >
            <AlertTriangle size={20} />
            Overdue
          </NavLink>

          {/* STUDENTS */}

          <NavLink
            to="/admin/students"
            className="sidebar-item"
            onClick={closeMenu}
          >
            <Users size={20} />
            Students
          </NavLink>

          {/* WORKERS */}

          <NavLink
            to="/admin/workers"
            className="sidebar-item"
            onClick={closeMenu}
          >
            <UserCog size={20} />
            Workers
          </NavLink>

          {/* APPROVALS */}

          <NavLink
            to="/admin/approvals"
            className="sidebar-item"
            onClick={closeMenu}
          >
            <ShieldCheck size={20} />
            Approvals
          </NavLink>

          {/* NOTIFICATIONS */}

          <NavLink
            to="/admin/notifications"
            className="sidebar-item"
            onClick={closeMenu}
          >
            <Bell size={20} />
            Notifications
          </NavLink>
        </div>
      </div>

      {/* LOGOUT */}

      <button className="sidebar-logout" onClick={handleLogout}>
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
