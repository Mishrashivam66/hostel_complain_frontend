import {

  useEffect,

  useState,

} from "react";

import {

  ShieldCheck,

  User,

} from "lucide-react";

import AdminLayout from "../../layouts/AdminLayout";

import API from "../../services/api";

import "./Admin.css";

const AdminApprovals = () => {

  const [users,
    setUsers] =
    useState([]);

  // ======================
  // FETCH USERS
  // ======================

  const fetchUsers =
    async () => {

      try {

        const res =
          await API.get(

            "/admin/pending-users"

          );

        setUsers(

          res.data.users

        );

      }

      catch (error) {

        console.log(error);

      }

    };

  // ======================
  // APPROVE USER
  // ======================

  const approveUser =
    async (id) => {

      try {

        await API.put(

          `/admin/approve-user/${id}`

        );

        fetchUsers();

      }

      catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchUsers();

  }, []);

  return (

    <AdminLayout>

      <div className="admin-page">

        {/* HEADER */}

        <div className="admin-header">

          <h1>

            User Approvals

          </h1>

          <p>

            Approve students and
            workers before login

          </p>

        </div>

        {/* GRID */}

        <div className="approval-grid">

          {

            users.map(

              (

                item,

                index

              ) => (

                <div

                  key={index}

                  className="approval-card"

                >

                  {/* TOP */}

                  <div className="approval-top">

                    <div className="approval-avatar">

                      <User size={22} />

                    </div>

                    <div>

                      <h2>

                        {item.name}

                      </h2>

                      <p>

                        {item.email}

                      </p>

                    </div>

                  </div>

                  {/* INFO */}

                  <div className="approval-info">

                    <span>

                      Role:
                      {item.role}

                    </span>

                    <span>

                      Hostel:
                      {item.hostel || "N/A"}

                    </span>

                  </div>

                  {/* BUTTON */}

                  <button

                    className="approve-btn"

                    onClick={() =>

                      approveUser(
                        item._id
                      )

                    }

                  >

                    <ShieldCheck size={18} />

                    Approve User

                  </button>

                </div>

              )

            )

          }

        </div>

      </div>

    </AdminLayout>

  );

};

export default AdminApprovals;