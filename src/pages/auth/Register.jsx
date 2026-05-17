import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import {
  User,
  Mail,
  Lock,
  Users,
  ShieldCheck,
  Zap,
  BarChart3,
} from "lucide-react";

import API from "../../services/api";

import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",

    email: "",

    password: "",

    role: "student",
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
  // HANDLE REGISTER
  // ======================

  const handleRegister = async (e) => {
    e.preventDefault();

    // ======================
    // AMITY EMAIL VALIDATION
    // ======================

    const isAmityEmail =
      formData.email.toLowerCase().endsWith("@amity.edu") ||
      formData.email.toLowerCase().endsWith("@s.amity.edu");

    if (!isAmityEmail) {
      setMessage("Use your official Amity University email");

      return;
    }

    try {
      // ======================
      // REGISTER API
      // ======================

      await API.post(
        "/auth/register",

        formData,
      );

      // ======================
      // SUCCESS MESSAGE
      // ======================

      setMessage("Registration Successful! Redirecting to login...");

      // ======================
      // REDIRECT
      // ======================

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="register-page">
      {/* OVERLAY */}

      <div className="register-overlay"></div>

      {/* LEFT SIDE */}

      <div className="register-left">
        {/* BRAND */}

        <div className="register-brand">
          <h1>AMITY UNIVERSITY</h1>

          <p>A Reputation of Excellence</p>
        </div>

        {/* HERO */}

        <div className="register-hero">
          <h2>Create Account</h2>

          <p>
            Register into the AI-powered Hostel Complaint Management ERP system
            for students and workers.
          </p>
        </div>

        {/* FEATURES */}

        <div className="register-features">
          <div className="register-feature">
            <ShieldCheck size={26} />

            <span>Secure</span>
          </div>

          <div className="register-feature">
            <Zap size={26} />

            <span>Fast</span>
          </div>

          <div className="register-feature">
            <Users size={26} />

            <span>User Friendly</span>
          </div>

          <div className="register-feature">
            <BarChart3 size={26} />

            <span>Smart Analytics</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div className="register-right">
        <div className="register-card">
          {/* TITLE */}

          <h1 className="register-title">Register</h1>

          <p className="register-subtitle">Create your hostel account</p>

          {/* MESSAGE */}

          {message && <div className="register-message">{message}</div>}

          {/* FORM */}

          <form onSubmit={handleRegister}>
            {/* NAME */}

            <div className="register-input-box">
              <User size={20} />

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* EMAIL */}

            <div className="register-input-box">
              <Mail size={20} />

              <input
                type="email"
                name="email"
                placeholder="Amity Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            {/* PASSWORD */}

            <div className="register-input-box password-box">
              <Lock size={20} />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* ROLE */}

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="register-select"
            >
              <option value="student">Student</option>

              <option value="worker">Worker</option>
            </select>

            {/* BUTTON */}

            <button type="submit" className="register-btn">
              Register
            </button>
          </form>

          {/* FOOTER */}

          <div className="register-footer">
            Already have an account? <Link to="/">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
