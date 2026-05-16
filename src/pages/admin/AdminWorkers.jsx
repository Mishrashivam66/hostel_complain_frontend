import {
  Search,
  Filter,
  UserCog,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import AdminLayout from "../../layouts/AdminLayout";

import API from "../../services/api";

import "./Admin.css";

const AdminWorkers = () => {

  // ======================
  // STATES
  // ======================

  const [
    workers,
    setWorkers,
  ] = useState([]);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState("All");

  // ======================
  // FETCH WORKERS
  // ======================

  const fetchWorkers =
    async () => {

      try {

        const res =
          await API.get(
            "/admin/workers"
          );

        setWorkers(
          res.data.workers || []
        );

      }

      catch (error) {

        console.log(error);

      }

    };

  // ======================
  // USE EFFECT
  // ======================

  useEffect(() => {

    fetchWorkers();

  }, []);

  // ======================
  // FILTERED WORKERS
  // ======================

  const filteredWorkers =

    workers.filter((item) => {

      const workerName =

        item.name
        ? item.name.toLowerCase()
        : "";

      const matchesSearch =

        workerName.includes(

          search.toLowerCase()

        );

      const matchesStatus =

        statusFilter === "All"

        ||

        (
          statusFilter === "Approved"

          &&

          item.isApproved
        )

        ||

        (
          statusFilter === "Pending"

          &&

          !item.isApproved
        );

      return (

        matchesSearch

        &&

        matchesStatus

      );

    });

  return (

    <AdminLayout>

      <div className="admin-page">

        {/* ====================== */}
        {/* HEADER */}
        {/* ====================== */}

        <div className="admin-header">

          <h1>

            Worker Management

          </h1>

          <p>

            Manage hostel workers
            and approval status

          </p>

        </div>

        {/* ====================== */}
        {/* FILTER ROW */}
        {/* ====================== */}

        <div className="admin-filter-row">

          {/* SEARCH */}

          <div className="admin-search">

            <Search size={18} />

            <input

              type="text"

              placeholder="Search workers..."

              value={search}

              onChange={(e) =>

                setSearch(
                  e.target.value
                )

              }

            />

          </div>

          {/* FILTER */}

          <div className="admin-filter">

            <Filter size={18} />

            <select

              value={statusFilter}

              onChange={(e) =>

                setStatusFilter(
                  e.target.value
                )

              }

            >

              <option value="All">

                All Workers

              </option>

              <option value="Approved">

                Approved

              </option>

              <option value="Pending">

                Pending

              </option>

            </select>

          </div>

        </div>

        {/* ====================== */}
        {/* TABLE */}
        {/* ====================== */}

        <div className="admin-section">

          <div className="admin-section-header">

            <div>

              <h2>

                Workers List

              </h2>

              <p>

                Total Workers:
                {

                  filteredWorkers.length

                }

              </p>

            </div>

          </div>

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>

                <tr>

                  <th>

                    Name

                  </th>

                  <th>

                    Email

                  </th>

                  <th>

                    Phone

                  </th>

                  <th>

                    Status

                  </th>

                </tr>

              </thead>

              <tbody>

                {

                  filteredWorkers.length > 0

                  ?

                  filteredWorkers.map(

                    (
                      item,
                      index
                    ) => (

                      <tr key={index}>

                        {/* NAME */}

                        <td>

                          <div className="user-box">

                            <div className="user-avatar">

                              <UserCog size={16} />

                            </div>

                            {

                              item.name

                            }

                          </div>

                        </td>

                        {/* EMAIL */}

                        <td>

                          {

                            item.email

                          }

                        </td>

                        {/* PHONE */}

                        <td>

                          {

                            item.phoneNumber || "-"

                          }

                        </td>

                        {/* STATUS */}

                        <td>

                          <span

                            className={`status-badge ${

                              item.isApproved

                              ? "status-completed"

                              : "status-pending"

                            }`}

                          >

                            {

                              item.isApproved

                              ? "Approved"

                              : "Pending"

                            }

                          </span>

                        </td>

                      </tr>

                    )

                  )

                  :

                  <tr>

                    <td

                      colSpan="4"

                      className="empty-table"

                    >

                      No workers found

                    </td>

                  </tr>

                }

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </AdminLayout>

  );

};

export default AdminWorkers;