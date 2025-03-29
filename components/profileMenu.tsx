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


const ProfileMenu = () => {

    const [userId, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser();
                setUser(userData.targets?.[0]?.userId);
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
                    <DropdownMenuItem className='border-b'>
                        <Link href={`/doctor/${userId}/profile`} >
                            Profile
                        </Link>

                    </DropdownMenuItem>
                    <DropdownMenuItem className='border-b'>
                        <Link href="/?admin=true">
                            Dashboard
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='border-b'>
                        <Link href={`/allPatients/${userId}/list`}>
                            Patients
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='border-b'>
                        <Link href={`/allPatients/${userId}/list/bills`}>
                            Bills
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>


        </div>
    )
}

export default ProfileMenu
