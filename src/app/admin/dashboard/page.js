"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/layouts/AdminLayout";
import Link from "next/link";
import dataProvider from "@/utils/dataProvider";

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
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    lowStock: 0,
    criticalStock: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [criticalItems, setCriticalItems] = useState([]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const [products, orders] = await Promise.all([
          dataProvider.getProducts(),
          dataProvider.getOrders(),
        ]);
        if (!mounted) return;
        const totalSales = orders.reduce((s, o) => s + (o.total || 0), 0);
        const totalOrders = orders.length;
        const lowStock = (products || []).filter((p) => p.stock <= 10).length;
        const criticalStock = (products || []).filter(
          (p) => p.stock === 0,
        ).length;
        setStats({ totalSales, totalOrders, lowStock, criticalStock });
        setRecentOrders((orders || []).slice(0, 3));
        setCriticalItems(
          (products || [])
            .filter((p) => p.stock <= 5)
            .map((p) => ({
              product: p.name || p.product || p.id,
              stock: p.stock,
              threshold: 5,
            })),
        );
      } catch (err) {
        // keep defaults
      }
    }
    load();
    return () => (mounted = false);
  }, []);

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
