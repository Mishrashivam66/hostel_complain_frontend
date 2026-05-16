import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Mail,
  Lock,
  ShieldCheck,
  Zap,
  Users,
  BarChart3,
} from "lucide-react";

import API from "../../services/api";

import "./Login.css";

const Login = () => {

  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({

    email: "",

    password: "",

  });

  // ======================
  // HANDLE CHANGE
  // ======================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  // ======================
  // HANDLE LOGIN
  // ======================

  const handleLogin = async (

    e

  ) => {

    e.preventDefault();

    // ======================
    // AMITY EMAIL CHECK
    // ======================

    if (

      !formData.email.endsWith(
        "@amity.edu"
      )

      &&

      !formData.email.endsWith(
        "@s.amity.edu"
      )

    ) {

      setMessage(
        "Only Amity Email Allowed"
      );

      return;

    }

    try {

      const res =
        await API.post(

          "/auth/login",

          formData

        );

      localStorage.setItem(

        "token",

        res.data.token

      );

      localStorage.setItem(

        "user",

        JSON.stringify(
          res.data.user
        )

      );

      setMessage(
        "Login Successful"
      );

      setTimeout(() => {

        if (
          res.data.user.role
          === "admin"
        ) {

          navigate(
            "/admin/dashboard"
          );

        }

        else if (
          res.data.user.role
          === "worker"
        ) {

          navigate(
            "/worker/dashboard"
          );

        }

        else {

          navigate(
            "/student/dashboard"
          );

        }

      }, 1200);

    }

    catch (error) {

      setMessage(

        error.response?.data?.message

        ||

        "Login Failed"

      );

    }

  };

  return (

    <div className="login-page">

      {/* OVERLAY */}

      <div className="login-overlay"></div>

      {/* LEFT */}

      <div className="login-left">

        <div className="brand-box">

          <h1>

            AMITY
            UNIVERSITY

          </h1>

          <p>

            A Reputation of Excellence

          </p>

        </div>

        <div className="hero-content">

          <h2>

            Welcome Back

          </h2>

          <p>

            Login to your Hostel ERP
            platform and manage
            complaints efficiently.

          </p>

        </div>

        {/* FEATURES */}

        <div className="feature-row">

          <div className="feature-item">

            <ShieldCheck size={26} />

            <span>

              Secure

            </span>

          </div>

          <div className="feature-item">

            <Zap size={26} />

            <span>

              Fast

            </span>

          </div>

          <div className="feature-item">

            <Users size={26} />

            <span>

              User Friendly

            </span>

          </div>

          <div className="feature-item">

            <BarChart3 size={26} />

            <span>

              Analytics

            </span>

          </div>

        </div>

      </div>

      {/* RIGHT */}

      <div className="login-right">

        <div className="login-card">

          <h1 className="login-title">

            Login

          </h1>

          <p className="login-subtitle">

            Access your hostel portal

          </p>

          {message && (

            <div className="login-message">

              {message}

            </div>

          )}

          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div className="input-box">

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

            <div className="input-box">

              <Lock size={20} />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="login-btn"
            >

              Login

            </button>

          </form>

          <div className="login-footer">

            Don't have account?{" "}

            <Link to="/register">

              Register

            </Link>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Login;