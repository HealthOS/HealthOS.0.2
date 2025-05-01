'use server';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ID, Query } from "node-appwrite"
import { BUCKET_ID, users, storage, databases, DATABASE_ID, PATIENT_COLLECTION_ID, ENDPOINT, PROJECT_ID, APPOINTMENT_COLLECTION_ID } from "../appwrite.config"
import { parseStringify } from "../utils"
import { InputFile } from "node-appwrite/file";
import { revalidatePath } from "next/cache";
import { Patient } from "@/types/appwrite.types";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    )
    console.log(newUser);
    return parseStringify(newUser)

  } catch (error: any) {
    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email])
      ])

      return existingUser?.users[0];
    }
  }
}

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user)
  } catch (error) {
    console.log(error)
  }
}

export const registerPatient = async ({ identificationDocument, ...patient }: RegisterUserParams) => {
  try {
    let file;

    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get('blobFile') as Blob,
        identificationDocument?.get('fileName') as string,
      )
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile)
    }

    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
        ...patient
      }
    )
    return parseStringify(newPatient)

  } catch (error) {
    console.log(error)
  }
}

export const updatePatient = async ({ identificationDocument, userId, ...patient }: Patient) => {
  try {

    let file;

    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get('blobFile') as Blob,
        identificationDocument?.get('fileName') as string,
      )
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile)

      const updatedPatient = await databases.updateDocument(
        DATABASE_ID!,
        PATIENT_COLLECTION_ID!,
        userId,
        {
          identificationDocumentId: file?.$id || null,
          identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
          ...patient
        }
      )

      if (!updatedPatient) {
        throw new Error('Appointment not found');
      }

      console.log(updatedPatient);

      revalidatePath('/admin');
      return parseStringify(updatedPatient);
    }

    const updatedPatient = await databases.updateDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      userId,
      {
        ...patient,
      }
    )

    if (!updatedPatient) {
      throw new Error('Appointment not found');
    }
    console.log(updatedPatient);

    revalidatePath('/admin');
    return parseStringify(updatedPatient);
  } catch (error) {
    console.log(error);
  }
}

export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal('userId', userId)]
    );

    if (!patients.documents[0]) return null;

    return parseStringify(patients.documents[0]);

  } catch (error) {
    console.log(error)
  }
}

export const deletePatient = async (userId: string) => {
  ""
  try {
    const deletedUser = await users.delete(userId);
    return (true);

  } catch (error) {
    console.log(error)
    return (false);
  }
}

export const deleteProfile = async (userId: string) => {
  try {
    const documents = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal('userId', userId)]
    );

    if (documents.total > 0) {
      const documentId = documents.documents[0].$id;
      console.log(documentId);

      await databases.deleteDocument(
        DATABASE_ID!,
        PATIENT_COLLECTION_ID!,
        documentId
      );
      console.log(`Appointment with userId ${userId} has been deleted.`);
    } else {
      console.error(`No document found with userId: ${userId}`);
    }
  } catch (error) {
    console.error('Error deleting appointment:', error);
  }
};

export const deleteAppointment = async (userId: string) => {
  try {
    const documents = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [
        Query.equal('userId', userId)
      ]
    );

    if (documents.total > 0) {
      for (const document of documents.documents) {
        const documentId = document.$id;
        console.log(documentId);
        await databases.deleteDocument(
          DATABASE_ID!,
          APPOINTMENT_COLLECTION_ID!,
          documentId
        );

        console.log(`Appointment with userId ${userId} and documentId ${documentId} has been deleted.`);
      }
    } else {
      console.error(`No documents found with userId: ${userId}`);
    }
  } catch (error) {
    console.error('Error deleting appointment:', error);
  }
};

// 679a61ef0026b0ed7a7f

export const getAllPatients = async ( doctor:string ) => {
  try {
    const data = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [
        Query.equal('doctor', doctor),
        Query.orderAsc('name')
      ],
    );
    return parseStringify(data.documents);
  } catch (error) {
    console.log(error)
  }
}

export const getAllPatientsByNewest = async ( doctor:string ) => {
  try {
    const data = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [
        Query.equal('doctor', doctor),
        Query.orderDesc('$createdAt')
      ]
    );
    return parseStringify(data.documents);
  } catch (error) {
    console.log(error)
  }
}

export const getAllPatientsByOldest = async ( doctor:string ) => {
  try {
    const data = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [
        Query.equal('doctor', doctor),
        Query.orderAsc('$createdAt')
      ]
    );
    return parseStringify(data.documents);
  } catch (error) {
    console.log(error)
  }
}