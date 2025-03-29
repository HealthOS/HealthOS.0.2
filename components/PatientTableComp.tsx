import React from 'react'
import { columns } from '@/components/table/patientColumns';
import { DataTable } from '@/components/table/PatientTable';
import { getAllPatients, getUser } from '@/lib/actions/patient.actions'
import { ArrowUp, FileText, List, Plus} from 'lucide-react'
import { Button } from '@/components/ui/button'
import GreetComp from '@/components/GreetComp';
import { Patient } from '@/types/appwrite.types';

const PatientTableComp = ({data}: {data: Patient[]}) => {
  return (
    <div className='w-full space-y-6'>

          <div>
            <GreetComp />
            <p className='text-dark-600 text-lg font-medium'>Welcome to Patient section all your patients are listed here...</p>
          </div>


          <div className="flex flex-wrap gap-3">
            <Button
              className="rounded-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
            // onClick={() => setActiveButton("new-appointment-pill")}
            >
              <List className="h-4 w-4" />
              All Patients: {data.length}
            </Button>

            <Button
              className="rounded-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
            // onClick={() => setActiveButton("reports")}
            >
              <FileText className="h-4 w-4" />
              All
            </Button>

            <Button
              className="rounded-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
            // onClick={() => setActiveButton("reports")}
            >
              <List className="h-4 w-4" />
              A-Z
            </Button>
            <Button
              className="rounded-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
            // onClick={() => setActiveButton("reports")}
            >
              <ArrowUp className="h-4 w-4" />
              Newest
            </Button>
            <Button
              className="rounded-full bg-gray-800 hover:bg-gray-700 border text-white border-gray-700"
            // onClick={() => setActiveButton("reports")}
            >
              <ArrowUp className="h-4 w-4" />
              Oldest
            </Button>

          </div>

          <DataTable columns={columns} data={data} />
        </div>
  )
}

export default PatientTableComp