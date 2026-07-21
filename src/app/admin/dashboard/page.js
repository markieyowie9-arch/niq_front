"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Plus,
  Package,
  BarChart3,
  TrendingUp,
  ShoppingBag,
  Boxes,
  AlertCircle,
} from "lucide-react";

import AdminLayout from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dataProvider from "@/utils/dataProvider";

const statusVariant = {
  Delivered: "success",
  Processing: "info",
  Pending: "warning",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    lowStock: 0,
    criticalStock: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [criticalItems, setCriticalItems] = useState([]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const [products, orders] = await Promise.all([
          dataProvider.getProducts(),
          dataProvider.getOrders(),
        ]);
        if (!mounted) return;
        const totalSales = orders.reduce((s, o) => s + (o.total || 0), 0);
        const totalOrders = orders.length;
        const lowStock = (products || []).filter((p) => p.stock <= 10).length;
        const criticalStock = (products || []).filter(
          (p) => p.stock === 0,
        ).length;
        setStats({ totalSales, totalOrders, lowStock, criticalStock });
        setRecentOrders((orders || []).slice(0, 3));
        setCriticalItems(
          (products || [])
            .filter((p) => p.stock <= 5)
            .map((p) => ({
              product: p.name || p.product || p.id,
              stock: p.stock,
              threshold: 5,
            })),
        );
      } catch (err) {
        /* keep defaults */
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <span className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString()}
        </span>
      </div>

      {/* Stats Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-blue-200 bg-blue-600 text-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-blue-100">
              Total Sales
            </CardDescription>
            <CardTitle className="text-3xl text-white">
              ₱{stats.totalSales.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-blue-100">This month</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-600 text-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-emerald-100">
              Total Orders
            </CardDescription>
            <CardTitle className="text-3xl text-white">
              {stats.totalOrders}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-emerald-100">This month</p>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-500 text-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-amber-50">
              Low Stock Items
            </CardDescription>
            <CardTitle className="text-3xl text-white">
              {stats.lowStock}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-amber-50">Below buffer level</p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-600 text-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-red-100">
              Critical Stock
            </CardDescription>
            <CardTitle className="text-3xl text-white">
              {stats.criticalStock}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-red-100">Need immediate attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Critical Stock Alert */}
      {criticalItems.length > 0 && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Critical Stock Alert</AlertTitle>
          <AlertDescription>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              {criticalItems.map((item, index) => (
                <li key={index}>
                  {item.product} — Only {item.stock} left (Threshold:{" "}
                  {item.threshold})
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Recent Orders</CardTitle>
            <Button asChild size="sm">
              <Link href="/admin/orders">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>₱{order.total}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[order.status] || "secondary"}>
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button asChild variant="outline" className="justify-start">
              <Link href="/admin/products/add">
                <Plus className="mr-2 h-4 w-4" /> Add New Product
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/admin/inventory">
                <Package className="mr-2 h-4 w-4" /> Update Inventory
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/admin/reports">
                <BarChart3 className="mr-2 h-4 w-4" /> Generate Report
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
