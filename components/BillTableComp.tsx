import React from 'react'
import { columns } from '@/components/table/billColumn';
import { DataTable } from '@/components/table/billTable';
import { AlertTriangle, Calendar, Clock, FileText, List, Plus, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Bill } from '@/types/appwrite.types';
import GreetComp from './GreetComp';

const BillTableComp = ({data}: {data: Bill[]}) => {
  return (
    <div className='w-full space-y-4'>

          <div>
            <GreetComp />
            <p className='text-dark-600 text-lg font-medium'>Welcome to Bills section all the past transactions are listed here...</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div
              className="flex items-center px-4 py-1 gap-2 rounded-full bg-gray-800 text-white border border-gray-700"
            // onClick={() => setActiveButton("new-appointment-pill")}
            >
              <List className="h-4 w-4" />
              Total txn: {data.length}
            </div>

          </div>

          <DataTable columns={columns} data={data} />
        </div>
  )
}

export default BillTableComp