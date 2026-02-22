"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/layouts/AdminLayout";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();

  // 🔐 Future Auth Guard (Enable later)
  /*
  useEffect(() => {
    const user = null; // replace with real auth check later

    if (!user) {
      router.push("/login");
    }
  }, [router]);
  */

  // 📊 Dashboard Stats (Replace with API later)
  const [stats] = useState({
    totalSales: 45678,
    totalOrders: 156,
    lowStock: 8,
    criticalStock: 3,
  });

  const [recentOrders] = useState([
    {
      id: "ORD-001",
      customer: "John Doe",
      total: 1250,
      status: "Pending",
      date: "2024-02-20",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      total: 890,
      status: "Processing",
      date: "2024-02-20",
    },
    {
      id: "ORD-003",
      customer: "Bob Wilson",
      total: 2340,
      status: "Delivered",
      date: "2024-02-19",
    },
  ]);

  const [criticalItems] = useState([
    { product: "Dishwashing Liquid", stock: 2, threshold: 10 },
    { product: "Bleach", stock: 5, threshold: 15 },
    { product: "Car Shampoo", stock: 3, threshold: 20 },
  ]);

  // 📡 Future API Example (uncomment later)
  /*
  useEffect(() => {
    async function fetchDashboard() {
      const res = await fetch("/api/admin/dashboard");
      const data = await res.json();
      setStats(data.stats);
      setRecentOrders(data.orders);
      setCriticalItems(data.critical);
    }

    fetchDashboard();
  }, []);
  */

  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return "success";
      case "Processing":
        return "info";
      case "Pending":
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard</h2>
        <span className="text-muted">{new Date().toLocaleDateString()}</span>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h6 className="text-white-50">Total Sales</h6>
              <h2>₱{stats.totalSales.toLocaleString()}</h2>
              <small className="text-white-50">This month</small>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h6 className="text-white-50">Total Orders</h6>
              <h2>{stats.totalOrders}</h2>
              <small className="text-white-50">This month</small>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-warning">
            <div className="card-body">
              <h6>Low Stock Items</h6>
              <h2>{stats.lowStock}</h2>
              <small>Below buffer level</small>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-danger text-white">
            <div className="card-body">
              <h6 className="text-white-50">Critical Stock</h6>
              <h2>{stats.criticalStock}</h2>
              <small className="text-white-50">Need immediate attention</small>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Stock Alert */}
      {criticalItems.length > 0 && (
        <div className="alert alert-danger mb-4">
          <h5>⚠️ Critical Stock Alert</h5>
          <ul className="mb-0">
            {criticalItems.map((item, index) => (
              <li key={index}>
                {item.product} - Only {item.stock} left (Threshold:{" "}
                {item.threshold})
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="row">
        {/* Recent Orders */}
        <div className="col-md-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between">
              <h5 className="mb-0">Recent Orders</h5>
              <Link href="/admin/orders" className="btn btn-sm btn-primary">
                View All
              </Link>
            </div>

            <div className="card-body table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.date}</td>
                      <td>₱{order.total}</td>
                      <td>
                        <span
                          className={`badge bg-${getStatusBadge(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body d-grid gap-2">
              <Link
                href="/admin/products/add"
                className="btn btn-outline-primary"
              >
                ➕ Add New Product
              </Link>
              <Link href="/admin/inventory" className="btn btn-outline-warning">
                📦 Update Inventory
              </Link>
              <Link href="/admin/reports" className="btn btn-outline-info">
                📊 Generate Report
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
