import {

  AlertTriangle,

  Clock3,

} from "lucide-react";

import AdminLayout from "../../layouts/AdminLayout";

import "./Admin.css";

const OverdueComplaints = () => {

  // ======================
  // DUMMY DATA
  // ======================

  const complaints = [

    {

      id: "CMP1024",

      student:
        "Shivam Kumar",

      hostel: "H1",

      category:
        "Electrical",

      delay: "5 Hours",

      status:
        "Pending",

    },

    {

      id: "CMP1031",

      student:
        "Rahul Sharma",

      hostel: "H2",

      category:
        "Plumbing",

      delay: "9 Hours",

      status:
        "Assigned",

    },

  ];

  return (

    <AdminLayout>

      <div className="admin-page">

        {/* HEADER */}

        <div className="admin-header">

          <h1>

            Overdue Complaints

          </h1>

          <p>

            Complaints not resolved
            within 24 hours

          </p>

        </div>

        {/* ALERT */}

        <div className="overdue-alert">

          <AlertTriangle size={24} />

          <div>

            <h3>

              Urgent Attention Needed

            </h3>

            <p>

              Some complaints are delayed
              beyond the allowed deadline

            </p>

          </div>

        </div>

        {/* TABLE */}

        <div className="admin-section">

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>

                <tr>

                  <th>

                    Complaint ID

                  </th>

                  <th>

                    Student

                  </th>

                  <th>

                    Hostel

                  </th>

                  <th>

                    Category

                  </th>

                  <th>

                    Delay

                  </th>

                  <th>

                    Status

                  </th>

                </tr>

              </thead>

              <tbody>

                {

                  complaints.map(

                    (

                      item,

                      index

                    ) => (

                      <tr key={index}>

                        <td>

                          {item.id}

                        </td>

                        <td>

                          {item.student}

                        </td>

                        <td>

                          {item.hostel}

                        </td>

                        <td>

                          {item.category}

                        </td>

                        <td className="danger-text">

                          <div className="delay-box">

                            <Clock3 size={16} />

                            {item.delay}

                          </div>

                        </td>

                        <td>

                          <span

                            className={`status-badge ${

                              item.status ===
                              "Pending"

                                ? "status-pending"

                                : "status-assigned"

                            }`}

                          >

                            {item.status}

                          </span>

                        </td>

                      </tr>

                    )

                  )

                }

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </AdminLayout>

  );

};

export default OverdueComplaints;