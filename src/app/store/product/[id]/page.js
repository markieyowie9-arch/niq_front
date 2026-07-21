"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Minus, Plus, ChevronRight } from "lucide-react";

import CustomerLayout from "@/components/layouts/CustomerLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function ProductDetail() {
  const params = useParams();
  const id = params?.id;

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

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
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link
          href="/store"
          className="transition-colors hover:text-foreground"
        >
          Store
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link
          href={`/store?category=${product.category}`}
          className="transition-colors hover:text-foreground"
        >
          {product.category}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-medium text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Images */}
        <div>
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`h-16 w-16 overflow-hidden rounded border-2 transition-colors ${
                    activeImage === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="mb-3 text-3xl font-bold tracking-tight">
            {product.name}
          </h1>

          <div className="mb-4">
            <span className="text-2xl font-bold text-primary">
              ₱{product.price}
            </span>
          </div>

          <div className="mb-6 flex items-center gap-2">
            {product.stock > 0 ? (
              <>
                <Badge variant="success">In Stock</Badge>
                <span className="text-sm text-muted-foreground">
                  {product.stock} units available
                </span>
              </>
            ) : (
              <Badge variant="secondary">Out of Stock</Badge>
            )}
          </div>

          <div className="mb-6">
            <h5 className="mb-2 font-semibold">Description</h5>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          {product.stock > 0 && (
            <>
              <div className="mb-4 max-w-xs">
                <label className="mb-2 block text-sm font-medium">
                  Quantity
                </label>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <Input
                    type="number"
                    className="h-10 w-16 rounded-none border-x-0 text-center"
                    value={quantity}
                    min={1}
                    max={product.stock}
                    onChange={(e) =>
                      setQuantity(parseInt(e.target.value) || 1)
                    }
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-2">
                <Button size="lg" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline">
                  Buy Now
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </CustomerLayout>
  );
}
