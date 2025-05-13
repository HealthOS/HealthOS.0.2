"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { createSession, getUser, logout } from "@/lib/actions/accounts.actions";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useLoader } from "@/src/app/context/LoaderContext";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showLoader, hideLoader } = useLoader();
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const storedUser = localStorage.getItem("appwriteUser")
      ? JSON.parse(localStorage.getItem("appwriteUser")!)
      : null;
    
    console.log("Retrieved user", storedUser);
    
      if (storedUser) {
        showLoader();
        try {
          let user = await getUser();
          console.log("Current user", user);
          if(user) router.push(`/admin/${user.$id}/dashboard`);
        } catch (error: any) {
          console.warn("Session expired:", error.message);
          localStorage.removeItem("appwriteUser");
        }
        hideLoader();
      }
    };

    checkSession();
  }, []);

  const handleLogin = async () => {
    setError("");
    let session = await createSession({ email, password });
    if (session.error) {
      if(session.message==="Invalid `password` param: Password must be between 8 and 256 characters long.")
        setError("Incorrect Password")
      else if(session.message==="Invalid `email` param: Value must be a valid email address")
        setError("Invalid Email address")
      else setError(session.message)
    } else {
      showLoader();
      let user = await getUser();
      console.log("Current user", user);
      localStorage.setItem("appwriteUser", JSON.stringify(user)); // ✅ Correct
      router.push(`/admin/${user.$id}/dashboard`);
      hideLoader();
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden bg-dark-300">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your HealthOS account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} required />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="button" 
                  onClick={handleLogin} 
                  variant="ghost" 
                  className="w-full bg-dark-400"
                  >
                    Login
                  </Button>
              
              <p className="text-center text-sm">
                Don't have an account? 
                <Link href='/login/signUp' className="text-green-500 underline"> Sign Up</Link>
              </p>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/assets/images/5.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default LoginForm;
