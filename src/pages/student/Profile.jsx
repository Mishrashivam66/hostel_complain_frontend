import {

  useEffect,

  useState,

} from "react";

import axios from "axios";

import {

  Mail,

  Phone,

  Building2,

  ShieldCheck,

  Pencil,

} from "lucide-react";

import {

  useNavigate,

} from "react-router-dom";

import StudentLayout from "../../layouts/StudentLayout";

import "./Student.css";

const Profile = () => {

  // ======================
  // NAVIGATE
  // ======================

  const navigate =
    useNavigate();

  // ======================
  // USER STATE
  // ======================

  const [user,
    setUser] =
    useState(null);

  // ======================
  // FETCH USER
  // ======================

  useEffect(() => {

    const fetchUser =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const res =
            await axios.get(

              "http://localhost:5000/api/auth/me",

              {

                headers: {

                  Authorization:
                    `Bearer ${token}`,

                },

              }

            );

          setUser(

            res.data.user

          );
          console.log(
  res.data.user
);

        } catch (error) {

          console.log(error);

        }

      };

    fetchUser();

  }, []);

  return (

    <StudentLayout>

      <div className="student-page">

        {/* HEADER */}

        <div className="student-header">

          <h1>

            My Profile

          </h1>

          <p>

            Manage your student
            profile information

          </p>

        </div>

        {/* PROFILE CARD */}

        <div className="profile-container">

          {/* TOP */}

          <div className="profile-top">

            {/* LEFT */}

            <div className="profile-user">

              <div className="profile-avatar">

                {

                  user?.firstName

                    ? user.firstName
                        .charAt(0)

                    : user?.name
                        ?.charAt(0)

                }

              </div>

              <div>

                <h2>

  {user?.name}

</h2>
                <p>

                  Student Account

                </p>

              </div>

            </div>

            {/* EDIT BUTTON */}

            <button

              className="edit-btn"

              onClick={() =>

                navigate(

                  "/student/edit-profile"

                )

              }

            >

              <Pencil size={18} />

              Edit Profile

            </button>

          </div>

          {/* GRID */}

          <div className="profile-grid">

            {/* EMAIL */}

            <div className="profile-card">

              <div className="profile-card-icon">

                <Mail size={22} />

              </div>

              <div>

                <h3>

                  Email Address

                </h3>

                <p>

                  {user?.email}

                </p>

              </div>

            </div>

            {/* PHONE */}

            <div className="profile-card">

              <div className="profile-card-icon">

                <Phone size={22} />

              </div>

              <div>

                <h3>

                  Phone Number

                </h3>

                <p>

                  {

                    user?.phoneNumber ||

                    "Not Added"

                  }

                </p>

              </div>

            </div>

            {/* HOSTEL */}

            <div className="profile-card">

              <div className="profile-card-icon">

                <Building2 size={22} />

              </div>

              <div>

                <h3>

                  Hostel

                </h3>

                <p>

                  {

                    user?.hostel ||

                    "Not Added"

                  }

                </p>

              </div>

            </div>

            {/* ROOM */}

            <div className="profile-card">

              <div className="profile-card-icon">

                🚪

              </div>

              <div>

                <h3>

                  Room Number

                </h3>

                <p>

                  {

                    user?.roomNumber ||

                    "Not Added"

                  }

                </p>

              </div>

            </div>

            {/* ROLE */}

            <div className="profile-card">

              <div className="profile-card-icon">

                <ShieldCheck size={22} />

              </div>

              <div>

                <h3>

                  Role

                </h3>

                <p>

                  {user?.role}

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </StudentLayout>

  );

};

export default Profile;