'use client';

import React, { useState } from 'react'
import { Button } from './ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { getPatient } from '@/lib/actions/patient.actions';
import AppointmentForm from './forms/AppointmentForm';
import BillForm from './forms/BillForm';
import { Patient } from '@/types/appwrite.types';
const ButtonActions = ({ user }: { 
    user: Patient
}) => {

    const [openApt, setOpenApt] = useState(false);
    const [openBill, setOpenBill] = useState(false);

    return (
        <div className='flex gap-2 relative'>
            <Button variant="outline" onClick={() => setOpenApt(true)}>New Appointment</Button>
            <Button variant="outline" onClick={() => setOpenBill(true)}>Add Bill</Button>


            <Dialog open={openApt} onOpenChange={setOpenApt}>
                <DialogContent className="shad-dialog sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                        <AppointmentForm 
                            type='create'
                            userId={user.userId}
                            patientId={user.$id}
                            open={true}
                        />
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={openBill} onOpenChange={setOpenBill}>
                <DialogContent className="shad-dialog sm:max-w-md">
                    <DialogHeader className='space-y-4'>
                        <DialogTitle>Patient billing window...</DialogTitle>
                        <div className='space-y-1'>
                            <p className='text-14-regular text-dark-700'>Patient name: {user.name}</p>
                            <p className='text-14-regular text-dark-700'>Patient ID: {user.userId}</p>
                            <p className='text-14-regular text-dark-700'>Patient Contact: {user.phone}</p>
                        </div>
                    </DialogHeader>
                    <DialogFooter>
                        <BillForm userId={user.userId} patientId={user.$id} setOpenBill={setOpenBill}/>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default ButtonActions
