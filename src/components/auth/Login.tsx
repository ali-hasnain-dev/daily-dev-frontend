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
import { CHECK_CREDENTIALS_URL, LOGIN_URL } from "@/lib/apiEndPoints";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

export default function Login() {
  const [authState, setAuthState] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({
    email: [],
    password: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    myAxios
      .post(CHECK_CREDENTIALS_URL, authState)
      .then((res) => {
        setIsLoading(false);
        const response = res.data;
        if (response.status === 200) {
          signIn("credentials", {
            email: authState.email,
            password: authState.password,
            redirect: true,
            callbackUrl: "/",
          });

          toast.success(response.message);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response?.status === 422) {
          setErrors(err.response.data.errors);
        } else if (err.response?.status === 401) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something went wrong. Please try again again.");
        }
      });
  };
  return (
    <div>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Welcome back to daily.dev</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={handleSubmit}>
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
                  {errors?.email[0]}
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
                  {errors?.password[0]}
                </span>
              </div>
              <div className="mt-4">
                <Button className="w-full" disabled={isLoading}>
                  {isLoading ? "Processing..." : "Login"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
}
