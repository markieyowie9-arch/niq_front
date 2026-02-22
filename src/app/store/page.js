"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import CustomerLayout from "@/components/layouts/CostumerLayout";

export default function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample product data - replace with Firebase
  const sampleProducts = [
    {
      id: 1,
      name: "Laundry Detergent",
      price: 120,
      stock: 15,
      category: "Detergent",
      image: "/product1.jpg",
    },
    {
      id: 2,
      name: "Dishwashing Liquid",
      price: 85,
      stock: 0,
      category: "Dishwashing",
      image: "/product2.jpg",
    },
    {
      id: 3,
      name: "Car Shampoo",
      price: 150,
      stock: 5,
      category: "Car Care",
      image: "/product3.jpg",
    },
    {
      id: 4,
      name: "Bleach",
      price: 60,
      stock: 20,
      category: "Cleaning",
      image: "/product4.jpg",
    },
  ];

  useEffect(() => {
    setProducts(sampleProducts);
    // Extract unique categories
    const cats = ["all", ...new Set(sampleProducts.map((p) => p.category))];
    setCategories(cats);
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStockBadge = (stock) => {
    if (stock === 0)
      return <span className="badge bg-secondary">Out of Stock</span>;
    if (stock < 10)
      return <span className="badge bg-warning text-dark">Low Stock</span>;
    return <span className="badge bg-success">In Stock</span>;
  };

  return (
    <CustomerLayout>
      <div className="row">
        {/* Sidebar Filters */}
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Categories</h5>
              <div className="list-group">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`list-group-item list-group-item-action ${selectedCategory === cat ? "active" : ""}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat === "all" ? "All Products" : cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="col-md-9">
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Products */}
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div className="col-md-4" key={product.id}>
                <div
                  className={`card h-100 ${product.stock === 0 ? "opacity-50" : ""}`}
                >
                  <img
                    src={product.image || "/placeholder.jpg"}
                    className="card-img-top"
                    alt={product.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text fw-bold text-primary">
                      ₱{product.price}
                    </p>
                    <div className="mb-2">{getStockBadge(product.stock)}</div>
                    {product.stock > 0 ? (
                      <Link
                        href={`/store/product/${product.id}`}
                        className="btn btn-primary w-100"
                      >
                        View Details
                      </Link>
                    ) : (
                      <button className="btn btn-secondary w-100" disabled>
                        Out of Stock
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
