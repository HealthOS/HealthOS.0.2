import ProfileMenu from '@/components/profileMenu'
import StatCard from '@/components/StatCard'
import TableComponent from '@/components/TableComponent'
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Admin = async ({ params }: { params: { userId: string } }) => {
  const userId = params.userId;

  console.log(userId)
  const appointments = await getRecentAppointmentList(userId);

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className='admin-header'>
        <Link href="/" className="cursor-pointer">
          <text className='text-sm font-extralight'>
            HealthOS
          </text>
          { /*<Image
            src="/assets/icons/logo-full.svg"
            height={22}
            width={132}
            alt='logo'
            className='h-5 w-fit'
          /> */ }
        </Link>

        {/* <ProfileMenu /> */}
      </header>

      <main className='admin-main'>
        <section className='w-full space-y-4'>
          <h1 className='header'>Welcome to Dashboard</h1>
          <p className='text-dark-700'>Effortlessly manage appointments, track your patients, and seamlessly add new ones — all in one place.</p>
        </section>
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
        <TableComponent data={appointments.documents} />

      </main>
    </div>
  )
}

export default Admin