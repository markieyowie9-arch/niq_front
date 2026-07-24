"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Power } from "lucide-react";

import AdminLayout from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import dataProvider from "@/utils/dataProvider";

const modules = [
  { id: "products", name: "Product Management" },
  { id: "inventory", name: "Inventory Management" },
  { id: "orders", name: "Order Management" },
  { id: "reports", name: "Reports" },
  { id: "employees", name: "Employee Management" },
  { id: "audit", name: "Audit Trail" },
];

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [permissions, setPermissions] = useState({
    products: true,
    inventory: true,
    orders: true,
    reports: false,
    employees: false,
    audit: false,
  });
  const roleLabels = { Admin: "Admin", Employee: "Employee" };
  const [selectedRole, setSelectedRole] = useState("Employee");
  
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const emps = await dataProvider.getEmployees();
        if (!mounted) return;
        setEmployees(emps || []);
      } catch (err) {
        setEmployees([]);
      }
    }
    load();
    return () => (mounted = false);
  }, []);
  
  useEffect(() => {
    if (editingEmployee) {
      setSelectedRole(editingEmployee.role);
    } else if (showAddModal) {
      setSelectedRole("Employee");
    }
  }, [editingEmployee, showAddModal]);

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          Employee Management
        </h2>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>{emp.id}</TableCell>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={emp.role === "Admin" ? "destructive" : "info"}
                    >
                      {emp.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{emp.lastLogin}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        emp.status === "Active" ? "success" : "secondary"
                      }
                    >
                      {emp.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingEmployee(emp)}
                      >
                        <Pencil className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Power className="mr-1 h-3 w-3" />
                        Deactivate
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Employee Modal */}
      <Dialog
        open={showAddModal || !!editingEmployee}
        onOpenChange={(open) => {
          if (!open) {
            setShowAddModal(false);
            setEditingEmployee(null);
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingEmployee ? "Edit Employee" : "Add New Employee"}
            </DialogTitle>
            <DialogDescription>
              {editingEmployee
                ? "Update employee information and permissions."
                : "Create a new employee account and assign module permissions."}
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input defaultValue={editingEmployee?.name} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" defaultValue={editingEmployee?.email} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Contact Number</Label>
                <Input type="tel" />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    {roleLabels[selectedRole] || selectedRole}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Employee">Employee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {!editingEmployee && (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <Label>Confirm Password</Label>
                  <Input type="password" />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>Security Question</Label>
              <Select>
                <SelectTrigger>Select a question</SelectTrigger>
                <SelectContent>
                  <SelectItem value="pet">
                    What was your first pet's name?
                  </SelectItem>
                  <SelectItem value="school">
                    What was your elementary school?
                  </SelectItem>
                  <SelectItem value="mother">
                    What is your mother's maiden name?
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Security Answer</Label>
              <Input />
            </div>

            <div className="space-y-2">
              <Label>Module Permissions</Label>
              <div className="grid gap-2 rounded-md border p-4 md:grid-cols-3">
                {modules.map((module) => (
                  <label
                    key={module.id}
                    className="flex items-center gap-2 text-sm"
                  >
                    <Checkbox
                      id={`perm_${module.id}`}
                      defaultChecked={permissions[module.id]}
                    />
                    <span>{module.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </form>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowAddModal(false);
                setEditingEmployee(null);
              }}
            >
              Cancel
            </Button>
            <Button>
              {editingEmployee ? "Update Employee" : "Add Employee"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
