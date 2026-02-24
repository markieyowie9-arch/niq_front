"use client";
import { useState, useEffect } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import dataProvider from "@/utils/dataProvider";

export default function InventoryManagement() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const inv = await dataProvider.getInventory();
        if (!mounted) return;
        setInventory(inv || []);
      } catch (err) {
        setInventory([]);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Get critical items first (requirement)
  const criticalItems = inventory.filter((item) => item.stock <= item.critical);
  const otherItems = inventory.filter((item) => item.stock > item.critical);

  const filteredCritical = criticalItems.filter((item) =>
    item.product.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const filteredOther = otherItems.filter((item) =>
    item.product.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStockStatus = (item) => {
    if (item.stock <= item.critical) return "critical";
    if (item.stock <= item.buffer) return "low";
    return "good";
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Inventory Management</h2>
        <button
          className="btn btn-success"
          onClick={() => {
            /* Generate report */
          }}
        >
          📊 Generate Inventory Report
        </button>
      </div>

      {/* Search */}
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select className="form-select">
            <option>All Status</option>
            <option>Critical Only</option>
            <option>Low Stock</option>
            <option>Good Stock</option>
          </select>
        </div>
      </div>

      {/* Critical Stock Section (Prioritized) */}
      {filteredCritical.length > 0 && (
        <div className="mb-4">
          <h4 className="text-danger mb-3">
            ⚠️ Critical Stock - Immediate Action Needed
          </h4>
          <div className="card border-danger">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead className="table-danger">
                    <tr>
                      <th>Product</th>
                      <th>Current Stock</th>
                      <th>Critical Level</th>
                      <th>Buffer Level</th>
                      <th>ML Suggestion</th>
                      <th>Last Updated</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCritical.map((item) => (
                      <tr key={item.id}>
                        <td>{item.product}</td>
                        <td className="fw-bold text-danger">{item.stock}</td>
                        <td>{item.critical}</td>
                        <td>{item.buffer}</td>
                        <td>
                          <span className="badge bg-info">
                            {item.mlSuggestion}
                          </span>
                          <button className="btn btn-sm btn-link">Apply</button>
                        </td>
                        <td>{item.lastUpdated}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => {
                              setSelectedProduct(item);
                              setShowEditModal(true);
                            }}
                          >
                            Update Stock
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Inventory */}
      <div>
        <h4 className="mb-3">All Inventory</h4>
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Current Stock</th>
                    <th>Buffer Level</th>
                    <th>Critical Level</th>
                    <th>Status</th>
                    <th>ML Suggestion</th>
                    <th>Last Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOther.map((item) => {
                    const status = getStockStatus(item);
                    return (
                      <tr key={item.id}>
                        <td>{item.product}</td>
                        <td
                          className={
                            status === "critical"
                              ? "text-danger fw-bold"
                              : status === "low"
                                ? "text-warning fw-bold"
                                : ""
                          }
                        >
                          {item.stock}
                        </td>
                        <td>{item.buffer}</td>
                        <td>{item.critical}</td>
                        <td>
                          <span
                            className={`badge bg-${
                              status === "critical"
                                ? "danger"
                                : status === "low"
                                  ? "warning"
                                  : "success"
                            }`}
                          >
                            {status === "critical"
                              ? "Critical"
                              : status === "low"
                                ? "Low Stock"
                                : "Good"}
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-info">
                            {item.mlSuggestion}
                          </span>
                          <button className="btn btn-sm btn-link">Apply</button>
                        </td>
                        <td>{item.lastUpdated}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => {
                              setSelectedProduct(item);
                              setShowEditModal(true);
                            }}
                          >
                            Update Stock
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Update Stock Modal */}
      {showEditModal && selectedProduct && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Update Stock - {selectedProduct.product}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedProduct(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Current Stock</label>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={selectedProduct.stock}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Buffer Level</label>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={selectedProduct.buffer}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Critical Level</label>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={selectedProduct.critical}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">ML Suggested Threshold</label>
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control"
                        value={selectedProduct.mlSuggestion}
                        readOnly
                      />
                      <button className="btn btn-outline-primary" type="button">
                        Apply ML Suggestion
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedProduct(null);
                  }}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-primary">
                  Update Stock
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
