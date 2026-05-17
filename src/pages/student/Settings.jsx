import { useState } from "react";

import StudentLayout from "../../layouts/StudentLayout";

import "./Student.css";

const Settings = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    name: user?.name || "",

    email: user?.email || "",

    password: "",
  });

  // ======================
  // HANDLE CHANGE
  // ======================

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // ======================
  // HANDLE SAVE
  // ======================

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Settings Updated");
  };

  return (
    <StudentLayout>
      <div className="student-page">
        {/* HEADER */}

        <div className="student-header">
          <h1>Settings</h1>

          <p>Manage your account settings</p>
        </div>

        {/* CARD */}

        <div className="settings-card">
          <form onSubmit={handleSubmit}>
            {/* NAME */}

            <div className="settings-group">
              <label>Full Name</label>
         <input type="email" value={user.name} disabled />
            </div>

            {/* EMAIL */}

            <div className="settings-group">
              <label>Email Address</label>
              <input type="email" value={user.email} disabled />
            </div>

            {/* PASSWORD */}

            <div className="settings-group">
              <label>New Password</label>

              <input
                type="password"
                name="password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* BUTTON */}

            <button type="submit" className="submit-btn">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </StudentLayout>
  );
};

export default Settings;
