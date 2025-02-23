import React from 'react'
import { ScrollArea } from './ui/scroll-area'
import { Bill, Patient } from '@/types/appwrite.types'
import { IndianRupee } from 'lucide-react';


interface AptBill {
    schedule: string;
    reason: string;
    primaryPhysician: string;
    status: string;
    patient: Patient;
    transactionAmount: number;
    dateTime: string;
}


const ListField = ({ head, count, data }: {
    head: string
    count: string
    data: AptBill[]
}) => {
    return (
        <div className=' h-[50%] max-h-[50%] flex flex-col w-full rounded-lg border border-dark-500 bg-dark-400 items-center'>
            <p className='py-1 text-dark-700 border-dark-600'>{head} ({count})</p>
            <div className='border-b border-dark-600 w-full'></div>
            <ScrollArea className='w-full px-3'>
                {
                    data.map((item, index) => (
                        (head === "Appointments" ?
                            <p className="truncate py-2 border-b text-14-regular text-slate-200 border-dark-600" key={index}>{item.schedule}</p>
                            :
                            <div className='flex gap-2 w-full py-2 border-b border-dark-600' key={index}>
                                <IndianRupee className='h-4 w-4'/>
                                <p className="truncate my-auto text-14-regular text-slate-200" >{item.transactionAmount}</p>
                            </div>
                            )
                    ))
                }
            </ScrollArea>
        </div>
    )
}

export default ListField
