import { Routes, Route } from "react-router-dom";

// AUTH

import Login from "./pages/auth/Login";

import Register from "./pages/auth/Register";

// STUDENT

import Dashboard from "./pages/student/Dashboard";

import CreateComplaint from "./pages/student/CreateComplaint";

import MyComplaints from "./pages/student/MyComplaints";

import ComplaintDetails from "./pages/student/ComplaintDetails";

import Profile from "./pages/student/Profile";
import EditProfile from "./pages/student/EditProfile";

import Notifications from "./pages/student/Notifications";

import Settings from "./pages/student/Settings";
// WORKER

import WorkerDashboard from "./pages/worker/WorkerDashboard";

// ADMIN
import AdminDashboard from "./pages/admin/AdminDashboard";
import OverdueComplaints from "./pages/admin/OverdueComplaints";
import AdminComplaints from "./pages/admin/AdminComplaints";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminWorkers from "./pages/admin/AdminWorkers";

import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminApprovals from "./pages/admin/AdminApprovals";
function App() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* STUDENT */}
      <Route path="/student/dashboard" element={<Dashboard />} />
      <Route path="/student/create-complaint" element={<CreateComplaint />} />
      <Route path="/student/my-complaints" element={<MyComplaints />} />
      <Route
        path="/student/complaint-details/:id"
        element={<ComplaintDetails />}
      />
      <Route path="/student/profile" element={<Profile />} />
      <Route path="/student/edit-profile" element={<EditProfile />} />
      <Route path="/student/notifications" element={<Notifications />} />
      <Route path="/student/settings" element={<Settings />} />
      {/* WORKER */}
      <Route path="/worker/dashboard" element={<WorkerDashboard />} />
      {/* ADMIN */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />{" "}
      <Route path="/admin/overdue" element={<OverdueComplaints />} />
      <Route path="/admin/complaints" element={<AdminComplaints />} />
      <Route path="/admin/students" element={<AdminStudents />} />
      <Route path="/admin/workers" element={<AdminWorkers />} />
      <Route path="/admin/notifications" element={<AdminNotifications />} />
      <Route path="/admin/approvals" element={<AdminApprovals />} />
    </Routes>
  );
}

export default App;
