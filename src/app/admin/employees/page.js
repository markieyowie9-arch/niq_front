"use client";
import { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Admin User",
      email: "admin@niq.com",
      role: "Admin",
      lastLogin: "2024-02-20",
      status: "Active",
    },
    {
      id: 2,
      name: "Employee One",
      email: "emp1@niq.com",
      role: "Employee",
      lastLogin: "2024-02-19",
      status: "Active",
    },
    {
      id: 3,
      name: "Employee Two",
      email: "emp2@niq.com",
      role: "Employee",
      lastLogin: "2024-02-18",
      status: "Inactive",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [permissions, setPermissions] = useState({
    products: true,
    inventory: true,
    orders: true,
    reports: false,
    employees: false,
    audit: false,
  });

  const modules = [
    { id: "products", name: "Product Management" },
    { id: "inventory", name: "Inventory Management" },
    { id: "orders", name: "Order Management" },
    { id: "reports", name: "Reports" },
    { id: "employees", name: "Employee Management" },
    { id: "audit", name: "Audit Trail" },
  ];

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Employee Management</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          + Add Employee
        </button>
      </div>

      {/* Employees Table */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Last Login</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>
                      <span
                        className={`badge bg-${emp.role === "Admin" ? "danger" : "info"}`}
                      >
                        {emp.role}
                      </span>
                    </td>
                    <td>{emp.lastLogin}</td>
                    <td>
                      <span
                        className={`badge bg-${emp.status === "Active" ? "success" : "secondary"}`}
                      >
                        {emp.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => setEditingEmployee(emp)}
                      >
                        Edit
                      </button>
                      <button className="btn btn-sm btn-outline-danger">
                        Deactivate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Employee Modal */}
      {(showAddModal || editingEmployee) && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingEmployee ? "Edit Employee" : "Add New Employee"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingEmployee(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={editingEmployee?.name}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        defaultValue={editingEmployee?.email}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Contact Number</label>
                      <input type="tel" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Role</label>
                      <select
                        className="form-select"
                        defaultValue={editingEmployee?.role || "Employee"}
                      >
                        <option value="Admin">Admin</option>
                        <option value="Employee">Employee</option>
                      </select>
                    </div>
                  </div>

                  {!editingEmployee && (
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" />
                      </div>
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label">Security Question</label>
                    <select className="form-select">
                      <option>What was your first pet's name?</option>
                      <option>What was your elementary school?</option>
                      <option>What is your mother's maiden name?</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Security Answer</label>
                    <input type="text" className="form-control" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Module Permissions</label>
                    <div className="row">
                      {modules.map((module) => (
                        <div className="col-md-4 mb-2" key={module.id}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`perm_${module.id}`}
                              defaultChecked={permissions[module.id]}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`perm_${module.id}`}
                            >
                              {module.name}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingEmployee(null);
                  }}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-primary">
                  {editingEmployee ? "Update Employee" : "Add Employee"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
