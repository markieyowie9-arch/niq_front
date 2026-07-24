"use client";

import { useState, useEffect } from "react";
import {
  Printer,
  DollarSign,
  Receipt,
  X,
  Package,
  Users,
  TrendingUp,
  BarChart3 as BarIcon,
} from "lucide-react";

import AdminLayout from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { Badge } from "@/components/ui/badge";
import dataProvider from "@/utils/dataProvider";

const reportTypes = [
  { id: "sales", name: "Sales Report", icon: DollarSign },
  { id: "transactions", name: "Transaction History", icon: Receipt },
  { id: "cancelled", name: "Cancelled Orders", icon: X },
  { id: "inventory", name: "Inventory Status", icon: Package },
  { id: "customers", name: "Customer Analytics", icon: Users },
];

const dateRanges = [
  { id: "week", name: "This Week" },
  { id: "month", name: "This Month" },
  { id: "year", name: "This Year" },
  { id: "custom", name: "Custom Range" },
];

export default function Reports() {
  const [reportType, setReportType] = useState("sales");
  const [dateRange, setDateRange] = useState("month");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        await Promise.all([
          dataProvider.getOrders(),
          dataProvider.getProducts(),
          dataProvider.getInventory(),
        ]);
      } catch (err) {
        /* ignore */
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  const currentReport = reportTypes.find((t) => t.id === reportType);
  const Icon = currentReport?.icon;
  const rangeLabel =
    dateRange === "week"
      ? "This Week"
      : dateRange === "month"
        ? "This Month"
        : dateRange === "year"
          ? "This Year"
          : "Custom Range";

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          Reports & Analytics
        </h2>
        <Button onClick={() => window.print()}>
          <Printer className="mr-2 h-4 w-4" />
          Print Report
        </Button>
      </div>

      {/* Report Controls */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Report Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  {reportTypes.find((t) => t.id === reportType)?.name ||
                    "Select report"}
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  {dateRange === "week"
                    ? "This Week"
                    : dateRange === "month"
                      ? "This Month"
                      : dateRange === "year"
                        ? "This Year"
                        : "Custom Range"}
                </SelectTrigger>
                <SelectContent>
                  {dateRanges.map((range) => (
                    <SelectItem key={range.id} value={range.id}>
                      {range.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {dateRange === "custom" && (
              <>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={customStart}
                    onChange={(e) => setCustomStart(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={customEnd}
                    onChange={(e) => setCustomEnd(e.target.value)}
                  />
                </div>
              </>
            )}
            {dateRange !== "custom" && (
              <div className="flex items-end md:col-span-2">
                <Button className="w-full">Generate Report</Button>
              </div>
            )}
            {dateRange === "custom" && (
              <div className="flex items-end md:col-span-2">
                <Button className="w-full">Generate Report</Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Report Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            {Icon && <Icon className="h-5 w-5" />}
            {currentReport?.name} — {rangeLabel}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {reportType === "sales" && (
            <>
              {/* Summary Cards */}
              <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="border-emerald-200 bg-emerald-600 text-white">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-emerald-100">
                      Total Sales
                    </CardDescription>
                    <CardTitle className="text-2xl text-white">
                      ₱45,678
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-emerald-100">
                      +12% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-sky-200 bg-sky-600 text-white">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-sky-100">
                      Total Orders
                    </CardDescription>
                    <CardTitle className="text-2xl text-white">156</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-sky-100">+8% from last month</p>
                  </CardContent>
                </Card>
                <Card className="border-amber-200 bg-amber-500 text-white">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-amber-50">
                      Average Order Value
                    </CardDescription>
                    <CardTitle className="text-2xl text-white">₱293</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-amber-50">+3% from last month</p>
                  </CardContent>
                </Card>
                <Card className="border-blue-200 bg-blue-600 text-white">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-blue-100">
                      Top Product
                    </CardDescription>
                    <CardTitle className="text-base text-white">
                      Laundry Detergent
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-blue-100">45 units sold</p>
                  </CardContent>
                </Card>
              </div>

              <div className="mb-6 flex h-72 items-center justify-center rounded-lg border bg-muted/40">
                <div className="text-center">
                  <BarIcon className="mx-auto h-10 w-10 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Sales Chart Visualization
                  </p>
                </div>
              </div>

              <h3 className="mb-3 font-semibold">Daily Sales Breakdown</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Products Sold</TableHead>
                    <TableHead>Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2024-02-20</TableCell>
                    <TableCell>12</TableCell>
                    <TableCell>28</TableCell>
                    <TableCell>₱3,450</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2024-02-19</TableCell>
                    <TableCell>15</TableCell>
                    <TableCell>34</TableCell>
                    <TableCell>₱4,230</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2024-02-18</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell>19</TableCell>
                    <TableCell>₱2,180</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </>
          )}

          {reportType === "inventory" && (
            <>
              <div className="mb-6 grid gap-4 md:grid-cols-2">
                <Card className="border-red-200">
                  <CardHeader>
                    <CardDescription className="text-red-600">
                      Critical Stock
                    </CardDescription>
                    <CardTitle className="text-2xl">3 items</CardTitle>
                  </CardHeader>
                </Card>
                <Card className="border-amber-200">
                  <CardHeader>
                    <CardDescription className="text-amber-600">
                      Low Stock
                    </CardDescription>
                    <CardTitle className="text-2xl">8 items</CardTitle>
                  </CardHeader>
                </Card>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Buffer Level</TableHead>
                    <TableHead>Critical Level</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Restocked</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Dishwashing Liquid</TableCell>
                    <TableCell className="font-bold text-red-600">2</TableCell>
                    <TableCell>15</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell>
                      <Badge variant="destructive">Critical</Badge>
                    </TableCell>
                    <TableCell>2024-02-15</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Car Shampoo</TableCell>
                    <TableCell className="font-bold text-amber-600">
                      8
                    </TableCell>
                    <TableCell>15</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell>
                      <Badge variant="warning">Low Stock</Badge>
                    </TableCell>
                    <TableCell>2024-02-10</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </>
          )}

          {reportType === "customers" && (
            <>
              <div className="mb-6 grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardDescription>Total Customers</CardDescription>
                    <CardTitle className="text-2xl">89</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CardDescription>New Customers</CardDescription>
                    <CardTitle className="text-2xl">12</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardDescription>Repeat Customers</CardDescription>
                    <CardTitle className="text-2xl">45%</CardTitle>
                  </CardHeader>
                </Card>
              </div>
              <h3 className="mb-3 font-semibold">Top Customers</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Last Order</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>John Doe</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell>₱5,240</TableCell>
                    <TableCell>2024-02-20</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Jane Smith</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>₱3,890</TableCell>
                    <TableCell>2024-02-19</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </>
          )}

          {(reportType === "transactions" || reportType === "cancelled") && (
            <div className="flex h-72 items-center justify-center rounded-lg border bg-muted/40">
              <p className="text-sm text-muted-foreground">
                {currentReport?.name} report content
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
