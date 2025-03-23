import ProfileMenu from '@/components/profileMenu';
import { columns } from '@/components/table/patientColumns';
import { DataTable } from '@/components/table/PatientTable';
import { getAllPatients, getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const page = async ({ params: { userId } }: SearchParamProps) => {

  const user = await getUser(userId);
  const patientData = await getAllPatients();
  console.log(patientData)


  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className='admin-header'>
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt='logo'
            className='h-8 w-fit'
          />
        </Link>

        <ProfileMenu />
      </header>

      <main className='admin-main'>
        <DataTable columns={columns} data={patientData} />
      </main>
    </div>
  )
}

export default page
