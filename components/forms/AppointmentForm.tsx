"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomForm from "../CustomForm"
import SubmitButton from "../SubmitButton"
import { getAppointmentSchema } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FormFieldType } from "./PatientForm"
import Image from "next/image"
import { SelectItem } from "../ui/select"
import { Doctors } from "@/constants"
import { createAppointment } from "@/lib/actions/appointment.actions"


const AppointmentForm = ({ userId, patientId, type }: {
    userId: string,
    patientId: string,
    type: "create" | "cancel" | "schedule"
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const AppointmentFormValidation = getAppointmentSchema(type)


    const form = useForm<z.infer<typeof AppointmentFormValidation>>({
        resolver: zodResolver(AppointmentFormValidation),
        defaultValues: {
            primaryPhysician: "",
            schedule: new Date(),
            reason: "",
            note: "",
            cancellationReason: "",

        },
    })

    async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {

        setIsLoading(true);

        let status;

        switch (type) {
            case 'schedule': status = 'schedule';
                break;
            case 'cancel': status = 'cancel';
                break;
            default: status = 'pending';
                break;
        }

        try {
            if (type === 'create' && patientId) {
                const appointmentData = {
                    userId,
                    patient: patientId,
                    primaryPhysician: values.primaryPhysician,
                    schedule: new Date(values.schedule),
                    reason: values.reason!,
                    note: values.note,
                    status: status as Status,
                }
                const appointment = await createAppointment(appointmentData);
                
                if(appointment) {
                    form.reset();
                    router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`)
                    
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    let buttonLabel;

    switch (type) {
        case 'cancel': buttonLabel = 'Cancel Appointment';
            break;
        case 'create': buttonLabel = 'Create Appointment';
            break;
        case 'schedule': buttonLabel = 'Schedule Appointment';
            break;
        default: break;
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="mb-12 space-y-4">
                    <h1 className="header">New Appointment</h1>
                    <p className="text-dark-700">Add new appointment for patient...</p>
                </section>

                {type !== "cancel" && (
                    <>
                        <CustomForm
                            fieldType={FormFieldType.SELECT}
                            control={form.control}
                            name="primaryPhysician"
                            label="Doctor"
                            placeholder="Select a doctor"
                        >{Doctors.map((doctor) => (
                            <SelectItem key={doctor.name} value={doctor.name}>
                                <div className="flex cursor-pointer item-center gap-2">
                                    <Image
                                        src={doctor.image}
                                        width={32}
                                        height={32}
                                        alt={doctor.name}
                                        className="rounded-full border border-dark-500"
                                    />
                                    <p className="my-auto">{doctor.name}</p>
                                </div>
                            </SelectItem>
                        ))}
                        </CustomForm>

                        <CustomForm
                            fieldType={FormFieldType.DATE_PICKER}
                            control={form.control}
                            name="schedule"
                            label="Appointment date"
                            showTimeSelect
                            dateFormat="dd/MM/yyyy - h:mm aa"
                        />

                        <div className="flex flex-col gap-6">
                            <CustomForm
                                fieldType={FormFieldType.TEXTAREA}
                                control={form.control}
                                name="reason"
                                label="Reason"
                                placeholder="Enter reason..."
                            />
                        </div>
                    </>
                )}

                {type === "cancel" && (
                    <CustomForm
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="cancellationReason"
                        label="Reason for Cancellation"
                        placeholder="Enter Reason for Cancellation"
                    />
                )}
                <SubmitButton isLoading={isLoading} className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}>{buttonLabel}</SubmitButton>
            </form>
        </Form>
    )
}

export default AppointmentForm