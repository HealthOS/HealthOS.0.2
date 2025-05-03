import StatCard from '@/components/StatCard'
import TableComponent from '@/components/TableComponent'
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions'
import Link from 'next/link'
import React from 'react'
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/ui/app-sidebar'
import { CustomTrigger } from '@/components/ui/CustomTrigger'
import GreetComp from '@/components/GreetComp'

const Admin = async ({ params }: { params: { userId: string } }) => {
  
  const userId = params.userId;
  const appointments = await getRecentAppointmentList(userId);

  console.log(appointments)

  return (
    <div className="mx-auto flex flex-col space-y-6">
      <header className='fixed bg-dark-200 w-full flex items-center py-1 justify-center z-0'>
        <Link href="/" className="cursor-pointer">
          <p className='text-sm font-extralight'>
            HealthOS
          </p>
        </Link>
      </header>

      <SidebarProvider >
        <AppSidebar />
        <CustomTrigger />
        <main className='mx-auto w-full flex flex-col mt-10 space-y-14'>
          <main className='admin-main max-w-7xl mx-auto w-full'>
            <section className='mt-4 w-full space-y-2'>
              <GreetComp />
              <p className='text-dark-700'>Welcome to Dashboard!</p>
              <p className='text-dark-700'>Effortlessly manage appointments, track your patients, and seamlessly add new ones — all in one place.</p>
            </section>

            <section className='w-full space-y-4'>

              <h1 className='w-full text-36-bold'>All Appointments</h1>
              <section className='admin-stat'>
                <StatCard
                  type="appointments"
                  count={appointments.scheduledCount}
                  label="Scheduled appointment"
                  icon="/assets/icons/appointments.svg"
                />
                <StatCard
                  type="pending"
                  count={appointments.pendingCount}
                  label="Pending appointment"
                  icon="/assets/icons/pending.svg"
                />
                <StatCard
                  type="cancelled"
                  count={appointments.cancelledCount}
                  label="Cancelled appointment"
                  icon="/assets/icons/cancelled.svg"
                />
              </section>
            </section>
            
            <TableComponent data={appointments.documents} />

          </main>

        </main>
      </SidebarProvider>
    </div>
  )
}

export default Admin