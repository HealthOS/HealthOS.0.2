'use server';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ID, Query } from "node-appwrite"
import { databases, DATABASE_ID, DOCTOR_COLLECTION_ID, users } from "../appwrite.config"
import { parseStringify } from "../utils";
import { DoctorParams, } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";


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

  export const deleteDoctor = async (userId: string) => {
    try {
      const doctors = await users.delete(
        userId
      );
      return parseStringify(doctors);
  
    } catch (error) {
      console.log(error)
    }
  }

  export const updateDoctor = async ({ userId, ...doctor }: {
    userId: string;
    doctor: DoctorParams;
  }) => {
    try {
      const updatedUpdate = await databases.updateDocument(
        DATABASE_ID!,
        DOCTOR_COLLECTION_ID!,
        userId,
        {
          ...doctor,
        }
      )
  
      if (!updatedUpdate) {
        throw new Error('Doctor not found');
      }
  
      return parseStringify(updatedUpdate);
  
    } catch (error) {
      console.log(error);
    }
  }