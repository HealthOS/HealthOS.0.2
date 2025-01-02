"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomForm from "../CustomForm"
import SubmitButton from "../SubmitButton"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { createUser } from "@/lib/actions/patient.actions"

export enum FormFieldType {
    INPUT ='input',
    TEXTAARE = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton',
}

const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email:"",
      phone:"",
    },
  })

  async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {

    setIsLoading(true);

    try {
      const userData = {name, email, phone };
      console.log(userData);

      const user = await createUser(userData);
      
      if(user) router.push(`/patients/${user.$id}/register`)

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">Hi there!!!</h1>
            <p className="text-dark-700">Login in to your modern EMR system</p>
        </section>
        <CustomForm 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full Name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
        />
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
  )
}

export default PatientForm