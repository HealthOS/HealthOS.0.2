"use client"

import { ColumnDef } from "@tanstack/react-table"
import StatusBadge from "./StatusBadge"
import { formatDateTime } from "@/lib/utils"
import { Doctors } from "@/constants"
import Image from "next/image"
import AppointmentModal from "../AppointmentModal"
import { Bill } from "@/types/appwrite.types"
import Name from "../Name"

export const columns: ColumnDef<Bill>[] = [
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
    accessorKey: "phone",
    header: () => <div className="pl-8">Contact</div>,
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <p>{row.original.patient.phone} </p> 
      </div>
    )
  },
  {
    accessorKey: "transactionAmount",
    header: "Amount",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px] justify-center">
        {row.original.transactionAmount}
      </p>
    )
  },
  {
    accessorKey: "dateTime",
    header: "Date",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px] justify-center">
        {formatDateTime(row.original.dateTime).dateTime}
      </p>
    )
  },
 { 
  accessorKey: "$id",
  header: "Txn ID",
  cell: ({ row }) => (
    <p className="text-14-regular min-w-[100px] justify-center">
      {row.original.$id}
    </p>
  )
},
]

