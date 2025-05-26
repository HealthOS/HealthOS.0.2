import React from 'react'
import PatientTableComp from '@/components/PatientTableComp';
import { getAllPatients } from '@/lib/actions/patient.actions';
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/ui/app-sidebar'
import { CustomTrigger } from '@/components/ui/CustomTrigger'

const page = async ({ params }: { params: Promise<{ userId: string }> }) => {

  const { userId } = await params;
  const patientData = await getAllPatients(userId);

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
            <PatientTableComp data={patientData} />
          </main>

      </SidebarProvider>
    </div>
  )
}

export default page