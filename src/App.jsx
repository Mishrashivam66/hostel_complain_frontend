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

      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
