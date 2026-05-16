import { useState } from "react";
import API from "../../services/api";

import StudentLayout from "../../layouts/StudentLayout";

import "./Student.css";

const CreateComplaint = () => {
  // ======================
  // HOSTELS
  // ======================

  const hostels = ["H1", "H2", "H3", "H4", "H5"];

  // ======================
  // FLOORS
  // ======================

  const floors = ["Ground Floor", "First Floor", "Second Floor", "Third Floor"];

  // ======================
  // ROOMS
  // ======================

  // ======================
  // STATE
  // ======================

  const [formData, setFormData] = useState({
    hostel: "H1",

    floor: "Ground Floor",

    room: "G1A",

    category: "Electrical",

    otherCategory: "",

    phone: "",

    availabilityFrom: "",

    availabilityTo: "",

    description: "",
  });

  const [success, setSuccess] = useState(false);

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
  // SUBMIT
  // ======================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);

      const payload = {
        studentName: `${user.firstName} ${user.lastName}`,

        studentEmail: user.email,

        hostel: formData.hostel,

        floor: formData.floor,

        room: formData.room,

        category: formData.category,

        otherCategory: formData.otherCategory,

        phoneNumber: formData.phone,

        availabilityFrom: formData.availabilityFrom,

        availabilityTo: formData.availabilityTo,

        description: formData.description,
      };
      // API CALL

      const res = await API.post(
        "/complaints",

        payload,
      );

      // SUCCESS

      setSuccess(true);

      console.log(res.data);

      // RESET

      setFormData({
        hostel: "H1",

        floor: "Ground Floor",

        room: "",

        category: "Electrical",

        otherCategory: "",

        phone: "",

        availabilityFrom: "",

        availabilityTo: "",

        description: "",
      });

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <StudentLayout>
      <div className="student-page">
        {/* HEADER */}

        <div className="student-header">
          <h1>Create Complaint</h1>

          <p>Submit hostel complaint quickly and efficiently</p>
        </div>

        {/* SUCCESS */}

        {success && (
          <div className="success-box">Complaint Submitted Successfully</div>
        )}

        {/* FORM */}

        <div className="complaint-form-card">
          <form onSubmit={handleSubmit}>
            {/* GRID */}

            <div className="form-grid">
              {/* HOSTEL */}

              <div>
                <label>Hostel</label>

                <select
                  name="hostel"
                  value={formData.hostel}
                  onChange={handleChange}
                >
                  {hostels.map((hostel) => (
                    <option key={hostel}>{hostel}</option>
                  ))}
                </select>
              </div>

              {/* FLOOR */}

              <div>
                <label>Floor</label>

                <select
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                >
                  {floors.map((floor) => (
                    <option key={floor}>{floor}</option>
                  ))}
                </select>
              </div>

              {/* ROOM */}

              <div>
                <label>Room Number</label>

                <input
                  type="text"
                  name="room"
                  placeholder="Example: G1A"
                  value={formData.room}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* PHONE */}

              <div>
                <label>Phone Number</label>

                <input
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* CATEGORY */}

            <div className="mt-5">
              <label>Complaint Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option>Electrical</option>

                <option>Plumbing</option>

                <option>Carpentry</option>

                <option>WiFi Issue</option>

                <option>Cleaning</option>

                <option>Other</option>
              </select>
            </div>

            {/* OTHER CATEGORY */}

            {formData.category === "Other" && (
              <div className="mt-5">
                <label>Other Complaint</label>

                <input
                  type="text"
                  name="otherCategory"
                  placeholder="Enter complaint type"
                  value={formData.otherCategory}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {/* AVAILABILITY */}

            <div className="availability-grid">
              {/* FROM */}

              <div>
                <label>Available From</label>

                <input
                  type="time"
                  name="availabilityFrom"
                  value={formData.availabilityFrom}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* TO */}

              <div>
                <label>Available To</label>

                <input
                  type="time"
                  name="availabilityTo"
                  value={formData.availabilityTo}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* DESCRIPTION */}

            <div className="mt-5">
              <label>Complaint Description</label>

              <textarea
                name="description"
                rows="5"
                placeholder="Describe your issue..."
                value={formData.description}
                onChange={handleChange}
                maxLength={1000}
                required
              />

              <p className="char-count">{formData.description.length} / 1000</p>
            </div>

            {/* BUTTON */}

            <button type="submit" className="submit-btn">
              Submit Complaint
            </button>
          </form>
        </div>
      </div>
    </StudentLayout>
  );
};

export default CreateComplaint;
