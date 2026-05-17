import {

  useState,

} from "react";

import axios from "axios";

import StudentLayout from "../../layouts/StudentLayout";

import "./Student.css";

const EditProfile = () => {

  const user = JSON.parse(

    localStorage.getItem("user")

  );

  const [formData,
    setFormData] =
    useState({

      hostel:
        user?.hostel || "",

      roomNumber:
        user?.roomNumber || "",

      phoneNumber:
        user?.phoneNumber || "",

    });

  // ======================
  // HANDLE CHANGE
  // ======================

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,

      });

    };

  // ======================
  // SUBMIT
  // ======================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.put(
            
            
            `${import.meta.env.VITE_API_URL}api/auth/update-profile`,

            formData,

            {

              headers: {

                Authorization:
                  `Bearer ${token}`,

              },

            }

          );

        // UPDATE LOCAL STORAGE

        localStorage.setItem(

          "user",

          JSON.stringify(

            res.data.user

          )

        );
        window.location.reload();

        alert(

          "Profile Updated Successfully"

        );

      } catch (error) {

        console.log(error);

        alert(

          "Update Failed"

        );

      }

    };

  return (

    <StudentLayout>

      <div className="student-page">

        <div className="student-header">

          <h1>

            Edit Profile

          </h1>

          <p>

            Update your hostel
            details

          </p>

        </div>

        {/* FORM */}

        <form

          className="edit-profile-form"

          onSubmit={handleSubmit}

        >

          {/* HOSTEL */}

          <div className="form-group">

            <label>

              Hostel

            </label>

            <input

              type="text"

              name="hostel"

              value={formData.hostel}

              onChange={handleChange}

            />

          </div>

          {/* ROOM */}

          <div className="form-group">

            <label>

              Room Number

            </label>

            <input

              type="text"

              name="roomNumber"

              value={formData.roomNumber}

              onChange={handleChange}

            />

          </div>

          {/* PHONE */}

          <div className="form-group">

            <label>

              Phone Number

            </label>

            <input

              type="text"

              name="phoneNumber"

              value={formData.phoneNumber}

              onChange={handleChange}

            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="save-btn"
          >

            Save Changes

          </button>

        </form>

      </div>

    </StudentLayout>

  );

};

export default EditProfile;