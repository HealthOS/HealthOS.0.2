'use client';
import React, { useState } from 'react';
import { IndianRupee } from 'lucide-react';
import { Patient } from '@/types/appwrite.types';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { formatDateTime } from '@/lib/utils';

interface AptBill {
    schedule: string;
    reason: string;
    primaryPhysician: string;
    status: string;
    patient: Patient;
    transactionAmount: number;
    dateTime: string;
}

const TransactionItem = ({ transaction }: { transaction: AptBill }) => {
    const [openBill, setOpenBill] = useState(false);

    return (
        <div>
            <div onClick={() => setOpenBill(true)} className='flex items-center gap-1 w-full py-2 border-b border-dark-600 hover:cursor-pointer hover:bg-dark-500 hover:rounded-xl'>
                <IndianRupee className='h-4 w-4' />
                <p className="truncate text-14-regular text-slate-200">{transaction.transactionAmount}</p>
            </div>
                <Dialog open={openBill} onOpenChange={setOpenBill}>
                    <DialogContent className="shad-dialog sm:max-w-md">
                        <DialogHeader className='space-y-4'>
                            <DialogTitle>Transaction details...</DialogTitle>
                            <div className='space-y-1'>
                                <div>
                                    <p>Patient Name: {transaction.patient.name}</p>
                                    <p>Transaction Amount: {transaction.transactionAmount}</p>
                                    <p>Date & Time: {formatDateTime(transaction.dateTime).dateTime}</p>
                                    <p>Primary Physician: {transaction.patient.primaryPhysician}</p>
                                </div>
                            </div>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose> Close
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
        </div>
    );
}

export default TransactionItem