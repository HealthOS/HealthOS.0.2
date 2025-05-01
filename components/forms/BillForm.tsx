"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomForm from "../CustomForm"
import SubmitButton from "../SubmitButton"
import { BillFormValidation } from "@/lib/validation"
import { useEffect, useState } from "react"
import React from 'react'
import { FormFieldType } from "./PatientForm"
import { addTransactionAmount } from "@/lib/actions/bill.action"
import LiveClock from "../LiveClock"
import { Clock3 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLoader } from "@/src/app/context/LoaderContext"
import { getUser } from "@/lib/actions/accounts.actions"

const BillForm = ({ userId, patientId, setOpenBill }: {
    userId: string
    patientId: string
    setOpenBill: (open: boolean) => void;
}) => {

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

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

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
                doctor,
                dateTime
            };

            const bill = await addTransactionAmount(billData);

            if (bill) {
                form.reset();
                setOpenBill && setOpenBill(false);
                router.refresh();
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
