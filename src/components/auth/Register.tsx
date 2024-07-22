"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import myAxios from "@/lib/axios.config";
import { REGISTER_URL } from "@/lib/apiEndPoints";
import { toast } from "react-toastify";

export default function Register() {
  const [authState, setAuthState] = useState({
    name: "",
    user_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({
    name: [],
    user_name: [],
    email: [],
    password: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    myAxios
      .post(REGISTER_URL, authState)
      .then((res) => {
        setIsLoading(false);
        const response = res.data;
        toast.success(response.message);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response?.status === 422) {
          setErrors(err.response.data.errors);
        } else {
          toast.error("Something went wrong. Please try again again.");
        }
      });
  };

  return (
    <div>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Welcome to daily.dev</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={handleSubmit}>
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={authState.name}
                  onChange={(e) =>
                    setAuthState({ ...authState, name: e.target.value })
                  }
                  placeholder="Enter name"
                />
                <span className="text-red-500 font-semibold text-sm">
                  {errors.name?.[0]}
                </span>
              </div>
              <div className="space-y-1">
                <Label htmlFor="user_name">User Name</Label>
                <Input
                  id="user_name"
                  type="text"
                  value={authState.user_name}
                  onChange={(e) =>
                    setAuthState({ ...authState, user_name: e.target.value })
                  }
                  placeholder="Enter user name"
                />
                <span className="text-red-500 font-semibold text-sm">
                  {errors.user_name?.[0]}
                </span>
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={authState.email}
                  onChange={(e) =>
                    setAuthState({ ...authState, email: e.target.value })
                  }
                  placeholder="Enter email"
                />
                <span className="text-red-500 font-semibold text-sm">
                  {errors.email?.[0]}
                </span>
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={authState.password}
                  onChange={(e) =>
                    setAuthState({ ...authState, password: e.target.value })
                  }
                  placeholder="Enter password"
                />
                <span className="text-red-500 font-semibold text-sm">
                  {errors.password?.[0]}
                </span>
              </div>

              <div className="space-y-1">
                <Label htmlFor="cpassword">Confirm Password</Label>
                <Input
                  id="cpassword"
                  type="password"
                  value={authState.password_confirmation}
                  onChange={(e) =>
                    setAuthState({
                      ...authState,
                      password_confirmation: e.target.value,
                    })
                  }
                  placeholder="Enter password Confirmation"
                />
              </div>
              <div className="mt-4">
                <Button className="w-full" disabled={isLoading}>
                  {isLoading ? "Processing..." : "Signup"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
}
