'use client';

import React, { useEffect, useState } from 'react'
import { columns } from '@/components/table/patientColumns';
import { DataTable } from '@/components/table/PatientTable';
import { ArrowUp, FileText, List, Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import GreetComp from '@/components/GreetComp';
import { Patient } from '@/types/appwrite.types';
import { Input } from './ui/input';
import { getAllPatientsByNewest, getAllPatientsByOldest } from '@/lib/actions/patient.actions';
import Loader from './loader/loader';
import { getUser } from '@/lib/actions/accounts.actions';
import { useLoader } from '@/src/app/context/LoaderContext';

const PatientTableComp = ({ data }: { data: Patient[] }) => {

  const [patientData, setPatientData] = useState(data);
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState("AZ");
  const [loader, setLoader] = useState(false);
  const [userId, setUser] = useState("");

  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        showLoader();
        const userData = await getUser();
        setUser(userData.targets?.[0]?.userId);
        hideLoader();
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleSearch = () => {
    console.log(query);
    const newData = data.filter((value) => {
      const name = value.name
      return (
        name.toLowerCase().includes(query.toLowerCase()) || value.phone.includes(query) || value.identificationNumber?.includes(query)
      );
    })
    setPatientData(newData)
  }

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      handleSearch();
    }, 500); // Waits 500ms after user stops typing

    return () => clearTimeout(delaySearch); // Clears previous timeout if query changes
  }, [query]);

  const changeOrder = async (type: 'AZ' | 'newest' | 'oldest') => {
    setOrder(type);
    setLoader(true);
    if (type === 'AZ') {
      setPatientData(data);
      setLoader(false)
    } else if (type === 'newest') {
      const fetchedData = await getAllPatientsByNewest(userId);
      setLoader(false)
      setPatientData(fetchedData);
    } else if (type === 'oldest') {
      const fetchedData = await getAllPatientsByOldest(userId);
      setPatientData(fetchedData);
      setLoader(false)
    }
  }

  return (
    <div className='w-full space-y-6'>

      <div>
        <GreetComp />
        <p className='text-dark-600 text-lg font-medium'>Welcome to Patient section all your patients are listed here...</p>
      </div>

      <h1 className='text-4xl font-bold pt-6'>
        Patient Rocords
      </h1>

      <div className='flex items-center justify-between'>

        <div className="flex flex-wrap gap-3">
          <Button
            className="rounded-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
          // onClick={() => setActiveButton("new-appointment-pill")}
          >
            <List className="h-4 w-4" />
            Total Patients: {data.length}
          </Button>

          <Button
            className={`rounded-full hover:bg-gray-700 text-white border border-gray-700 ${order === 'AZ' ? 'bg-dark-600' : 'bg-gray-800'}`}
            onClick={() => changeOrder("AZ")}
          >
            <List className="h-4 w-4" />
            A-Z
          </Button>

          <Button
            className={`rounded-full hover:bg-gray-700 text-white border border-gray-700 ${order === 'newest' ? 'bg-dark-600' : 'bg-gray-800'}`}
            onClick={() => changeOrder("newest")}
          >
            <ArrowUp className="h-4 w-4" />
            Newest
          </Button>
          <Button
            className={`rounded-full hover:bg-gray-700 text-white border border-gray-700 ${order === 'oldest' ? 'bg-dark-600' : 'bg-gray-800'}`}
            onClick={() => changeOrder("oldest")}
          >
            <ArrowUp className="h-4 w-4" />
            Oldest
          </Button>
        </div>

        <div className='w-[30%] border items-center rounded-full p-1 flex'>
          <Search className='text-dark-700 ml-2' />
          <Input className='border-none rounded-lg focus-visible:ring-0'
            placeholder='Search by name/phone/ID'
            value={query}
            onChange={(e) => { setQuery(e.currentTarget.value) }}
          />
          {/* <Button className='rounded-full' onClick={() => handelSearch()}>Search</Button> */}
        </div>
      </div>


      <DataTable columns={columns} data={patientData} />

      {loader &&
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
          <Loader />
        </div>
      }
    </div>
  )
}

export default PatientTableComp