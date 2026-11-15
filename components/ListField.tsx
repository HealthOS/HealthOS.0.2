'use client';
import React from 'react';
import { ScrollArea } from './ui/scroll-area';
import { Patient } from '@/types/appwrite.types';
import TransactionItem from './TransactionItem';
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

const AppointmentItem = ({ schedule }: { schedule: string }) => (
    <p className="truncate py-2 w-full border-b text-14-regular text-slate-200 border-dark-600">
        {formatDateTime(schedule).dateTime}
    </p>
);

const ListField = ({ head, count, data }: { head: string; count: string; data: AptBill[] }) => {
    const isAppointments = head === "Appointments";

    return (
        <div className='h-[50%] max-h-[50%] flex flex-col w-full rounded-lg border border-dark-500 bg-dark-400 items-center'>
            <div className='flex justify-center border-b border-dark-600 w-full'>
                <p className='py-1 text-dark-700 border-dark-600'>{head} ({count})</p>
            </div>
            <ScrollArea className='w-full px-2'>
                {data.map((item, index) =>
                    isAppointments ? (
                        <AppointmentItem key={index} schedule={item.schedule} />
                    ) : (
                        <TransactionItem key={index} transaction={item} />
                    )
                )}
            </ScrollArea>
        </div>
    );
};

export default ListField;
