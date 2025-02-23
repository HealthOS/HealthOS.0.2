"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomForm from "../CustomForm"
import SubmitButton from "../SubmitButton"
import { BillFormValidation } from "@/lib/validation"
import { useState } from "react"
import React from 'react'
import { FormFieldType } from "./PatientForm"
import { addTransactionAmount } from "@/lib/actions/bill.action"
import LiveClock from "../LiveClock"
import { Clock3 } from "lucide-react"

const BillForm = ({ userId, patientId }: {
    userId: string
    patientId: string
}) => {

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof BillFormValidation>>({
        resolver: zodResolver(BillFormValidation),
        defaultValues: {
            transactionAmount: 0,
        },
    })

    async function onSubmit({ transactionAmount }: z.infer<typeof BillFormValidation>) {

        let dateTime = new Date();
        setIsLoading(true);

        try {
            dateTime;
            console.log(dateTime);
            const billData = {
                userId,
                patient: patientId,
                transactionAmount,
                dateTime
            };
            console.log(billData);

            const bill = await addTransactionAmount(billData);

            if (bill) {
                form.reset();
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-full'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                    <CustomForm
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="transactionAmount"
                        label="Total amount"
                        placeholder="example@ex.com"
                        iconSrc="/assets/icons/indian-rupee.svg"
                        iconAlt="transactionAmount"
                    />
                    <div className="">
                        <div className="flex my-auto gap-2 items-center">
                            <Clock3 />
                            <LiveClock />
                        </div>
                        <p className="text-10-regular">This time will be saved with the transaction value.</p>
                    </div>
                    <SubmitButton isLoading={isLoading}>Submit</SubmitButton>
                </form>
            </Form>
        </div>
    )
}

export default BillForm
