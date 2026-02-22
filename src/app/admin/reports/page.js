"use client";
import { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function Reports() {
  const [reportType, setReportType] = useState("sales");
  const [dateRange, setDateRange] = useState("month");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  const reportTypes = [
    { id: "sales", name: "Sales Report", icon: "💰" },
    { id: "transactions", name: "Transaction History", icon: "📋" },
    { id: "cancelled", name: "Cancelled Orders", icon: "❌" },
    { id: "inventory", name: "Inventory Status", icon: "📦" },
    { id: "customers", name: "Customer Analytics", icon: "👥" },
  ];

  const dateRanges = [
    { id: "week", name: "This Week" },
    { id: "month", name: "This Month" },
    { id: "year", name: "This Year" },
    { id: "custom", name: "Custom Range" },
  ];

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Reports & Analytics</h2>
        <button className="btn btn-primary" onClick={() => window.print()}>
          🖨️ Print Report
        </button>
      </div>

      {/* Report Controls */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <label className="form-label">Report Type</label>
              <select
                className="form-select"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                {reportTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.icon} {type.name}
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
                {dateRanges.map((range) => (
                  <option key={range.id} value={range.id}>
                    {range.name}
                  </option>
                ))}
              </select>
            </div>
            {dateRange === "custom" && (
              <>
                <div className="col-md-2">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={customStart}
                    onChange={(e) => setCustomStart(e.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={customEnd}
                    onChange={(e) => setCustomEnd(e.target.value)}
                  />
                </div>
              </>
            )}
            <div className="col-md-{dateRange === 'custom' ? 1 : 5} d-flex align-items-end">
              <button className="btn btn-primary w-100">Generate Report</button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">
            {reportTypes.find((t) => t.id === reportType)?.icon}{" "}
            {reportTypes.find((t) => t.id === reportType)?.name} -
            {dateRange === "week"
              ? " This Week"
              : dateRange === "month"
                ? " This Month"
                : dateRange === "year"
                  ? " This Year"
                  : " Custom Range"}
          </h5>
        </div>
        <div className="card-body">
          {reportType === "sales" && (
            <>
              {/* Summary Cards */}
              <div className="row g-3 mb-4">
                <div className="col-md-3">
                  <div className="card bg-success text-white">
                    <div className="card-body">
                      <h6>Total Sales</h6>
                      <h3>₱45,678</h3>
                      <small>+12% from last month</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card bg-info text-white">
                    <div className="card-body">
                      <h6>Total Orders</h6>
                      <h3>156</h3>
                      <small>+8% from last month</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card bg-warning">
                    <div className="card-body">
                      <h6>Average Order Value</h6>
                      <h3>₱293</h3>
                      <small>+3% from last month</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card bg-primary text-white">
                    <div className="card-body">
                      <h6>Top Product</h6>
                      <h6>Laundry Detergent</h6>
                      <small>45 units sold</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart placeholder */}
              <div className="bg-light p-5 text-center mb-4">
                <p className="text-muted">Sales Chart Visualization</p>
                <div style={{ height: "300px", background: "#f8f9fa" }}>
                  {/* Add chart library here */}
                </div>
              </div>

              {/* Sales Table */}
              <h6 className="mb-3">Daily Sales Breakdown</h6>
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Orders</th>
                    <th>Products Sold</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2024-02-20</td>
                    <td>12</td>
                    <td>28</td>
                    <td>₱3,450</td>
                  </tr>
                  <tr>
                    <td>2024-02-19</td>
                    <td>15</td>
                    <td>34</td>
                    <td>₱4,230</td>
                  </tr>
                  <tr>
                    <td>2024-02-18</td>
                    <td>8</td>
                    <td>19</td>
                    <td>₱2,180</td>
                  </tr>
                </tbody>
              </table>
            </>
          )}

          {reportType === "inventory" && (
            <>
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="card border-danger">
                    <div className="card-body">
                      <h6 className="text-danger">Critical Stock</h6>
                      <h3>3 items</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card border-warning">
                    <div className="card-body">
                      <h6 className="text-warning">Low Stock</h6>
                      <h3>8 items</h3>
                    </div>
                  </div>
                </div>
              </div>

              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Current Stock</th>
                    <th>Buffer Level</th>
                    <th>Critical Level</th>
                    <th>Status</th>
                    <th>Last Restocked</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Dishwashing Liquid</td>
                    <td className="text-danger fw-bold">2</td>
                    <td>15</td>
                    <td>8</td>
                    <td>
                      <span className="badge bg-danger">Critical</span>
                    </td>
                    <td>2024-02-15</td>
                  </tr>
                  <tr>
                    <td>Car Shampoo</td>
                    <td className="text-warning fw-bold">8</td>
                    <td>15</td>
                    <td>8</td>
                    <td>
                      <span className="badge bg-warning">Low Stock</span>
                    </td>
                    <td>2024-02-10</td>
                  </tr>
                </tbody>
              </table>
            </>
          )}

          {reportType === "customers" && (
            <>
              <div className="row mb-4">
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body">
                      <h6>Total Customers</h6>
                      <h3>89</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body">
                      <h6>New Customers</h6>
                      <h3>12</h3>
                      <small>This month</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body">
                      <h6>Repeat Customers</h6>
                      <h3>45%</h3>
                    </div>
                  </div>
                </div>
              </div>

              <h6 className="mb-3">Top Customers</h6>
              <table className="table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Orders</th>
                    <th>Total Spent</th>
                    <th>Last Order</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>John Doe</td>
                    <td>8</td>
                    <td>₱5,240</td>
                    <td>2024-02-20</td>
                  </tr>
                  <tr>
                    <td>Jane Smith</td>
                    <td>5</td>
                    <td>₱3,890</td>
                    <td>2024-02-19</td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
