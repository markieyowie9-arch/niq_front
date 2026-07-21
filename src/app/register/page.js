"use client";

import Link from "next/link";

import CustomerLayout from "@/components/layouts/CustomerLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Register() {
  return (
    <CustomerLayout>
      <div className="mx-auto max-w-xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">Register</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Security Question *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a question" />
                </SelectTrigger>
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
              <Label>Answer *</Label>
              <Input />
            </div>
            <Button asChild className="w-full">
              <Link href="/customer/register">Continue</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  );
}
