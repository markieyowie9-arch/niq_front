"use client";
import { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function ProductManagement() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Laundry Detergent",
      price: 120,
      stock: 45,
      category: "Detergent",
      status: "Active",
    },
    {
      id: 2,
      name: "Dishwashing Liquid",
      price: 85,
      stock: 2,
      category: "Dishwashing",
      status: "Active",
    },
    {
      id: 3,
      name: "Car Shampoo",
      price: 150,
      stock: 8,
      category: "Car Care",
      status: "Active",
    },
    {
      id: 4,
      name: "Bleach",
      price: 60,
      stock: 0,
      category: "Cleaning",
      status: "Inactive",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Product Management</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          + Add New Product
        </button>
      </div>

      {/* Search and Filter */}
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
            <option>All Categories</option>
            <option>Detergent</option>
            <option>Dishwashing</option>
            <option>Car Care</option>
            <option>Cleaning</option>
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          backgroundColor: "#f0f0f0",
                        }}
                      ></div>
                    </td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>₱{product.price}</td>
                    <td>
                      <span
                        className={`badge bg-${
                          product.stock === 0
                            ? "danger"
                            : product.stock < 10
                              ? "warning"
                              : "success"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge bg-${product.status === "Active" ? "success" : "secondary"}`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => setEditingProduct(product)}
                      >
                        Edit
                      </button>
                      <button className="btn btn-sm btn-outline-danger">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {(showAddModal || editingProduct) && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingProduct(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Product Name *</label>
                      <input type="text" className="form-control" required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Category *</label>
                      <select className="form-select" required>
                        <option>Detergent</option>
                        <option>Dishwashing</option>
                        <option>Car Care</option>
                        <option>Cleaning</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Price *</label>
                      <div className="input-group">
                        <span className="input-group-text">₱</span>
                        <input
                          type="number"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Stock Quantity *</label>
                      <input type="number" className="form-control" required />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description *</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Product Images *</label>
                    <input
                      type="file"
                      className="form-control"
                      multiple
                      accept="image/*"
                      required
                    />
                    <small className="text-muted">
                      You can select multiple images
                    </small>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Buffer Level</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Default: 10"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Critical Level</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Default: 5"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="status"
                          id="statusActive"
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="statusActive"
                        >
                          Active
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="status"
                          id="statusInactive"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="statusInactive"
                        >
                          Inactive
                        </label>
                      </div>
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
                    setEditingProduct(null);
                  }}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-primary">
                  {editingProduct ? "Update Product" : "Save Product"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
