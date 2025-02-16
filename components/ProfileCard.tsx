'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import React, { useState } from 'react'
import { UserMinus, Mail, Clipboard, BookUser } from 'lucide-react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { deleteAppointment, deletePatient, deleteProfile, getUser } from '@/lib/actions/patient.actions';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProfileCard = ({ userId, name, phone, gender, birthDate, address, occupation, email, emergencyContactName, emergencyContactNumber }: {
    userId: string
    name: string
    phone: string
    gender: string
    birthDate: string
    address: string
    occupation: string
    email: string
    emergencyContactName: string
    emergencyContactNumber: string
}) => {

    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [openLoading, setLoadingOpen] = useState(false);
    const [patient, setPatient] = useState(false);
    const [apt, setApt] = useState(false);
    const [user, setUser] = useState(false);
    const [del, setDel] = useState(0);

    const handleDelete = async () => {

        setLoadingOpen(true);
        setDel(1);
        setPatient(true);
        const deleteAppointments = await deleteAppointment(userId);
        setPatient(false);
        setApt(true);
        const deleteProfileData = await deleteProfile(userId);
        setApt(false);
        setUser(true);
        const userDeleted = await deletePatient(userId);
        setUser(false);
        setDel(2);
    }

    const closeModal = () => {
        setOpen(false);
    }

    const handleCopy = ({ text, value }: {
        text: string
        value: string
    }) => {
        navigator.clipboard.writeText(value);
        toast(`${text}: ${value} Copied`,
            {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                style: { backgroundColor: "#363A3D", color: "white" },
                transition: Bounce,
            }
        );
    }
    return (
        <div className='flex flex-col items-center justify-center gap-y-1'>
            <div className='h-24 w-24 flex items-center justify-center rounded-full bg-dark-600 border-4 border-dark-400'>
                <p className='text-5xl font-medium text-dark-300'> {name[0]}</p>
            </div>
            <p>{name}</p>
            <div className="flex items-center">
                <TooltipProvider>
                    <Tooltip>
                        <div className="flex" onClick={() => handleCopy({ text: "Phone number", value: phone })}>
                            <p className='text-16-regular text-dark-700 ml-1 cursor-pointer'>{phone}</p>
                            <TooltipTrigger>
                                <div className="bg-dark-400 h-5 w-5 mx-2 rounded-lg flex items-center justify-center border border-dark-500">
                                    <Clipboard className="h-3 w-3 text-dark-600" />
                                </div>
                            </TooltipTrigger>
                        </div>
                        <TooltipContent className='bg-dark-300 rounded-md'>
                            <p>Click to copy</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            <div className='text-14-regular text-dark-700'>{gender}-{birthDate}</div>
            <p className='flex justify-center max-w-[80%] text-center text-14-regular text-dark-700'>Address: {address}</p>
            <p>Occupation-{occupation}</p>

            <div className='flex gap-2 my-4'>

                <div className='circles group' onClick={() => handleCopy({ text: "Email", value: email })}>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Mail className='h-5 w-5 text-dark-400 group-hover:text-white' />
                            </TooltipTrigger>
                            <TooltipContent className='bg-dark-300 rounded-md'>
                                <p>Click to copy</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                </div>

                <div className='circles group' onClick={() => handleCopy({ text: "Emergency Contact", value: emergencyContactNumber })}>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <BookUser className='h-5 w-5 text-dark-400 group-hover:text-white' />
                            </TooltipTrigger>
                            <TooltipContent className='bg-dark-300 rounded-md'>
                                <p>Emergency Contact: {emergencyContactName}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

                <div className='circle-delete group'>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div onClick={() => setOpen(true)}>
                                    <UserMinus className='h-5 w-5 text-red-700 group-hover:text-white' />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent className='bg-dark-300 rounded-md'>
                                <p className='text-red-500'>Delete patient: {name}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <AlertDialog open={open} onOpenChange={setOpen}>
                        <AlertDialogContent className="shad-alert-dialog">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="flex items-start justify-between">Are you absolutely sure?
                                    <Image
                                        src="/assets/icons/close.svg"
                                        height={20}
                                        width={20}
                                        alt="close"
                                        onClick={() => closeModal()}
                                        className="cursor-pointer"
                                    />
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete Patient profile and appointment data from the servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                    onClick={() => handleDelete()}
                                    className="shad-danger-btn">Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>

                <AlertDialog open={openLoading} onOpenChange={setLoadingOpen}>
                    <AlertDialogContent className="shad-alert-dialog">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="flex items-start justify-between">Deleting {name}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Clearing data..
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            {del == 0 && 
                                <AlertDialogAction onClick={() => handleDelete()} className="shad-danger-btn w-full">wait</AlertDialogAction>
                            }
                            {del == 1 &&
                                <AlertDialogAction className="shad-danger-btn w-full cursor-wait">
                                    <p>Deleting 
                                        {patient && <span> patient...</span>}
                                        {apt && <span> appointments...</span>}
                                        {user && <span> patient profile...</span>}</p>
                                </AlertDialogAction>
                            }
                            {del == 2 &&
                                <AlertDialogAction className="shad-danger-btn w-full">
                                    <Link href='/admin'>Patient Deleted</Link>
                                </AlertDialogAction>
                            }
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </div>
            <ToastContainer />

        </div>
    )
}

export default ProfileCard