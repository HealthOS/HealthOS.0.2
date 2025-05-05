/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React, { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl } from "@/components/ui/form"
import CustomForm from "../CustomForm"
import SubmitButton from "../SubmitButton"
import { PatientFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { registerPatient, updatePatient } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { GenderOptions, IdentificationTypes } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import FileUploader from "../FileUploader"
import { Patient } from "@/types/appwrite.types"
import { Button } from "../ui/button"
import { FileText } from 'lucide-react'
import { deletePDF, extractTextFromPDF, uploadPDF } from '@/lib/actions/autoFill'
import { useLoader } from '@/src/app/context/LoaderContext'
import { getUser } from '@/lib/actions/accounts.actions'

const RegisterForm = ({ user, patientData }: {
  user: User
  patientData: Patient
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [fileId, setFileId] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const { showLoader, hideLoader } = useLoader();
  const [userId, setUser] = useState("");

  const handelDelete = async () => {
    try {
      showLoader();
      const deletedFile = await deletePDF(fileId);
      console.log(deletedFile)
      hideLoader();

    } catch (error) {
      console.log(error)
    }
  }

  const onDrop = useCallback(async (acceptedFiles: any) => {

    showLoader();

    const file = acceptedFiles[0];

    setPdfFile(file);

    const uploadedFile = await uploadPDF(file);

    setFileId(uploadedFile.$id);

    const fetchedPDF = await extractTextFromPDF(uploadedFile.$id);

    form.reset({
      ...form.getValues(), // retain current form values
      ...fetchedPDF,       // override with extracted data
    });

    hideLoader();

  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  {/**
anemia: "Yes"
birthDate: "1980-01-15"
bloodPressure: "130/85 mmHg"
chronicKidneyDisease: "Stage 1"
coagulationDisorder: "None Reported"
description: null
diabetes: "Type 2"
emergencyContactName: "Jane Doe"
emergencyContactNumber: "+1 555-765-4321"
gender: "Male"
gout: null
hypercholesterolemia: null
hyperthyroidism: null
hypothyroidism: null
hypoxia: null
insurancePolicyNumber: "MC-456789101"
insuranceProvider: "MediCare Health"
obesity: "No"
occupation: "Software Engineer"
osteoporosis: null
respiratoryDistress: "Mild"
seriousConditions: "Hypertension, Type 2 Diabetes, Heart Disease"
tachycardia: "No"
temperature: "98.6°F"  
  */}

  useEffect(() => {
    const fetchUser = async () => {
      try {
        showLoader();
        const userData = await getUser();
        console.log(userData.targets?.[0]?.userId)
        setUser(userData.targets?.[0]?.userId);
        hideLoader();
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      name: patientData?.name || user?.name || "",
      room: patientData?.room || "",
      email: patientData?.email || user?.email || "",
      phone: patientData?.phone || user?.phone || "",
      birthDate: patientData?.birthDate || new Date(Date.now()),
      gender: patientData?.gender || "male" as Gender,
      address: patientData?.address || "",
      occupation: patientData?.occupation || "",
      emergencyContactName: patientData?.emergencyContactName || "",
      emergencyContactNumber: patientData?.emergencyContactNumber || "",
      insuranceProvider: patientData?.insuranceProvider || "",
      insurancePolicyNumber: patientData?.insurancePolicyNumber || "",
      allergies: patientData?.allergies || "",
      currentMedication: patientData?.currentMedication || "",
      familyMedicalHistory: patientData?.familyMedicalHistory || "",
      pastMedicalHistory: patientData?.pastMedicalHistory || "",
      identificationType: patientData?.identificationType || "Birth Certificate",
      identificationNumber: patientData?.identificationNumber || "",
      identificationDocument: [],
      treatmentConsent: patientData?.treatmentConsent || false,
      disclosureConsent: patientData?.disclosureConsent || false,
      privacyConsent: patientData?.privacyConsent || false,
      temperature: patientData?.temperature || "",
      diabetes: patientData?.diabetes || "",
      bloodPressure: patientData?.bloodPressure || "",
      description: patientData?.description || "",
      seriousConditions: patientData?.seriousConditions || "",
      tachycardia: patientData?.tachycardia || "",
      hypoxia: patientData?.hypoxia || "",
      respiratoryDistress: patientData?.respiratoryDistress || "",
      hypercholesterolemia: patientData?.hypercholesterolemia || "",
      anemia: patientData?.anemia || "",
      chronicKidneyDisease: patientData?.chronicKidneyDisease || "",
      hypothyroidism: patientData?.hypothyroidism || "",
      hyperthyroidism: patientData?.hyperthyroidism || "",
      obesity: patientData?.obesity || "",
      gout: patientData?.gout || "",
      coagulationDisorder: patientData?.coagulationDisorder || "",
      osteoporosis: patientData?.osteoporosis || "",
    },
  })

  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {

    setIsLoading(true);

    let formData;

    if (values.identificationDocument && values.identificationDocument.length > 0) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      })

      formData = new FormData();
      formData.append('blobFile', blobFile);
      formData.append('fileName', values.identificationDocument[0].name)
    }

    try {
      if (patientData) {

        const updatePatientData = {
          userId: patientData.$id,
          identificationDocument: formData,
          name: values.name,
          room: values.room,
          email: values.email,
          phone: values.phone,
          birthDate: values.birthDate,
          gender: values.gender,
          address: values.address,
          occupation: values.occupation,
          emergencyContactName: values.emergencyContactName,
          emergencyContactNumber: values.emergencyContactNumber,
          insuranceProvider: values.insuranceProvider,
          insurancePolicyNumber: values.insurancePolicyNumber,
          allergies: values.allergies,
          currentMedication: values.currentMedication,
          familyMedicalHistory: values.familyMedicalHistory,
          pastMedicalHistory: values.pastMedicalHistory,
          identificationType: values.identificationType,
          identificationNumber: values.identificationNumber,
          treatmentConsent: values.treatmentConsent,
          disclosureConsent: values.disclosureConsent,
          privacyConsent: values.privacyConsent,
          temperature: values.temperature,
          diabetes: values.diabetes,
          bloodPressure: values.bloodPressure,
          description: values.description,
          seriousConditions: values.seriousConditions,
          tachycardia: values.tachycardia,
          hypoxia: values.hypoxia,
          respiratoryDistress: values.respiratoryDistress,
          hypercholesterolemia: values.hypercholesterolemia,
          anemia: values.anemia,
          chronicKidneyDisease: values.chronicKidneyDisease,
          hypothyroidism: values.hypothyroidism,
          hyperthyroidism: values.hyperthyroidism,
          obesity: values.obesity,
          gout: values.gout,
          coagulationDisorder: values.coagulationDisorder,
          osteoporosis: values.osteoporosis,
          doctor: userId,
          report: fileId || patientData.report
        }

        console.log("Updated Data", updatePatientData)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error

        const updatedPatient = await updatePatient(updatePatientData);

        if (updatedPatient) router.push(`/patients/${user.$id}/profile`)

      }
      else {
        const newPatientData = {
          ...values,
          userId: user.$id,
          birthDate: new Date(values.birthDate),
          identificationDocument: formData,
          report: fileId,
          doctor: userId,
        };

        console.log("New Patient Data", newPatientData);
        
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const patient = await registerPatient(newPatientData);

        if (patient) router.push(`/patients/${user.$id}/profile`)
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">

        <section className="space-y-4 w-full">
          <h1 className="text-3xl font-bold text-green-500 animate-fade-in">
            👋 Welcome to HealthOS!
          </h1>
          <p className="text-lg text-muted-foreground">
            Let's add complete details of your patients for better care.
          </p>
        </section>

        <div className='file-upload w-full flex items-center justify-center' {...getRootProps()}>
          <input {...getInputProps()} />
          {
            pdfFile ?
              <div className='flex flex-col space-y-2 items-center justify-center'>
                <div className='rounded-full bg-slate-800 h-12 w-12 flex items-center justify-center'>
                  <FileText className="w-6 h-6 text-green-500" strokeWidth={1} />
                </div>
                <p className='text-14-regular'>{pdfFile.name}</p>
                <Button className="h-0 hover:bg-transparent hover:text-red-500" variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering file input
                    handelDelete();
                    setPdfFile(null)
                  }}>Cancel</Button>
              </div>
              :
              <div className='flex flex-col items-center justify-center file-upload_label'>
                <Image
                  src="/assets/icons/upload.svg"
                  width={40}
                  height={40}
                  alt="upload"
                />
                <p >Upload the patient’s medical report – drag & drop or click to browse</p>
                <p>PDF only. It will be scanned to auto fill form</p>
              </div>
          }
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomForm
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Fullname"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />
          <CustomForm
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="room"
            label="Room number"
            placeholder="Not admitted"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
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
            label="Phone"
            placeholder="00000 00000"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">

          <CustomForm
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birthDate"
            label="Date of Birth"
          />

          <CustomForm
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-4 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem value={option} id={option} aria-label={option} />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomForm
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="address"
            label="Address"
            placeholder="house, srteet, city, state, country"
          />

          <CustomForm
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="occupation"
            label="Occupation"
            placeholder="Software developer"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomForm
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="emergencyContactName"
            label="Eemergency Contact Name"
            placeholder="Guardian's Name"
          />
          <CustomForm
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="emergencyContactNumber"
            label="Eemergency Contact Number"
            placeholder="00000 00000"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomForm
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insuranceProvider"
            label="Insurance provider"
            placeholder="Health shield"
          />
          <CustomForm
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insurancePolicyNumber"
            label="Insurance Policy Number"
            placeholder="00000XXXXX"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomForm
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="temperature"
            label="Temperature"
            placeholder="98.4 F"
          />
          <CustomForm
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="bloodPressure"
            label="Blood Pressure"
            placeholder="128/85 mmHg"
          />

          <CustomForm
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="diabetes"
            label="Diabetes Mellitus"
            placeholder="5.6 mg/dL"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomForm
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="tachycardia"
            label="Tachycardia"
            placeholder="110 bpm"
          />
          <CustomForm
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="hypoxia"
            label="Hypoxia"
            placeholder="88%"
          />

          <CustomForm
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="respiratoryDistress"
            label="Respiratory Distress"
            placeholder="30 breaths/min"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomForm
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="hypercholesterolemia"
            label="Hypercholesterolemia"
            placeholder="250 mg/dL"
          />
          <CustomForm
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="anemia"
            label="Anemia"
            placeholder="12.0 g/dL"
          />

          <CustomForm
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="chronicKidneyDisease"
            label="Chronic Kidney Disease"
            placeholder="45 mL/min/1.73m²"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomForm
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="gout"
            label="Gout"
            placeholder="7.0 mg/dL"
          />
          <CustomForm
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="coagulationDisorder"
            label="Coagulation Disorder"
            placeholder="3.2 (INR)"
          />

          <CustomForm
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="osteoporosis"
            label="Osteoporosis"
            placeholder="1.4 T-Score"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomForm
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="hypothyroidism"
            label="Hypothyroidism"
            placeholder="5.3 µIU/mL"
          />
          <CustomForm
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="Hyperthyroidism"
            label="Hyperthyroidism"
            placeholder="0.3 µIU/mL"
          />

          <CustomForm
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="obesity"
            label="Obesity"
            placeholder="30 kg/m²"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomForm
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="allergies"
            label="Allergies(if any)"
            placeholder="Peanuts, Pollen, etc"
          />
          <CustomForm
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="currentMedication"
            label="Current Medication(if any)"
            placeholder="Paracetamol 500mg, etc"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomForm
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="description"
            label="Give detailed description"
            placeholder="Enter the patient condition, treatment, problems, etc."
          />
          <CustomForm
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="seriousConditions"
            label="Serious Condition (if any)"
            placeholder="Very high blood pressure, Sugar level increased"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomForm
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="familyMedicalHistory"
            label="Family Medical History"
            placeholder="Describe..."
          />
          <CustomForm
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="pastMedicalHistory"
            label="Past Medical History"
            placeholder="Describe..."
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and verification</h2>
          </div>
        </section>

        <CustomForm
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="identificationType"
          label="Identification Type"
          placeholder="Select an Identification document"
        >{IdentificationTypes.map((types) => (
          <SelectItem className="cursor-pointer item-center gap-2 hover:bg-slate-800" key={types} value={types}>
            {types}
          </SelectItem>
        ))}
        </CustomForm>

        <CustomForm
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="identificationNumber"
          label="Identification Number"
          placeholder="99999XXXXX"
        />

        <CustomForm
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="identificationDocument"
          label="Scanned copy of identification document"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader
                files={field.value}
                onChange={field.onChange}
              />
            </FormControl>
          )}
        />

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consennt and Privacy</h2>
          </div>
        </section>

        <CustomForm
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="I consent to treatment"
        />

        <CustomForm
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="I consent to disclosure of information"
        />

        <CustomForm
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="I consent to privacy policy"
        />

        <div className="flex justify-between gap-6">
          <Button type="reset" className="bg-red-500 hover:bg-red-900 hover:text-white" onClick={() => router.back()}>Cancel</Button>
          <SubmitButton isLoading={isLoading}>Submit</SubmitButton>
        </div>
      </form>
    </Form >
  )
}

export default RegisterForm