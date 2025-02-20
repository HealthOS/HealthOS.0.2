'use client';

import React, { useState } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation';
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
const ButtonActions = ({ userId, patientId }: { 
    userId: string
    patientId: string
}) => {

    const router = useRouter();
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
                            userId={userId}
                            patientId={patientId}
                        />
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={openBill} onOpenChange={setOpenBill}>
                <DialogContent className="shad-dialog sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Billing window</DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                        Feature will be added soon...
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default ButtonActions
