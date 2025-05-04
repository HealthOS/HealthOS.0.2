import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/actions/accounts.actions';

const LogoutComponent = ({name}:{
        name: string
    }) => {

    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        localStorage.removeItem("appwriteUser");
        router.push('/login')
    }

    return (
        <div className='w-full'>
            <h1 className='text-3xl font-semibold px-10 py-8'>Logout</h1>
            <section className='border-t'>
                    <div className='flex gap-2'>
                        <div className='pl-10 pr-20 m-10 flex flex-col gap-6'>
                            <p>Logout your account: {name}</p>
                            <Button type="button" className="w-full bg-red-500 hover:bg-red-950 hover:text-white" onClick={handleLogout}>
                                Logout Account
                            </Button>
                        </div>
                    </div>
            </section>
        </div>
    )
}

export default LogoutComponent