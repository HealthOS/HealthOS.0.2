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
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLoader } from '@/app/context/LoaderContext'
import Loader from './loader/loader'


const ProfileMenu = () => {

    const [userId, setUser] = useState(null);
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
        await logout();
        localStorage.removeItem("appwriteUser");
        router.push('/login')
    }

    return (
        <div>
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
                        <Link href="/?admin=true"
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
