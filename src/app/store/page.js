"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import CustomerLayout from "@/components/layouts/CustomerLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import dataProvider from "@/utils/dataProvider";

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

function StockBadge({ stock }) {
  if (stock === 0)
    return <Badge variant="secondary">Out of Stock</Badge>;
  if (stock < 10)
    return <Badge variant="warning">Low Stock</Badge>;
  return <Badge variant="success">In Stock</Badge>;
}

export default function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const prods = await dataProvider.getProducts();
        if (!mounted) return;
        const list = prods && prods.length ? prods : sampleProducts;
        setProducts(list);
        setCategories(["all", ...new Set(list.map((p) => p.category))]);
      } catch (err) {
        setProducts(sampleProducts);
        setCategories(["all", ...new Set(sampleProducts.map((p) => p.category))]);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <CustomerLayout>
      <div className="grid gap-6 md:grid-cols-4">
        {/* Sidebar */}
        <aside className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "w-full rounded-md px-3 py-2 text-left text-sm transition-colors",
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted",
                  )}
                >
                  {cat === "all" ? "All Products" : cat}
                </button>
              ))}
            </CardContent>
          </Card>
        </aside>

        {/* Product Grid */}
        <div className="md:col-span-3">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className={cn(
                  "flex h-full flex-col overflow-hidden",
                  product.stock === 0 && "opacity-60",
                )}
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
                  <img
                    src={product.image || "/placeholder.jpg"}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-base">{product.name}</CardTitle>
                  <p className="text-lg font-bold text-primary">
                    ₱{product.price}
                  </p>
                </CardHeader>
                <CardContent className="flex-1">
                  <StockBadge stock={product.stock} />
                </CardContent>
                <CardFooter>
                  {product.stock > 0 ? (
                    <Button asChild className="w-full">
                      <Link href={`/store/product/${product.id}`}>
                        View Details
                      </Link>
                    </Button>
                  ) : (
                    <Button className="w-full" disabled>
                      Out of Stock
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
