"use client";
import { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function AuditTrail() {
  const [logs, setLogs] = useState([
    {
      id: 1,
      timestamp: "2024-02-20 09:23:45",
      user: "Admin User",
      action: "Login",
      details: "Logged in successfully",
      ip: "192.168.1.100",
    },
    {
      id: 2,
      timestamp: "2024-02-20 09:30:12",
      user: "Admin User",
      action: "Update Product",
      details: "Updated price of Laundry Detergent from ₱120 to ₱125",
      ip: "192.168.1.100",
    },
    {
      id: 3,
      timestamp: "2024-02-20 10:15:33",
      user: "Employee One",
      action: "Process Order",
      details: "Marked order ORD-002 as Processing",
      ip: "192.168.1.101",
    },
    {
      id: 4,
      timestamp: "2024-02-20 11:05:21",
      user: "Employee One",
      action: "Update Inventory",
      details: "Added 20 units to Dishwashing Liquid stock",
      ip: "192.168.1.101",
    },
    {
      id: 5,
      timestamp: "2024-02-20 13:42:08",
      user: "Admin User",
      action: "Cancel Order",
      details: "Cancelled order ORD-004 - Customer request",
      ip: "192.168.1.100",
    },
  ]);

  const [filterUser, setFilterUser] = useState("all");
  const [filterAction, setFilterAction] = useState("all");
  const [dateRange, setDateRange] = useState("today");

  const users = ["all", ...new Set(logs.map((log) => log.user))];
  const actions = ["all", ...new Set(logs.map((log) => log.action))];

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Audit Trail</h2>
        <button
          className="btn btn-outline-primary"
          onClick={() => window.print()}
        >
          📥 Export Logs
        </button>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <label className="form-label">User</label>
              <select
                className="form-select"
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
              >
                {users.map((user) => (
                  <option key={user} value={user}>
                    {user === "all" ? "All Users" : user}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Action</label>
              <select
                className="form-select"
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value)}
              >
                {actions.map((action) => (
                  <option key={action} value={action}>
                    {action === "all" ? "All Actions" : action}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Date Range</label>
              <select
                className="form-select"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Search</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search logs..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>User</th>
                  <th>Action</th>
                  <th>Details</th>
                  <th>IP Address</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td className="font-monospace small">{log.timestamp}</td>
                    <td>
                      <span
                        className={`badge bg-${log.user.includes("Admin") ? "danger" : "info"}`}
                      >
                        {log.user}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge bg-${
                          log.action === "Login"
                            ? "success"
                            : log.action.includes("Update")
                              ? "warning"
                              : log.action === "Cancel Order"
                                ? "danger"
                                : "secondary"
                        }`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td>{log.details}</td>
                    <td className="font-monospace small">{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <nav className="mt-3">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </AdminLayout>
  );
}
