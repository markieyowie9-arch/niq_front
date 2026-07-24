"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

import AdminLayout from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import dataProvider from "@/utils/dataProvider";

const stockVariant = (stock) => {
  if (stock === 0) return "destructive";
  if (stock < 10) return "warning";
  return "success";
};

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const prods = await dataProvider.getProducts();
      if (!mounted) return;
      setProducts(prods || []);
    }
    load();
    return () => (mounted = false);
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          Product Management
        </h2>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="space-y-2 md:col-span-1">
          <Label>Search</Label>
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Select>
            <SelectTrigger>All Categories</SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Detergent">Detergent</SelectItem>
              <SelectItem value="Dishwashing">Dishwashing</SelectItem>
              <SelectItem value="Car Care">Car Care</SelectItem>
              <SelectItem value="Cleaning">Cleaning</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          <Select>
            <SelectTrigger>All Status</SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                    <div className="h-12 w-12 rounded bg-muted" />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>₱{product.price}</TableCell>
                  <TableCell>
                    <Badge variant={stockVariant(product.stock)}>
                      {product.stock}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.status === "Active" ? "success" : "secondary"
                      }
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingProduct(product)}
                      >
                        <Pencil className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="mr-1 h-3 w-3" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Product Modal */}
      <Dialog
        open={showAddModal || !!editingProduct}
        onOpenChange={(open) => {
          if (!open) {
            setShowAddModal(false);
            setEditingProduct(null);
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
            <DialogDescription>
              {editingProduct
                ? "Update product details and inventory thresholds."
                : "Create a new product entry for your catalog."}
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Product Name *</Label>
                <Input required />
              </div>
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select>
                  <SelectTrigger>Select Category</SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Detergent">Detergent</SelectItem>
                    <SelectItem value="Dishwashing">Dishwashing</SelectItem>
                    <SelectItem value="Car Care">Car Care</SelectItem>
                    <SelectItem value="Cleaning">Cleaning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Price *</Label>
                <div className="flex">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 bg-muted px-3 text-sm text-muted-foreground">
                    ₱
                  </span>
                  <Input type="number" className="rounded-l-none" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Stock Quantity *</Label>
                <Input type="number" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description *</Label>
              <Textarea rows={3} required />
            </div>

            <div className="space-y-2">
              <Label>Product Images *</Label>
              <Input type="file" multiple accept="image/*" required />
              <p className="text-xs text-muted-foreground">
                You can select multiple images
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Buffer Level</Label>
                <Input type="number" placeholder="Default: 10" />
              </div>
              <div className="space-y-2">
                <Label>Critical Level</Label>
                <Input type="number" placeholder="Default: 5" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <RadioGroup defaultValue="active" className="flex gap-6">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="active" id="statusActive" />
                  <Label htmlFor="statusActive">Active</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="inactive" id="statusInactive" />
                  <Label htmlFor="statusInactive">Inactive</Label>
                </div>
              </RadioGroup>
            </div>
          </form>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowAddModal(false);
                setEditingProduct(null);
              }}
            >
              Cancel
            </Button>
            <Button>
              {editingProduct ? "Update Product" : "Save Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
