'use client';

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { getUser, logout } from '@/lib/actions/accounts.actions'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { useLoader } from '@/src/app/context/LoaderContext'

import { Calendar, Home, Inbox, IndianRupee, LayoutDashboard, List, ListPlus, LogOut, Search, Settings, User } from "lucide-react"
import { useEffect, useState } from "react";
import Link from "next/link";
import PasskeyModal from "../PasskeyModal";
import Loader from "../loader/loader";


export function AppSidebar() {

    const searchParams = useSearchParams();
    const isAdmin = searchParams.get("admin") === "true";

    const [userId, setUser] = useState(null);
    const [loader, setLoader] = useState(false);
    const { showLoader, hideLoader } = useLoader();
    const pathname = usePathname();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                showLoader();
                const userData = await getUser();
                setUser(userData.targets?.[0]?.userId);
                hideLoader();
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, []);

    const router = useRouter();

    const handleLogout = async () => {
        setLoader(true)
        await logout();
        localStorage.removeItem("appwriteUser");
        router.push('/login')
    }

    return (
        <div>
            {isAdmin && <PasskeyModal
                doctor={userId || ""}
            />}

            <Sidebar variant="floating"
            >
                <SidebarHeader className="font-bold text-green-500 ml-2">HealthOS</SidebarHeader>
                <SidebarContent className="border-t-2 border-dark-500">
                    <SidebarGroup >
                        <SidebarGroupLabel>Application</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>

                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild
                                    className="hover:bg-green-500"
                                    >
                                        <Link href="/">
                                            <Home />
                                            <span>Home</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild
                                    className="hover:bg-green-500"
                                    >
                                        <Link href={`${pathname}/?admin=true`}
                                            onClick={() => { setLoader(true) }}
                                        >
                                            <LayoutDashboard />
                                            <span>Dashboard</span>

                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild
                                    className="hover:bg-green-500"
                                    >
                                        <Link href={`${pathname}/?admin=true`}
                                            onClick={() => { setLoader(true) }}
                                        >
                                            <User />
                                            <span>Add Patient</span>

                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild
                                    className="hover:bg-green-500"
                                    >
                                        <Link href={`${pathname}/?admin=true`}
                                            onClick={() => { setLoader(true) }}
                                        >
                                            <ListPlus />
                                            <span>Add Appointment</span>

                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild
                                    className="hover:bg-green-500"
                                    >
                                        <Link href={`/allPatients/${userId}/list`}
                                            onClick={() => { setLoader(true) }}
                                        >
                                            <List />
                                            <span>All Patients</span>

                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild
                                    className="hover:bg-green-500"
                                    >
                                        <Link href={`/allPatients/${userId}/list/bills`}
                                            onClick={() => { setLoader(true) }}
                                        >
                                            <IndianRupee />
                                            <span>Bills</span>

                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    <SidebarGroup>
                        <SidebarGroupLabel>Account</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>

                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild
                                    className="hover:bg-green-500"
                                    >
                                        <Link href={`/doctor/${userId}/profile`}
                                            onClick={() => { setLoader(true) }}
                                        >
                                            <User />
                                            <span>My Profile</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <SidebarMenuItem className="cursor-pointer">
                                    <SidebarMenuButton asChild
                                        onClick={handleLogout}
                                        className="text-red-500 hover:bg-red-800"
                                    >
                                        <p>
                                            <LogOut />
                                            <span>Logout</span>
                                        </p>

                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>

            {loader &&
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-[9999]">
                    <Loader />
                </div>}
        </div>
    )
}
