"use client";

import { useState, useEffect } from "react";
import { Eye, X, Search } from "lucide-react";

import AdminLayout from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
import { Separator } from "@/components/ui/separator";
import dataProvider from "@/utils/dataProvider";

const statusVariant = {
  Pending: "warning",
  Processing: "info",
  Delivered: "success",
  Cancelled: "secondary",
};

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [showCancelled, setShowCancelled] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const o = await dataProvider.getOrders();
      if (!mounted) return;
      setOrders(o || []);
    }
    load();
    return () => (mounted = false);
  }, []);

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
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Order Management</h2>
        <div className="flex items-center gap-2">
          <Badge variant="default">Total: {orders.length}</Badge>
          <Badge variant="warning">
            Pending: {orders.filter((o) => o.status === "Pending").length}
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              {filterStatus === "all" ? "All Status" : filterStatus}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end gap-3">
          <Switch
            id="showCancelled"
            checked={showCancelled}
            onCheckedChange={setShowCancelled}
          />
          <Label htmlFor="showCancelled">Show Cancelled Orders</Label>
        </div>
        <div className="space-y-2">
          <Label>Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search by order ID or customer..."
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>₱{order.total}</TableCell>
                  <TableCell>{order.payment}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[order.status] || "secondary"}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowOrderModal(true);
                        }}
                      >
                        <Eye className="mr-1 h-3 w-3" />
                        View
                      </Button>
                      {order.status !== "Cancelled" &&
                        order.status !== "Delivered" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancelOrder(order.id)}
                          >
                            <X className="mr-1 h-3 w-3" />
                            Cancel
                          </Button>
                        )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Details Modal */}
      <Dialog
        open={showOrderModal}
        onOpenChange={(open) => {
          if (!open) {
            setShowOrderModal(false);
            setSelectedOrder(null);
          }
        }}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details — {selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Review customer, payment, and item information.
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h6 className="mb-2 font-semibold">Customer Information</h6>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Name:</strong> {selectedOrder.customer}
                    </p>
                    <p>
                      <strong>Email:</strong> john.doe@email.com
                    </p>
                    <p>
                      <strong>Contact:</strong> 09123456789
                    </p>
                    <p>
                      <strong>Address:</strong> 123 Main St, City
                    </p>
                  </div>
                </div>
                <div>
                  <h6 className="mb-2 font-semibold">Order Information</h6>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Order Date:</strong> {selectedOrder.date}
                    </p>
                    <p>
                      <strong>Payment Method:</strong> {selectedOrder.payment}
                    </p>
                    <p className="flex items-center gap-2">
                      <strong>Status:</strong>
                      <Badge
                        variant={
                          statusVariant[selectedOrder.status] || "secondary"
                        }
                      >
                        {selectedOrder.status}
                      </Badge>
                    </p>
                    <p>
                      <strong>Order Code:</strong>{" "}
                      <span className="font-mono">{selectedOrder.id}</span>
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h6 className="mb-2 font-semibold">Items</h6>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Laundry Detergent</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>₱120</TableCell>
                      <TableCell>₱240</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Dishwashing Liquid</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>₱85</TableCell>
                      <TableCell>₱85</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3} className="text-right">
                        <strong>Subtotal:</strong>
                      </TableCell>
                      <TableCell>₱325</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3} className="text-right">
                        <strong>VAT (12%):</strong>
                      </TableCell>
                      <TableCell>₱39</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3} className="text-right">
                        <strong>Delivery Fee:</strong>
                      </TableCell>
                      <TableCell>₱50</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3} className="text-right">
                        <strong>Total:</strong>
                      </TableCell>
                      <TableCell>
                        <strong>₱414</strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowOrderModal(false);
                setSelectedOrder(null);
              }}
            >
              Close
            </Button>
            {selectedOrder?.status === "Pending" && (
              <Button>Mark as Processing</Button>
            )}
            {selectedOrder?.status === "Processing" && (
              <Button>Mark as Delivered</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
