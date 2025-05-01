/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomForm from "../CustomForm"
import SubmitButton from "../SubmitButton"
import { getAppointmentSchema } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FormFieldType } from "./PatientForm"
import { createAppointment, updateAppointment } from "@/lib/actions/appointment.actions"
import { Appointment } from "@/types/appwrite.types"
import { Button } from "../ui/button"
import { useLoader } from "@/src/app/context/LoaderContext"
import { getUser } from "@/lib/actions/accounts.actions"
import { toast } from "react-toastify"


const AppointmentForm = ({ userId, patientId, type, appointment, open, setOpen }: {
    userId: string,
    patientId: string,
    type: "create" | "cancel" | "schedule"
    appointment: Appointment,
    open: boolean,
    setOpen: (open: boolean) => void;
}) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const AppointmentFormValidation = getAppointmentSchema(type)

     const {showLoader, hideLoader} = useLoader();
        const [ doctor, setDoctor ] = useState('');
        
        useEffect(() => {
            const fetchUser = async () => {
              try {
                showLoader();
                const loggedDoc = await getUser();
                if (loggedDoc){
                  console.log(loggedDoc);
                  setDoctor(loggedDoc.$id);
                }
                else {
                  router.push('/login');
                }
                hideLoader();
              } catch (error) {
                console.error("Error fetching user:", error);
              }
            };
        
            fetchUser();
          }, []);

    const form = useForm<z.infer<typeof AppointmentFormValidation>>({
        resolver: zodResolver(AppointmentFormValidation),
        defaultValues: {
            schedule: appointment ? new Date(appointment.schedule) : new Date(Date.now()),
            reason: appointment ? appointment.reason : '',
            note: appointment ? appointment.note : "",
            cancellationReason: appointment?.cancellationReason || '',
        },
    })

    async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {

        setIsLoading(true);

        let status;

        switch (type) {
            case 'schedule': status = 'scheduled';
                break;
            case 'cancel': status = 'cancelled';
                break;
            default: status = 'pending';
                break;
        }

        try {
            if (type === 'create' && patientId) {
                const appointmentData = {
                    userId,
                    patient: patientId,
                    schedule: new Date(values.schedule),
                    reason: values.reason!,
                    note: values.note,
                    doctor: doctor,
                    status: status as Status,
                }
                const appointment = await createAppointment(appointmentData);

                if (appointment) {
                    form.reset();
                    toast.success('Appointment created successfully!')
                    setOpen && setOpen(false);
                }
            } else {
                const appointmentToUpdate = {
                    userId,
                    appointmentId: appointment?.$id!,
                    appointment: {
                        schedule: new Date(values?.schedule),
                        status: status as Status,
                        cancellationReason: values?.cancellationReason,
                    },
                    type,
                }

                const updatedAppointment = await updateAppointment(appointmentToUpdate);

                if (updatedAppointment) {
                    setOpen && setOpen(false);
                    form.reset();
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
                {type === 'create' && <section className="mb-12 space-y-4">
                    <h1 className="header">New Appointment</h1>
                    <p className="text-dark-700">Add new appointment for patient...</p>
                </section>
                }

                {type !== "cancel" && (
                    <>
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
                            <CustomForm
                                fieldType={FormFieldType.TEXTAREA}
                                control={form.control}
                                name="note"
                                label="Note"
                                placeholder="Enter note..."
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

                <div className="flex gap-4">
                    { open === false && 
                     <Button type="reset" onClick={() => router.push(`/patients/${userId}/profile`)}>Skip</Button>
                    }
                    <SubmitButton isLoading={isLoading} className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}>{buttonLabel}</SubmitButton>
                </div>
            </form>
        </Form>
    )
}

export default AppointmentForm