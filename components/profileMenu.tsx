'use client'

import { User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getUser, logout } from '@/lib/actions/accounts.actions'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Loader from './loader/loader'
import { useLoader } from '@/src/app/context/LoaderContext'
import PasskeyModal from './PasskeyModal'


const ProfileMenu = () => {


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

            <DropdownMenu >
                <DropdownMenuTrigger>
                    <User className="" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className='bg-dark-200 w-30 lg:mr-28'>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='border-b p-0'>
                        <Link href={`/doctor/${userId}/profile`}
                            className='px-2 py-1.5 w-full h-full'
                            onClick={() => { setLoader(true) }}
                        >
                            Profile
                        </Link>

                    </DropdownMenuItem>
                    <DropdownMenuItem className='border-b p-0 '>
                        <Link href={`${pathname}/?admin=true`}
                            className='px-2 py-1.5 w-full h-full'
                            onClick={() => { setLoader(true) }}
                        >
                            Dashboard
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='border-b p-0'>
                        <Link href={`/allPatients/${userId}/list`}
                            className='px-2 py-1.5 w-full h-full'
                            onClick={() => { setLoader(true) }}
                        >
                            Patients
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='border-b p-0'>
                        <Link href={`/allPatients/${userId}/list/bills`}
                            className='px-2 py-1.5 w-full h-full'
                            onClick={() => { setLoader(true) }}
                        >
                            Bills
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {loader &&
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-[9999]">
                    <Loader />
                </div>}
        </div>
    )
}

export default ProfileMenu
