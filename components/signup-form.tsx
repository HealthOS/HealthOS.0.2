"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createAccount, createSession, getUser, logout } from "@/lib/actions/accounts.actions";
import { cn, parseStringify } from "@/lib/utils";
import Link from "next/link";
import { registerDoctor } from "@/lib/actions/doctor.actions";

export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        phone: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        setError("");
        let session = await createSession(formData);
        if (session.error) {
            if (session.message === "Invalid `password` param: Password must be between 8 and 256 characters long.")
                setError("Incorrect Password")
            else if (session.message === "Invalid `email` param: Value must be a valid email address")
                setError("Invalid Email address")
            else setError(session.message)
        } else {
            let user = await getUser();
            console.log("Current user", user);
            localStorage.setItem("appwriteUser", parseStringify(user));
            router.push(`/admin/${user.$id}/dashboard`);
        }
    };

    const handleSignUp = async () => {
        setError("");
        try {
            let newDoctor = await createAccount(formData);
            if(newDoctor===409){
                setError("Email already exists")
            }
            else if (newDoctor.error){
                setError(newDoctor.message)
            }

            else{
                console.log("Account created");
                console.log(newDoctor);
                let userId = newDoctor.$id;
                const docData = {
                    userId,
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone
                };
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                let doctorData = await registerDoctor(docData);
                if (doctorData) handleLogin();
            }
        } catch (error: any) {
            setError("Sign-up failed. Try again.");
            console.error("Sign-up error:", error.message);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-auto bg-dark-300">
                <CardContent className="h-full grid p-0 md:grid-cols-2">
                    <form className="remove-scrollbar p-6 md:p-8 ">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Welcome Doctor</h1>
                                <p className="text-balance text-muted-foreground">
                                    Create your HealthOS account
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    name="name"
                                    type="input"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required />
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            {(formData.password === formData.confirmPassword && formData.password.length > 6 && (formData.name || formData.email || formData.phone )) ?
                                <Button type="button" onClick={handleSignUp} variant="ghost" className="w-full bg-dark-400">Sign Up</Button>
                                : <div className="inline-flex items-center justify-center bg-dark-400 p-2 gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-default opacity-50" onClick={()=>setError("Kindly enter valid data in each field to proceed.")}>Sign Up</div>
                            }
                            
                            <p className="text-center text-sm">
                                Already have an account?
                                <Link href='/login' className="text-green-500 underline"> Login</Link>
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

export default SignupForm;
