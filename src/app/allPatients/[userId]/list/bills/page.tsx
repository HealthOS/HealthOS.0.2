import ProfileMenu from '@/components/profileMenu';
import { getAllPatientBills } from '@/lib/actions/bill.action';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import BillTableComp from '@/components/BillTableComp';

const page = async ({ params: { userId } }: SearchParamProps) => {

  const billsData = await getAllPatientBills();

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
        <BillTableComp data={billsData.documents} 
            todayTxn={billsData.todayTxn}
            yesterdayTxn={billsData.yesterdayTxn}
            last7dTxn={billsData.last7dTxn}
            />
      </main>
    </div>
  )
}

export default page
