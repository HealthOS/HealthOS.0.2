'use client'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"

import { DoctorFormValidation, UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import CustomForm from './CustomForm'
import { FormFieldType } from './forms/PatientForm'
import SubmitButton from './SubmitButton'
import { DoctorParams } from '@/types/appwrite.types'

const ProfileComponent = ({ user }: { user: DoctorParams }) => {

  const [state, setState] = useState('personal');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof DoctorFormValidation>>({
    resolver: zodResolver(DoctorFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      birthDate: new Date(Date.now()),
      passKey: "",
      registrationNumber: "",
      licensingAuthority: "",
      validFrom: new Date(Date.now()),
      validTill: new Date(Date.now()),
      specialization: "",
      experience: "",
      highestDegree: "",
      university: "",
      yearOfGraduation: ""
    },
  })

  async function onPersonalSubmit({ name, email, phone }: z.infer<typeof DoctorFormValidation>) {

    setIsLoading(true);

    try {
      const userData = { name, email, phone };
      console.log(userData);

      const user = await createUser(userData);

      if (user) router.refresh();

    } catch (error) {
      console.log(error);
    }
  }

  async function onProfessionalSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {

    setIsLoading(true);

    try {
      const userData = { name, email, phone };
      console.log(userData);

      const user = await createUser(userData);

      if (user) router.refresh();

    } catch (error) {
      console.log(error);
    }
  }


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
            <section className='max-h-96 remove-scrollbar pl-10 pr-20 m-10 overflow-y-auto'>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onPersonalSubmit)} className="space-y-6 flex-1">

                  <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomForm
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="name"
                      label="Full Name"
                      placeholder="John Doe"
                    />
                    <CustomForm
                      fieldType={FormFieldType.DATE_PICKER}
                      control={form.control}
                      name="birthDate"
                      label="Birth Date"
                    />
                  </div>

                  <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomForm
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="email"
                      label="Email"
                      placeholder="example@ex.com"
                    />
                    <CustomForm
                      fieldType={FormFieldType.PHONE_INPUT}
                      control={form.control}
                      name="phone"
                      label="Phone Number"
                      placeholder="000-000-0000"
                      iconSrc="/assets/icons/user.svg"
                      iconAlt="user"
                    />
                  </div>
                  <SubmitButton isLoading={isLoading}>Update</SubmitButton>
                </form>
              </Form>
            </section>
          ) :
            (
              <section className='max-h-[360px] remove-scrollbar pl-10 pr-20 m-10 overflow-y-auto'>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onProfessionalSubmit)} className="space-y-6 flex-1">

                    <div className="flex flex-col gap-6 xl:flex-row">
                      <CustomForm
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="registrationNumber"
                        label="Registration Number"
                        placeholder="RX712540HX"
                      />
                      <CustomForm
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="licensingAuthority"
                        label="Licensing Authority"
                        placeholder='Eg. Medical Council of India'
                      />
                    </div>

                    <div className="flex flex-col gap-6 xl:flex-row">
                      <CustomForm
                        fieldType={FormFieldType.DATE_PICKER}
                        control={form.control}
                        name="validFrom"
                        label="Valid From"
                      />
                      <CustomForm
                        fieldType={FormFieldType.DATE_PICKER}
                        control={form.control}
                        name="validTill"
                        label="Valid Till"
                      />
                    </div>

                    <div className="flex flex-col gap-6 xl:flex-row">
                      <CustomForm
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="specialization"
                        label="Specialization"
                        placeholder="E.g., Cardiologist, Neurologist"
                      />
                      <CustomForm
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="experience"
                        label="Years of Experience"
                        placeholder="Eg. 5 yrs"
                      />
                    </div>
                    <div className="flex flex-col gap-6 xl:flex-row">
                      <CustomForm
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="highestDegree"
                        label="Highest Degree"
                        placeholder="E.g. MBBS, MD, etc."
                      />
                      <CustomForm
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="yearOfGraduation"
                        label="Year of Graduation"
                        placeholder="E.g. 2018"
                      />
                    </div>
                    <div className="flex flex-col gap-6 xl:flex-row">
                      <CustomForm
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="university"
                        label="Medical College / University"
                        placeholder=""
                      />
                    </div>
                    <SubmitButton isLoading={isLoading}>Update</SubmitButton>
                  </form>
                </Form>
              </section>
            )}
        </div>
      </section>
    </div>
  )
}

export default ProfileComponent