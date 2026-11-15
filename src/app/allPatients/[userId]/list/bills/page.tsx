import { getAllPatientBills } from '@/lib/actions/bill.action';
import React from 'react'
import BillTableComp from '@/components/BillTableComp';

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/ui/app-sidebar'
import { CustomTrigger } from '@/components/ui/CustomTrigger'

const page = async ({ params }: { params: Promise<{ userId: string }> }) => {

  const { userId } = await params;
  const billsData = await getAllPatientBills(userId);

  return (
    <div className="mx-auto flex flex-col space-y-6">
      <header className='fixed bg-dark-200 w-full flex items-center py-1 justify-center z-0'>
        <p className='text-sm font-extralight'>
            HealthOS
          </p>
      </header>

      <SidebarProvider >
        <AppSidebar />
        <CustomTrigger />
        <main className='admin-main max-w-7xl mx-auto w-full mt-10 space-y-14'>
          <BillTableComp 
            doctor={userId}
            data={billsData.documents}
            todayTxn={billsData.todayTxn}
            yesterdayTxn={billsData.yesterdayTxn}
            last7dTxn={billsData.last7dTxn}
          />
        </main>

      </SidebarProvider>
    </div>
  )
}

export default page
