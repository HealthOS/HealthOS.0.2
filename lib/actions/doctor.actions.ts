'use server';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ID, Query } from "node-appwrite"
import { BUCKET_ID, storage, databases, DATABASE_ID, PATIENT_COLLECTION_ID, ENDPOINT, PROJECT_ID, APPOINTMENT_COLLECTION_ID, DOCTOR_COLLECTION_ID } from "../appwrite.config"
import { parseStringify } from "../utils";
import { DoctorParams, } from "@/types/appwrite.types";


export const registerDoctor = async ( doctor : DoctorParams ) => {
    try {
  
      const newPatient = await databases.createDocument(
        DATABASE_ID!,
        DOCTOR_COLLECTION_ID!,
        ID.unique(),
        doctor
      )
      return parseStringify(newPatient)
  
    } catch (error) {
      console.log(error)
    }
  }

  export const getDoctor = async (userId: string) => {
    try {
      const doctors = await databases.listDocuments(
        DATABASE_ID!,
        DOCTOR_COLLECTION_ID!,
        [Query.equal('userId', userId)]
      );
  
      if(!doctors.documents[0]) return null;
  
      return parseStringify(doctors.documents[0]);
  
    } catch (error) {
      console.log(error)
    }
  }