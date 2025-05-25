"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Patient } from "@/types/appwrite.types"
import Name from "../Name"

export const columns: ColumnDef<Patient>[] = [
  {
    header: 'S.No',
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
    accessorKey: "insuranceProvider",
    header: "Insurance Provider",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px] justify-center">
        {row.original.insuranceProvider}
      </p>
    )
  },
  {
    accessorKey: "insurancePolicyNumber",
    header: "Insurance ID",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px] justify-center">
        {row.original.insurancePolicyNumber}
      </p>
    )
  },
  
]

