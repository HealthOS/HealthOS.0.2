"use client"

import { ColumnDef } from "@tanstack/react-table"
import StatusBadge from "./StatusBadge"
import { formatDateTime } from "@/lib/utils"
import AppointmentModal from "../AppointmentModal"
import { Appointment } from "@/types/appwrite.types"
import Name from "../Name"

export const columns: ColumnDef<Appointment>[] = [
  {
    header: 'S.No',
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>
  },
  {
    accessorKey: 'patient',
    header: 'Patient',
    cell: ({ row }) => (
      <Name
        name={row.original.patient.name}
        userId={row.original.patient.userId}
      />
    )
  },
  {
    accessorKey: "status",
    header: () => <div className="pl-8">Status</div>,
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>
    )
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px] justify-center">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    )
  },
  
  {
    id: "actions",
    header: () => <div className=" pl-20">Actions</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal type="schedule"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
          />
          <AppointmentModal type="note"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
          />
          <AppointmentModal type="cancel"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
          />
        </div>

      )
    },
  },
]
