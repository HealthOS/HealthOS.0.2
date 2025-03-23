"use client"

import { ColumnDef } from "@tanstack/react-table"
import StatusBadge from "./StatusBadge"
import { formatDateTime } from "@/lib/utils"
import { Doctors } from "@/constants"
import Image from "next/image"
import AppointmentModal from "../AppointmentModal"
import { Patient } from "@/types/appwrite.types"
import Name from "../Name"

export const columns: ColumnDef<Patient>[] = [
  {
    header: 'ID',
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>
  },
  {
    accessorKey: 'patient',
    header: 'Patient',
    cell: ({ row }) => (
      <Name
        name={row.original.name}
        userId={row.original.userId}
      />
    )
  },
  {
    accessorKey: "phone",
    header: () => <div className="pl-8">Contact</div>,
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <p>{row.original.phone} </p> 
      </div>
    )
  },
  {
    accessorKey: "insurancePolicyNumber",
    header: "Insurance",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px] justify-center">
        {row.original.insurancePolicyNumber}
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
          src={doctor?.image || '/default-image.png'}
          alt={doctor?.name || 'none'}
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
  accessorKey: "userId",
  header: "Database ID",
  cell: ({ row }) => (
    <p className="text-14-regular min-w-[100px] justify-center">
      {row.original.userId}
    </p>
  )
},
]

