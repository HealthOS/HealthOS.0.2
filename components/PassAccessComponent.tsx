import React from 'react'
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { DoctorParams } from '@/types/appwrite.types';
import { UpdatePassword } from '@/lib/actions/accounts.actions';
import { updateDoctor } from '@/lib/actions/doctor.actions';

const PassAccessComponent = ({ user }: { user: DoctorParams }) => {

    const [state, setState] = useState('password');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passkey, setPasskey] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handlePasswordChange = async () => {
        if (currentPassword === newPassword) setError('New password cannot be the same as current password');
        else if (currentPassword !== user.password) setError('Current password is incorrect');
        else if (newPassword.length < 7) setError('Password must be at least 8 characters long');
        else {
            try {
                const passwordChance = await UpdatePassword({ currentPassword, newPassword });
                const dataForUp = {
                    userId: user.$id,
                    password: newPassword
                }

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                const dataupdate = await updateDoctor(dataForUp);
                if (passwordChance && dataupdate) setSuccess("Password changed successfully")
                else setError("Failed to change password")
                setTimeout(() => { setError(''); setSuccess('') }, 5000);
            } catch (error) {
                console.log(error)
            }

        }
    }

    const handlePasskeyChange = async () => {

        const dataForUp = {
            userId: user.$id,
            passKey: passkey
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const dataupdate = await updateDoctor(dataForUp);
        if (dataupdate) setSuccess("Passkey changed successfully")
        else setError("Failed to change passkey")
        setTimeout(() => { setError(''); setSuccess('') }, 5000);
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
                                            placeholder='Enter current password'
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
                                            placeholder='Enter new password'
                                            className='w-2/3'
                                            required
                                        />
                                    </div>
                                    {error && <p className='text-red-500'>{error}</p>}
                                    {success && <p className='text-green-500'>{success}</p>}
                                    <Button type="button" onClick={handlePasswordChange} className="w-40">Change Password</Button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className='pl-10 pr-20 m-10'>
                            <p>Your current passkey is <span className='text-green-500'>{user.passKey}</span></p>
                            <form>
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col">
                                        <p className="text-balance text-muted-foreground">

                                        </p>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">New Passkey</Label>
                                        <Input
                                            id="Passkey"
                                            type="password"
                                            value={passkey}
                                            onChange={(e) => setPasskey(e.target.value)}
                                            placeholder='Enter new passkey'
                                            className='w-2/3'
                                            required
                                        />
                                        <p className='text-dark-700 text-[12px]'>PassKey must be exactly 6 characters long</p>
                                        {error && <p className='text-red-500'>{error}</p>}
                                        {success && <p className='text-green-500'>{success}</p>}
                                    </div>

                                    <Button type="button" onClick={handlePasskeyChange} className="w-40">Change Passkey</Button>
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