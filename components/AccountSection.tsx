'use client';

import React, { useState } from 'react'
import { Lock, LogOut, Trash2, User2 } from 'lucide-react';
import ProfileComponent from './ProfileComponent';
import PassAccessComponent from './PassAccessComponent';
import DeleteComponent from './DeleteComponent';
import { DoctorParams } from '@/types/appwrite.types';
import LogoutComponent from './LogoutComponent';

const AccountSection = ({ user }: { user: DoctorParams }) => {

    const [state, setState] = useState("");

    return (
        <main className='border flex h-full rounded-lg'>
            <section className=' w-64 max-w-60 h-full p-3'>
                <div className='py-3 px-2 gap-2 flex items-center hover:cursor-pointer hover:bg-green-500 rounded-xl' onClick={() => setState('profile')}>
                    <User2 className='h-5' fill='white' strokeWidth='0' />
                    <p className='text-14-regular'>My Profile</p>
                </div>
                <div className='py-3 px-2 gap-2 flex items-center hover:cursor-pointer hover:bg-green-500 rounded-xl' onClick={() => setState('passAccess')}>
                    <Lock className='h-5' />
                    <p className='text-14-regular' >
                        Password
                    </p>
                </div>
                <div className='py-3 px-2 gap-2 flex items-center hover:cursor-pointer hover:bg-red-800 rounded-xl' onClick={() => setState('logout')}>
                    <LogOut className='h-5' />
                    <p className='text-14-regular' >
                        Logout Account
                    </p>
                </div>
                <div className='py-3 px-2 gap-2 flex items-center hover:cursor-pointer text-red-400 hover:bg-red-800 hover:text-white rounded-xl' onClick={() => setState('delete')}>
                    <Trash2 className='h-5' />
                    <p className='text-14-regular' >
                        Delete Account
                    </p>
                </div>
            </section>
            <section className="w-full h-full border-l">
                {
                    (() => {
                        switch (state) {
                            case 'profile':
                                return <ProfileComponent
                                    user={user}
                                />;
                            case 'passAccess':
                                return <PassAccessComponent
                                    user={user}
                                />;
                            case 'delete':
                                return <DeleteComponent
                                    user={user}
                                />;
                            case 'logout':
                                return <LogoutComponent name={user.name}/>;
                            default:
                                return <ProfileComponent
                                    user={user}
                                />;
                        }
                    })()
                }
            </section>

        </main>

    )
}

export default AccountSection