import React from 'react'
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { DoctorParams } from '@/types/appwrite.types';

const PassAccessComponent = ({ user }: { user: DoctorParams }) => {

    const [state, setState] = useState('password');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passkey, setPasskey] =useState('000000');

    const handleChange = async () => {

    }

    return (
        <div className='w-full'>
            <h1 className='text-3xl font-semibold px-10 py-8'>Password & Passkey</h1>
            <section className='border-t min-h-[460px]'>
                <div className='flex'>
                    <p className={`text-lg px-10 py-4 hover:bg-dark-400 hover:cursor-pointer ${state === 'password' ? 'bg-dark-500' : 'bg-dark-300'}`} onClick={() => setState('password')}>Password</p>
                    <p className={`text-lg px-10 py-4 hover:bg-dark-400 hover:cursor-pointer ${state === 'passkey' ? 'bg-dark-500' : 'bg-dark-300'}`} onClick={() => setState('passkey')}>Passkey</p>
                </div>
                {
                    state === 'password' ? (
                        <div className='pl-10 pr-20 m-10'>
                            <form>
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col">
                                        <p className="text-balance text-muted-foreground">
                                            Enter current password and new password to change password
                                        </p>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Current Password</Label>
                                        <Input
                                            id="currentPassword"
                                            type="password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            className='w-2/3'
                                            required
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="email">New Password</Label>
                                        <Input
                                            id="newPassword"
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className='w-2/3'
                                            required
                                        />
                                    </div>
                                    <Button type="button" onClick={handleChange} className="w-40">Change Password</Button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className='pl-10 pr-20 m-10'>
                            <p>Your current passkey is <span className='text-green-500'>{passkey}</span></p>
                            <form>
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col">
                                        <p className="text-balance text-muted-foreground">
                                        
                                        </p>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">New Passkey</Label>
                                        <Input
                                            id="currentPassword"
                                            type="password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            className='w-2/3'
                                            required
                                        />
                                    </div>
                                    <Button type="button" onClick={handleChange} className="w-40">Change Password</Button>
                                </div>
                            </form>
                        </div>

                    )
                }
            </section>
        </div >
    )
}

export default PassAccessComponent