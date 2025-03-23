'use client'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"

import { ProfessionalFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import CustomForm from './CustomForm'
import { FormFieldType } from './forms/PatientForm'
import SubmitButton from './SubmitButton'
import { DoctorParams } from '@/types/appwrite.types'
import PersonalForm from './forms/PersonalForm'
import ProfessionalForm from './forms/ProfessionalForm'

const ProfileComponent = ({ user }: { user: DoctorParams }) => {

  const [state, setState] = useState('personal');

  return (
    <div className='w-full'>
      <h1 className='text-3xl font-semibold px-10 py-8'>My Profile</h1>
      <section className='border-t min-h-[460px]'>
        <div className='flex'>
          <p className={`text-lg px-10 py-4 hover:cursor-pointer hover:bg-dark-400 ${state === 'personal' ? 'bg-dark-500' : 'bg-dark-300'}`} onClick={() => setState('personal')}>Personal</p>
          <p className={`text-lg px-10 py-4 hover:cursor-pointer hover:bg-dark-400 ${state === 'professional' ? 'bg-dark-500' : 'bg-dark-300'}`} onClick={() => setState('professional')}>Professional</p>
        </div>
        <div>
          {state === 'personal' ? (
            <PersonalForm user={user} />
          ) :
            (
             <ProfessionalForm user={user} /> 
            )}
        </div>
      </section>
    </div>
  )
}

export default ProfileComponent