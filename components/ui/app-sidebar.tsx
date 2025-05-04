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

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { getUser, logout } from '@/lib/actions/accounts.actions'
import { useRouter } from 'next/navigation'

import { useLoader } from '@/src/app/context/LoaderContext'

import { IndianRupee, LayoutDashboard, List, ListPlus, LogOut, User, UserPlus } from "lucide-react"
import { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "../loader/loader";
import PatientForm from "../forms/PatientForm";
import AddAppointment from "../forms/AddAppointment";


export function AppSidebar() {

    const [openApt, setOpenApt] = useState(false);
    const [openPatientForm, setOpenPatientForm] = useState(false);
    const [userId, setUser] = useState("");
    const [loader, setLoader] = useState(false);
    const { showLoader, hideLoader } = useLoader();

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

            <Sidebar variant="floating"
            >
                <SidebarHeader className="font-bold text-green-500 ml-2">HealthOS</SidebarHeader>
                <SidebarContent className="border-t-2 border-dark-500">
                    <SidebarGroup >
                        <SidebarGroupLabel>Actions</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>

                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild
                                        onClick={() => { setOpenPatientForm(true) }}
                                        className="hover:bg-green-500 cursor-pointer"
                                    >
                                        <p>
                                            <UserPlus />
                                            <span>Add Patient</span>

                                        </p>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild
                                        className="hover:bg-green-500 cursor-pointer"
                                        onClick={() => { setOpenApt(true) }}
                                    >
                                        <p>
                                            <ListPlus />
                                            <span>Add Appointment</span>

                                        </p>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    <SidebarGroup >
                        <SidebarGroupLabel>Explore</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>

                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild
                                        className="hover:bg-green-500"
                                    >
                                        <Link href={`/admin/${userId}/dashboard`}
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


            <Dialog open={openApt} onOpenChange={setOpenApt}>
                <DialogContent className="shad-dialog sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                        <AddAppointment
                            doctor={userId}
                            open={openApt}
                            setOpen={setOpenApt}                                       
                            />
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={openPatientForm} onOpenChange={setOpenPatientForm}>
                <DialogContent className="shad-dialog sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                        <PatientForm
                        />
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {loader &&
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-[9999]">
                    <Loader />
                </div>}
        </div>
    )
}
