'use client';

import React, { useEffect, useState } from 'react'
import { columns } from '@/components/table/billColumn';
import { DataTable } from '@/components/table/billTable';
import { ArrowUp, Calendar, Clock, IndianRupeeIcon, List, Search } from 'lucide-react'
import { Bill } from '@/types/appwrite.types';
import GreetComp from './GreetComp';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { getAllBillsByOldest } from '@/lib/actions/bill.action';
import EarningCards from './EarningCards';
import { useLoader } from '@/src/app/context/LoaderContext';

const BillTableComp = ({ doctor, data, todayTxn, yesterdayTxn, last7dTxn }: {
  doctor: string
  data: Bill[]
  todayTxn: number
  yesterdayTxn: number
  last7dTxn: number
}) => {

  const [billData, setBillData] = useState(data);
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState("newest");

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const { showLoader, hideLoader } = useLoader();

  const handleSearch = () => {
    const newData = data.filter((value) => {
      const name = value.patient.name
      return (
        name.toLowerCase().includes(query.toLowerCase()) || value.patient.phone.includes(query) || value.patient.identificationNumber?.includes(query)
      );
    })
    setBillData(newData)
  }

  const filterBills = (type: "today" | "yesterday" | "last7d") => {
    showLoader()
    setOrder(type) // Midnight today

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1); // Midnight yesterday

    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const newData = data.filter((value) => {
      const billDate = new Date(value.dateTime);
      const billDay = new Date(billDate.getFullYear(), billDate.getMonth(), billDate.getDate());

      if (type === "today") return billDay.getTime() === today.getTime();
      if (type === "yesterday") return billDay.getTime() === yesterday.getTime();
      if (type === "last7d") return billDay.getTime() >= sevenDaysAgo.getTime();
    })
    setBillData(newData)
    hideLoader();
    console.log("New Data", newData)
  };

  const changeOrder = async (type: 'newest' | 'oldest') => {
    setOrder(type);
    showLoader();
    if (type === 'newest') {
      setBillData(data)
    } else if (type === 'oldest') {
      const fetchedData = await getAllBillsByOldest(doctor);
      setBillData(fetchedData);
    }
    hideLoader();
  }

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      handleSearch();
    }, 500); // Waits 500ms after user stops typing

    return () => clearTimeout(delaySearch); // Clears previous timeout if query changes
  }, [query]);

  return (
    <div className='w-full space-y-4'>

      <div>
        <GreetComp />
        <p className='text-dark-600 text-lg font-medium'>Welcome to Bills section all the past transactions are listed here...</p>
      </div>


      <div className="w-full py-6">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-background rounded-xl border border-dark-500 shadow-sm overflow-hidden">
            <div className="p-6 flex items-center gap-2 bg-dark-200 border-b border-dark-400">
              <h2 className="text-xl font-semibold flex items-center">
                <div className='bg-dark-400 p-2 rounded-full mr-2'>
                  <IndianRupeeIcon className="h-5 w-5 text-primary font-bold" />
                </div>
                Earnings Overview
              </h2>
              <p className='text-sm font-light text-dark-700 italic align-baseline'>
                ({today.toDateString()})
              </p>
            </div>

            <div className="grid grid-cols-3 divide-x divide-dark-500">
              {/* Today's Earnings */}
              <EarningCards title="Today" amount={todayTxn} />

              {/* Yesterday's Earnings */}
              <EarningCards title="Yesterday" amount={yesterdayTxn} />

              {/* Past 7 Days Earnings */}
              <EarningCards title="Last 7D" amount={last7dTxn} />
            </div>
          </div>
        </div>
      </div>


      <h1 className='text-4xl font-bold pt-6'>
        Transaction History
      </h1>
      <div className='flex items-center justify-between'>

        <div className="flex flex-wrap gap-3">
          <div
            className="flex items-center px-4 py-1 gap-2 rounded-full bg-gray-800 text-white border border-gray-700"
          >
            <List className="h-4 w-4" />
            Total txn: {data.length}
          </div>

          <Button
            className={`flex items-center px-4 py-1 gap-2 rounded-full hover:bg-gray-700 text-white border border-gray-700 ${order === 'newest' ? 'bg-dark-600' : 'bg-gray-800'}`}
            onClick={() => changeOrder('newest')}
          >
            <ArrowUp className="h-4 w-4" />
            Newest
          </Button>

          <Button
            className={`flex items-center px-4 py-1 gap-2 rounded-full hover:bg-gray-700 text-white border border-gray-700 ${order === 'oldest' ? 'bg-dark-600' : 'bg-gray-800'}`}
            onClick={() => changeOrder('oldest')}
          >
            <ArrowUp className="h-4 w-4" />
            Oldest
          </Button>

          <Button
            className={`flex items-center px-4 py-1 gap-2 rounded-full hover:bg-gray-700 text-white border border-gray-700 ${order === 'today' ? 'bg-dark-600' : 'bg-gray-800'}`}
            onClick={() => filterBills('today')}
          >
            <Clock className="h-4 w-4" />
            Today
          </Button>

          <Button
            className={`flex items-center px-4 py-1 gap-2 rounded-full hover:bg-gray-700 text-white border border-gray-700 ${order === 'yesterday' ? 'bg-dark-600' : 'bg-gray-800'}`}
            onClick={() => filterBills('yesterday')}
          >
            <Clock className="h-4 w-4" />
            Yesterday
          </Button>

          <Button
            className={`flex items-center px-4 py-1 gap-2 rounded-full hover:bg-gray-700 text-white border border-gray-700 ${order === 'last7d' ? 'bg-dark-600' : 'bg-gray-800'}`}
            onClick={() => filterBills('last7d')}
          >
            <Calendar className="h-4 w-4" />
            Last 7D
          </Button>

        </div>

        <div className='w-[30%] border items-center rounded-full p-1 flex'>
          <Search className='text-dark-700 ml-2' />
          <Input className='border-none rounded-lg focus-visible:ring-0'
            placeholder='Search by name/phone/ID'
            value={query}
            onChange={(e) => { setQuery(e.target.value) }}
          />
          {/* {<Button className='rounded-full' onClick={() => handleSearch()}>Search</Button>} */}
        </div>
      </div>

      <DataTable columns={columns} data={billData} />
    </div>
  )
}

export default BillTableComp