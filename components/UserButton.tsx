'use client';

import { User } from 'lucide-react'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import CustomForm from './CustomForm';
import SubmitButton from './SubmitButton';
import { FormFieldType } from './forms/PatientForm';


const UserButton = () => {

    const [open, setOpen] = useState(false);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    })

    async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {

        setIsLoading(true);

        try {
            const userData = { name, email, phone };
            console.log(userData);

            const user = await createUser(userData);

            if (user) router.push(`/patients/${user.$id}/register`)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <User className='text-white cursor-pointer' onClick={() => setOpen(true)} />

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="shad-dialog">
                    <DialogHeader className='space-y-4'>
                        <DialogTitle className="header">Access Your Profile</DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                                <section className="mb-6 space-y-4">
                                    <p className="text-dark-700">Login in to your modern EMR system</p>
                                </section>
                                <CustomForm
                                    fieldType={FormFieldType.INPUT}
                                    control={form.control}
                                    name="email"
                                    label="Email"
                                    placeholder="example@ex.com"
                                    iconSrc="/assets/icons/email.svg"
                                    iconAlt="email"
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
                                <SubmitButton isLoading={isLoading}>Submit</SubmitButton>
                            </form>
                        </Form>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


        </div>
    )
}

export default UserButton
