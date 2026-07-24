"use client";

import { useState, useEffect } from "react";
import { BarChart3, AlertTriangle, Search } from "lucide-react";

import AdminLayout from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
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

const stockStatus = {
  critical: {
    label: "Critical",
    variant: "destructive",
    text: "text-red-600 font-semibold",
  },
  low: {
    label: "Low Stock",
    variant: "warning",
    text: "text-amber-600 font-semibold",
  },
  good: { label: "Good", variant: "success", text: "" },
};

export default function InventoryManagement() {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          Inventory Management
        </h2>
        <Button
          variant="success"
          onClick={() => {
            /* generate report */
          }}
        >
          <BarChart3 className="mr-2 h-4 w-4" />
          Generate Inventory Report
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select>
          <SelectTrigger>All Status</SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="critical">Critical Only</SelectItem>
            <SelectItem value="low">Low Stock</SelectItem>
            <SelectItem value="good">Good Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Critical Stock Section */}
      {filteredCritical.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Critical Stock — Immediate Action Needed
          </h3>
          <Card className="border-red-200">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-red-50">
                    <TableHead>Product</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Critical Level</TableHead>
                    <TableHead>Buffer Level</TableHead>
                    <TableHead>ML Suggestion</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCritical.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.product}</TableCell>
                      <TableCell className="font-bold text-red-600">
                        {item.stock}
                      </TableCell>
                      <TableCell>{item.critical}</TableCell>
                      <TableCell>{item.buffer}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge variant="info">{item.mlSuggestion}</Badge>
                          <Button variant="link" size="sm" className="h-auto p-0">
                            Apply
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{item.lastUpdated}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedProduct(item);
                            setShowEditModal(true);
                          }}
                        >
                          Update Stock
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* All Inventory */}
      <div>
        <h3 className="mb-3 text-lg font-semibold">All Inventory</h3>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Buffer Level</TableHead>
                  <TableHead>Critical Level</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>ML Suggestion</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOther.map((item) => {
                  const status = getStockStatus(item);
                  const s = stockStatus[status];
                  return (
                    <TableRow key={item.id}>
                      <TableCell>{item.product}</TableCell>
                      <TableCell className={s.text}>{item.stock}</TableCell>
                      <TableCell>{item.buffer}</TableCell>
                      <TableCell>{item.critical}</TableCell>
                      <TableCell>
                        <Badge variant={s.variant}>{s.label}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge variant="info">{item.mlSuggestion}</Badge>
                          <Button variant="link" size="sm" className="h-auto p-0">
                            Apply
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{item.lastUpdated}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedProduct(item);
                            setShowEditModal(true);
                          }}
                        >
                          Update Stock
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Update Stock Modal */}
      <Dialog
        open={showEditModal}
        onOpenChange={(open) => {
          if (!open) {
            setShowEditModal(false);
            setSelectedProduct(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Update Stock — {selectedProduct?.product}
            </DialogTitle>
            <DialogDescription>
              Adjust stock levels and reorder thresholds for this product.
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <form className="space-y-4">
              <div className="space-y-2">
                <Label>Current Stock</Label>
                <Input
                  type="number"
                  defaultValue={selectedProduct.stock}
                />
              </div>
              <div className="space-y-2">
                <Label>Buffer Level</Label>
                <Input
                  type="number"
                  defaultValue={selectedProduct.buffer}
                />
              </div>
              <div className="space-y-2">
                <Label>Critical Level</Label>
                <Input
                  type="number"
                  defaultValue={selectedProduct.critical}
                />
              </div>
              <div className="space-y-2">
                <Label>ML Suggested Threshold</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={selectedProduct.mlSuggestion}
                    readOnly
                  />
                  <Button variant="outline" type="button">
                    Apply ML Suggestion
                  </Button>
                </div>
              </div>
            </form>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowEditModal(false);
                setSelectedProduct(null);
              }}
            >
              Cancel
            </Button>
            <Button>Update Stock</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
