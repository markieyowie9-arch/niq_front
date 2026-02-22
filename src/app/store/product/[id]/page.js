"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import CustomerLayout from "@/components/layouts/CostumerLayout";

export default function ProductDetail() {
  const params = useParams();
  const id = params?.id; // get dynamic route param

  const [quantity, setQuantity] = useState(1);

  const [product] = useState({
    id: id,
    name: "Laundry Detergent",
    price: 120,
    stock: 15,
    description:
      "High-quality laundry detergent for all fabric types. Leaves clothes clean and fresh.",
    images: ["/product1.jpg", "/product1-2.jpg"],
    category: "Detergent",
  });

  const handleAddToCart = () => {
    alert(`Added ${quantity} item(s) to cart`);
  };

  return (
    <CustomerLayout>
      <div className="row">
        {/* Breadcrumb */}
        <div className="col-12 mb-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/store">Store</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href={`/store?category=${product.category}`}>
                  {product.category}
                </Link>
              </li>
              <li className="breadcrumb-item active">{product.name}</li>
            </ol>
          </nav>
        </div>

        {/* Product Images */}
        <div className="col-md-6">
          <div
            id="productCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {product.images.map((img, index) => (
                <div
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  key={index}
                >
                  <img
                    src={img}
                    className="d-block w-100"
                    alt={product.name}
                    style={{ height: "400px", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="col-md-6">
          <h1 className="mb-3">{product.name}</h1>

          <div className="mb-3">
            <span className="h2 text-primary">₱{product.price}</span>
          </div>

          <div className="mb-3">
            {product.stock > 0 ? (
              <>
                <span className="badge bg-success me-2">In Stock</span>
                <span className="text-muted">
                  {product.stock} units available
                </span>
              </>
            ) : (
              <span className="badge bg-secondary">Out of Stock</span>
            )}
          </div>

          <div className="mb-4">
            <h5>Description</h5>
            <p className="text-muted">{product.description}</p>
          </div>

          {product.stock > 0 && (
            <>
              <div className="row mb-4">
                <div className="col-md-4">
                  <label className="form-label">Quantity</label>
                  <div className="input-group">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>

                    <input
                      type="number"
                      className="form-control text-center"
                      value={quantity}
                      min="1"
                      max={product.stock}
                      onChange={(e) =>
                        setQuantity(parseInt(e.target.value) || 1)
                      }
                    />

                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() =>
                        setQuantity(Math.min(product.stock, quantity + 1))
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
                <button className="btn btn-outline-primary btn-lg">
                  Buy Now
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </CustomerLayout>
  );
}
