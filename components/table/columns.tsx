"use client"

import { ColumnDef } from "@tanstack/react-table"
import StatusBadge from "./StatusBadge"
import { formatDateTime } from "@/lib/utils"
import { Doctors } from "@/constants"
import Image from "next/image"
import AppointmentModal from "../AppointmentModal"
import { Appointment } from "@/types/appwrite.types"
import Name from "../Name"

export const columns: ColumnDef<Appointment>[] = [
  {
    header: 'ID',
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
    accessorKey: "primaryPhysician",
    header: () => <div className="pl-3">Doctor</div>,
    cell: ({ row }) => {
      const doctor = Doctors.find((doc) => doc.name === row.original.primaryPhysician)

      return (<div className="flex items-center gap-3">
        <Image
          src={doctor?.image}
          alt={doctor.name}
          width={100}
          height={100}
          className="size-8"
        />
        <p className="whitespace-nowrap">
          Dr. {doctor?.name}
        </p>
      </div>)
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-16">Actions</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal type="schedule"
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
