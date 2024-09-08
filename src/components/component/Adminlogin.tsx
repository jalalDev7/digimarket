"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { trpc } from "@/app/_trpc/client";

const AdminLogin = () => {
  const { mutate: login } = trpc.adminLogin.useMutation({
    onSuccess: () => {},
    onError: (error) => {
      console.log(5, error);
      setError(error.message);
    },
  });

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>();

  const submitLogin = () => {
    if (!username || !password) {
      setError("Please enter a username and password");
    } else {
      login({ username: username, password: password });
    }
  };
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Sign in to your account
          </h1>
          <p className="mt-2 text-muted-foreground">
            Enter your username and password below.
          </p>
          {error ? (
            <p className="mt-2 text-muted-foreground text-red-500">{error}</p>
          ) : null}
        </div>
        <Card>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.currentTarget.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              onClick={() => submitLogin()}
            >
              Sign in
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
export default AdminLogin;
