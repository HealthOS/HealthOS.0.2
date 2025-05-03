/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomForm from "../CustomForm"
import SubmitButton from "../SubmitButton"
import { useEffect, useState } from "react"
import { FormFieldType } from "./PatientForm"
import { toast } from "react-toastify"
import { addAppointment } from "@/lib/actions/appointment.actions"
import { Patient } from "@/types/appwrite.types"
import { useLoader } from "@/src/app/context/LoaderContext"
import { getAllPatients } from "@/lib/actions/patient.actions"
import { useRouter } from "next/navigation"

const AddAppointment = ({ doctor, open, setOpen }: {
    doctor: string,
    open: boolean,
    setOpen?: (open: boolean) => void;
}) => {


    const [query, setQuery] = useState('')
    const [patientId, setPatientId] = useState('')
    const [filtered, setFiltered] = useState<Patient[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState('')
    const { showLoader, hideLoader } = useLoader();

    const router = useRouter();

    const AppointmentFormValidation = z.object({
        schedule: z.coerce.date(),
        patientId: z.string(),
        reason: z
            .string()
            .min(2, "Reason must be at least 2 characters")
            .max(500, "Reason must be at most 500 characters"),
        note: z.string().optional(),
        cancellationReason: z.string().optional(),
    });

    const form = useForm<z.infer<typeof AppointmentFormValidation>>({
        resolver: zodResolver(AppointmentFormValidation),
        defaultValues: {
            patientId: "",
            schedule: new Date(Date.now()),
            reason: '',
            note: ""
        },
    })

    useEffect(() => {
        const fetchUser = async () => {
            try {
                showLoader();
                const userData = await getAllPatients(doctor);
                setFiltered(userData);
                hideLoader();
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)

        if (value.length > 0) {
            const results = filtered.filter((patient) =>
                patient.name.toLowerCase().includes(value.toLowerCase())
            )
            setFiltered(results)
        } else {
            setFiltered([])
        }
    }

    async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {

        setIsLoading(true);

        try {
            const appointmentData = {
                userId,
                patient: patientId,
                schedule: new Date(values.schedule),
                reason: values.reason!,
                note: values.note,
                doctor: doctor,
                status: "pending" as Status,
            }
            const appointment = await addAppointment(appointmentData);

            if (appointment) {
                form.reset();
                toast.success('Appointment created successfully!');
                router.refresh();
                setOpen && setOpen(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="mb-12 space-y-4">
                    <h1 className="header">New Appointment</h1>
                    <p className="text-dark-700">Add new appointment for patient...</p>
                </section>

                <>
                    <div className="relative w-full max-w-sm">
                        <input
                            name="patientId"
                            type="text"
                            value={query}
                            onChange={handleChange}
                            placeholder="Search patients..."
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {filtered.length > 0 && (
                                <ul className="absolute z-10 w-full rounded-md bg-dark-200 shadow-lg">
                                    {filtered.map((patients, index) => (
                                        <li
                                            key={index}
                                            className="cursor-pointer py-1 px-2 hover:bg-dark-500"
                                            onClick={() => {
                                                setQuery(patients.name)
                                                setPatientId(patients.$id)
                                                setUserId(patients.userId)
                                                setFiltered([])
                                            }}
                                        >
                                            {patients.name}
                                        </li>
                                    ))}
                                </ul>
                        )}
                    </div>

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

                <div className="flex gap-4">
                    <SubmitButton isLoading={isLoading} className='shad-primary-btn w-full'>Create</SubmitButton>
                </div>
            </form>
        </Form>
    )
}

export default AddAppointment