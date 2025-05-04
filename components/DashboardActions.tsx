'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { AnimatePresence, motion } from "motion/react"

import AddAppointment from './forms/AddAppointment';
import PatientForm from './forms/PatientForm';
import { ChevronDown } from 'lucide-react';

const DashboardActions = ({ doctor }: { doctor: string }) => {
    const [openApt, setOpenApt] = useState(false);
    const [openPatientForm, setOpenPatientForm] = useState(false);
    const [ isOpen, setOpen] = useState(false);

    return (
        <div className='w-full space-y-4'>

            <div className='flex gap-4 items-center'>
                <h1 className='text-3xl font-bold'>Actions</h1>
                <ChevronDown onClick={() => { setOpen(!isOpen) }} />
            </div>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="pt-2"><div className='flex gap-4 w-full'>
                            <Card className='min-w-[33%] w-1/3 py-4'>
                                <CardHeader>
                                    <CardTitle className='text-xl text-green-500'>Add New Patient</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <PatientForm />
                                </CardContent>
                            </Card>
                            <div className='space-y-4 w-[50%]'>
                                <div className='border h-32 rounded-xl w-full'></div>
                                <div className='h-32 grid grid-cols-2 gap-4'>
                                    <div className='border h-32 rounded-xl w-full'>

                                    </div>
                                    <div className='border h-32 rounded-xl w-full'></div>
                                    <div className='border h-32 rounded-xl w-full'></div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

                    <Dialog open={openApt} onOpenChange={setOpenApt}>
                        <DialogContent className="shad-dialog sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle></DialogTitle>
                            </DialogHeader>
                            <DialogFooter>
                                <AddAppointment
                                    doctor={doctor}
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
                
        </div >
    )
}

export default DashboardActions