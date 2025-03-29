'use client';
import { Appointment } from '@/types/appwrite.types'
import React, { useState } from 'react'
import { columns } from '@/components/table/columns'
import { DataTable } from '@/components/table/DataTable'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Calendar, Clock, FileText, List, Plus, Settings } from 'lucide-react'

const TableComponent = ({ data }:
    { data: Appointment[] }
) => {

    const [aptData, setAptData] = useState(data);
    const [active, setActive] = useState("all");

    // Function to filter appointments based on date
    const filterAppointments = (type: "today" | "tomorrow" | "all") => {
        setActive(type);
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Midnight today
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1); // Midnight tomorrow
        const newData = data.filter((value) => {
            const appointmentDate = new Date(value.schedule);
            const appointmentDay = new Date(appointmentDate.getFullYear(), appointmentDate.getMonth(), appointmentDate.getDate());

            if (type === "today") return appointmentDay.getTime() === today.getTime();
            if (type === "tomorrow") return appointmentDay.getTime() === tomorrow.getTime();
            return true;

        })
        setAptData(newData)
        console.log("New Data", newData)
    };

    const filterAppointmentsByStatus = (type: "scheduled" | "pending" | "cancelled") => {
        setActive(type);
        const newData = data.filter((value) => {
            if (type === "scheduled") return value.status === "scheduled";
            if (type === "pending" && value.status === "pending") return value;
            if (type === "cancelled" && value.status === "cancelled") return value;


        })
        setAptData(newData)
        console.log("New Data", newData)
    };

    return (
        <div className='w-full space-y-6'>
            <div className="flex flex-wrap gap-3">
                <div className=" flex items-center gap-2 px-4 rounded-full bg-gray-800 text-white border border-gray-700"
                >
                    <List className="h-4 w-4" />
                    Total: {aptData.length}
                </div>

                <Button
                    className={`rounded-full hover:bg-gray-700 text-white border border-gray-700 ${active=="all"? 'bg-gray-600':'bg-gray-800'}`}
                    onClick={() => filterAppointments("all")}
                >
                    <FileText className="h-4 w-4" />
                    All
                </Button>

                <Button
                    className={`rounded-full hover:bg-gray-700 text-white border border-gray-700 ${active=="today"? 'bg-gray-600':'bg-gray-800'}`}
                    onClick={() => filterAppointments("today")}
                >
                    <Clock className="h-4 w-4" />
                    Today
                </Button>
                <Button
                    className={`rounded-full hover:bg-gray-700 text-white border border-gray-700 ${active=="tomorrow"? 'bg-gray-600':'bg-gray-800'}`}
                    onClick={() => filterAppointments("tomorrow")}
                >
                    <Calendar className="h-4 w-4" />
                    Tomorrow
                </Button>

                <Button
                    className={`rounded-full hover:bg-gray-700 text-green-500 border border-gray-700 ${active=="scheduled"? 'bg-gray-600':'bg-gray-800'}`}
                    onClick={() => filterAppointmentsByStatus("scheduled")}
                >
                    <Clock className="h-4 w-4" />
                    scheduled
                </Button>

                <Button
                    className={`rounded-full hover:bg-gray-700 text-blue-500 border border-gray-700 ${active=="pending"? 'bg-gray-600':'bg-gray-800'}`}
                    onClick={() => filterAppointmentsByStatus("pending")}
                >
                    <Clock className="h-4 w-4" />
                    Pending
                </Button>

                <Button
                    className={`rounded-full hover:bg-gray-700 text-red-500 border border-gray-700 ${active=="cancelled"? 'bg-gray-600':'bg-gray-800'}`}
                    onClick={() => filterAppointmentsByStatus("cancelled")}
                >
                    <AlertTriangle className="h-4 w-4" />
                    Cancelled
                </Button>
            </div>

            <DataTable columns={columns} data={aptData} />
        </div>
    )
}

export default TableComponent