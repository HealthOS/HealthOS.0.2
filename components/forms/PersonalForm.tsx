'use client'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"

import { PersonalFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { DoctorParams } from '@/types/appwrite.types'
import CustomForm from '../CustomForm'
import SubmitButton from '../SubmitButton'
import { FormFieldType } from './PatientForm'
import { updateDoctor } from '@/lib/actions/doctor.actions'


const PersonalForm = ({ user }: { user: DoctorParams }) => {

    console.log()
    const [isPersonalLoading, setPersonalIsLoading] = useState(false);
    const router = useRouter();

    const personalForm = useForm<z.infer<typeof PersonalFormValidation>>({
        resolver: zodResolver(PersonalFormValidation),
        defaultValues: {
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
            birthDate: user?.birthDate || new Date(Date.now()),
        },
    })


    async function onPersonalSubmit(values: z.infer<typeof PersonalFormValidation>) {

        setPersonalIsLoading(true);

        try {
            const doctor = {
                userId: user.$id,
                name: values.name,
                email: values.email,
                phone: values.phone,
                birthDate: values.birthDate
            };
            console.log(doctor);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const doctorUpdate = await updateDoctor(doctor);

            if (doctorUpdate) router.refresh();
            setTimeout(() => { setPersonalIsLoading(false); }, 2000);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className='max-h-96 remove-scrollbar pl-10 pr-20 m-10 overflow-y-auto'>
            <Form {...personalForm}>
                <form onSubmit={personalForm.handleSubmit(onPersonalSubmit)} className="space-y-6 flex-1">

                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomForm
                            fieldType={FormFieldType.INPUT}
                            control={personalForm.control}
                            name="name"
                            label="Full Name"
                            placeholder="John Doe"
                        />
                        <CustomForm
                            fieldType={FormFieldType.DATE_PICKER}
                            control={personalForm.control}
                            name="birthDate"
                            label="Birth Date"
                        />
                    </div>

                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomForm
                            fieldType={FormFieldType.INPUT}
                            control={personalForm.control}
                            name="email"
                            label="Email"
                            placeholder="example@ex.com"
                        />
                        <CustomForm
                            fieldType={FormFieldType.PHONE_INPUT}
                            control={personalForm.control}
                            name="phone"
                            label="Phone Number"
                            placeholder="000-000-0000"
                            iconSrc="/assets/icons/user.svg"
                            iconAlt="user"
                        />
                    </div>
                    <SubmitButton isLoading={isPersonalLoading}>Update</SubmitButton>
                </form>
            </Form>
        </section>
    )
}

export default PersonalForm