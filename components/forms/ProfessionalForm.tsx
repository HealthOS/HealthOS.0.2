'use client'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"

import { ProfessionalFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import SubmitButton from '../SubmitButton'
import { FormFieldType } from './PatientForm'
import CustomForm from '../CustomForm'
import { DoctorParams } from '@/types/appwrite.types'
import { updateDoctor } from '@/lib/actions/doctor.actions'

const ProfessionalForm = ({ user }: { user: DoctorParams }) => {

    const router = useRouter();
    const [isProfessionalLoading, setProfessionalIsLoading] = useState(false);

    const professionalForm = useForm<z.infer<typeof ProfessionalFormValidation>>({
        resolver: zodResolver(ProfessionalFormValidation),
        defaultValues: {
            registrationNumber: user?.registrationNumber || "",
            licensingAuthority: user?.licensingAuthority || "",
            validFrom: user?.validFrom || new Date(Date.now()),
            validTill: user?.validTill || new Date(Date.now()),
            specialization: user?.specialization || "",
            experience: user?.experience || "",
            highestDegree: user?.highestDegree || "",
            university: user?.university || "",
            yearOfGraduation: user?.yearOfGraduation || "",
        },
    })

    async function onProfessionalSubmit( values : z.infer<typeof ProfessionalFormValidation>) {

        setProfessionalIsLoading(true);

        try {
            const doctor = {
                userId: user.$id,
                registrationNumber: values.registrationNumber,
                licensingAuthority: values.licensingAuthority,
                validFrom: values.validFrom,
                validTill: values.validTill,
                specialization: values.specialization,
                experience: values.experience,
                highestDegree: values.highestDegree,
                university: values.university,
                yearOfGraduation: values.yearOfGraduation,
            };
            console.log(doctor);

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const doctorUpdate = await updateDoctor(doctor);

            if (doctorUpdate) router.refresh();
            setTimeout(() => { setProfessionalIsLoading(false); }, 2000);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <section className='max-h-[360px] remove-scrollbar pl-10 pr-20 m-10 overflow-y-auto'>
                <Form {...professionalForm}>
                    <form onSubmit={professionalForm.handleSubmit(onProfessionalSubmit)} className="space-y-6 flex-1">

                        <div className="flex flex-col gap-6 xl:flex-row">
                            <CustomForm
                                fieldType={FormFieldType.INPUT}
                                control={professionalForm.control}
                                name="registrationNumber"
                                label="Registration Number"
                                placeholder="RX712540HX"
                            />
                            <CustomForm
                                fieldType={FormFieldType.INPUT}
                                control={professionalForm.control}
                                name="licensingAuthority"
                                label="Licensing Authority"
                                placeholder='Eg. Medical Council of India'
                            />
                        </div>

                        <div className="flex flex-col gap-6 xl:flex-row">
                            <CustomForm
                                fieldType={FormFieldType.DATE_PICKER}
                                control={professionalForm.control}
                                name="validFrom"
                                label="Valid From"
                            />
                            <CustomForm
                                fieldType={FormFieldType.DATE_PICKER}
                                control={professionalForm.control}
                                name="validTill"
                                label="Valid Till"
                            />
                        </div>

                        <div className="flex flex-col gap-6 xl:flex-row">
                            <CustomForm
                                fieldType={FormFieldType.INPUT}
                                control={professionalForm.control}
                                name="specialization"
                                label="Specialization"
                                placeholder="E.g., Cardiologist, Neurologist"
                            />
                            <CustomForm
                                fieldType={FormFieldType.INPUT}
                                control={professionalForm.control}
                                name="experience"
                                label="Years of Experience"
                                placeholder="Eg. 5 yrs"
                            />
                        </div>
                        <div className="flex flex-col gap-6 xl:flex-row">
                            <CustomForm
                                fieldType={FormFieldType.INPUT}
                                control={professionalForm.control}
                                name="highestDegree"
                                label="Highest Degree"
                                placeholder="E.g. MBBS, MD, etc."
                            />
                            <CustomForm
                                fieldType={FormFieldType.INPUT}
                                control={professionalForm.control}
                                name="yearOfGraduation"
                                label="Year of Graduation"
                                placeholder="E.g. 2018"
                            />
                        </div>
                        <div className="flex flex-col gap-6 xl:flex-row">
                            <CustomForm
                                fieldType={FormFieldType.INPUT}
                                control={professionalForm.control}
                                name="university"
                                label="Medical College / University"
                                placeholder='Ex. AIIMS, New Delhi'
                            />
                        </div>
                        <SubmitButton isLoading={isProfessionalLoading}>Update</SubmitButton>
                    </form>
                </Form>
            </section>
        </div>
    )
}

export default ProfessionalForm