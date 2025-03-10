import React from 'react';
import { ScrollArea } from './ui/scroll-area';
import { IndianRupee } from 'lucide-react';
import { Patient } from '@/types/appwrite.types';

interface AptBill {
    schedule: string;
    reason: string;
    primaryPhysician: string;
    status: string;
    patient: Patient;
    transactionAmount: number;
    dateTime: string;
}

const formatAppwriteDate = (isoString: string) => {
    return new Date(isoString).toUTCString(); // Moves function outside the component
};

const AppointmentItem = ({ schedule }: { schedule: string }) => (
    <p className="truncate py-2 w-full border-b text-14-regular text-slate-200 border-dark-600">
        {formatAppwriteDate(schedule)}
    </p>
);

const TransactionItem = ({ transactionAmount }: { transactionAmount: number }) => (
    <div className='flex gap-2 w-full py-2 border-b border-dark-600'>
        <IndianRupee className='h-4 w-4' />
        <p className="truncate my-auto text-14-regular text-slate-200">{transactionAmount}</p>
    </div>
);

const ListField = ({ head, count, data }: { head: string; count: string; data: AptBill[] }) => {
    const isAppointments = head === "Appointments";

    return (
        <div className='h-[50%] max-h-[50%] flex flex-col w-full rounded-lg border border-dark-500 bg-dark-400 items-center'>
            <p className='py-1 text-dark-700 border-dark-600'>{head} ({count})</p>
            <div className='border-b border-dark-600 w-full'></div>
            <ScrollArea className='w-full px-3'>
                {data.map((item, index) =>
                    isAppointments ? (
                        <AppointmentItem key={index} schedule={item.schedule} />
                    ) : (
                        <TransactionItem key={index} transactionAmount={item.transactionAmount} />
                    )
                )}
            </ScrollArea>
        </div>
    );
};

export default ListField;
