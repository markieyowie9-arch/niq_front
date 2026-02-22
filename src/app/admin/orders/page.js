"use client";
import { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function OrderManagement() {
  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      customer: "John Doe",
      date: "2024-02-20",
      total: 1250,
      status: "Pending",
      payment: "GCash",
      items: 3,
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      date: "2024-02-20",
      total: 890,
      status: "Processing",
      payment: "PayMaya",
      items: 2,
    },
    {
      id: "ORD-003",
      customer: "Bob Wilson",
      date: "2024-02-19",
      total: 2340,
      status: "Delivered",
      payment: "Bank",
      items: 5,
    },
    {
      id: "ORD-004",
      customer: "Alice Brown",
      date: "2024-02-19",
      total: 560,
      status: "Cancelled",
      payment: "GCash",
      items: 1,
    },
    {
      id: "ORD-005",
      customer: "Charlie Davis",
      date: "2024-02-18",
      total: 1780,
      status: "Delivered",
      payment: "PayPal",
      items: 4,
    },
  ]);

  const [filterStatus, setFilterStatus] = useState("all");
  const [showCancelled, setShowCancelled] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const statusColors = {
    Pending: "warning",
    Processing: "info",
    Delivered: "success",
    Cancelled: "secondary",
  };

  const filteredOrders = orders.filter((order) => {
    if (filterStatus !== "all" && order.status !== filterStatus) return false;
    if (!showCancelled && order.status === "Cancelled") return false;
    return true;
  });

  const handleCancelOrder = (orderId) => {
    if (
      confirm(
        "Are you sure you want to cancel this order? This action cannot be undone.",
      )
    ) {
      setOrders(
        orders.map((o) =>
          o.id === orderId ? { ...o, status: "Cancelled" } : o,
        ),
      );
    }
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Order Management</h2>
        <div>
          <span className="badge bg-primary me-2">Total: {orders.length}</span>
          <span className="badge bg-warning">
            Pending: {orders.filter((o) => o.status === "Pending").length}
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-3">
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className="col-md-3">
          <div className="form-check form-switch mt-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="showCancelled"
              checked={showCancelled}
              onChange={(e) => setShowCancelled(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="showCancelled">
              Show Cancelled Orders
            </label>
          </div>
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by order ID or customer..."
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="font-monospace">{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.date}</td>
                    <td>{order.items}</td>
                    <td>₱{order.total}</td>
                    <td>{order.payment}</td>
                    <td>
                      <span
                        className={`badge bg-${statusColors[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowOrderModal(true);
                        }}
                      >
                        View
                      </button>
                      {order.status !== "Cancelled" &&
                        order.status !== "Delivered" && (
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleCancelOrder(order.id)}
                          >
                            Cancel
                          </button>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Order Details - {selectedOrder.id}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowOrderModal(false);
                    setSelectedOrder(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row mb-4">
                  <div className="col-md-6">
                    <h6>Customer Information</h6>
                    <p>
                      <strong>Name:</strong> {selectedOrder.customer}
                      <br />
                      <strong>Email:</strong> john.doe@email.com
                      <br />
                      <strong>Contact:</strong> 09123456789
                      <br />
                      <strong>Address:</strong> 123 Main St, City
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h6>Order Information</h6>
                    <p>
                      <strong>Order Date:</strong> {selectedOrder.date}
                      <br />
                      <strong>Payment Method:</strong> {selectedOrder.payment}
                      <br />
                      <strong>Status:</strong>{" "}
                      <span
                        className={`badge bg-${statusColors[selectedOrder.status]}`}
                      >
                        {selectedOrder.status}
                      </span>
                      <br />
                      <strong>Order Code:</strong>{" "}
                      <span className="font-monospace">{selectedOrder.id}</span>
                    </p>
                  </div>
                </div>

                <h6>Items</h6>
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Laundry Detergent</td>
                      <td>2</td>
                      <td>₱120</td>
                      <td>₱240</td>
                    </tr>
                    <tr>
                      <td>Dishwashing Liquid</td>
                      <td>1</td>
                      <td>₱85</td>
                      <td>₱85</td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="text-end">
                        <strong>Subtotal:</strong>
                      </td>
                      <td>₱325</td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="text-end">
                        <strong>VAT (12%):</strong>
                      </td>
                      <td>₱39</td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="text-end">
                        <strong>Delivery Fee:</strong>
                      </td>
                      <td>₱50</td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="text-end">
                        <strong>Total:</strong>
                      </td>
                      <td>
                        <strong>₱414</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowOrderModal(false);
                    setSelectedOrder(null);
                  }}
                >
                  Close
                </button>
                {selectedOrder.status === "Pending" && (
                  <button className="btn btn-success">
                    Mark as Processing
                  </button>
                )}
                {selectedOrder.status === "Processing" && (
                  <button className="btn btn-success">Mark as Delivered</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
