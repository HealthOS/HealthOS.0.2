import * as sdk from 'node-appwrite';

export const {
  PROJECT_ID = process.env.PROJECT_ID,
  API_KEY = process.env.API_KEY,
  DATABASE_ID = process.env.DATABASE_ID,
  PATIENT_COLLECTION_ID = process.env.PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID = process.env.DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID = process.env.APPOINTMENT_COLLECTION_ID,
  BILL_COLLECTION_ID = process.env.BILL_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID = process.env.NEXT_PUBLIC_BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT,
} = process.env;

const client = new sdk.Client();

client
  .setEndpoint(ENDPOINT!)  // Using environment variable
  .setProject(PROJECT_ID!)  // Using environment variable
  .setKey(API_KEY!);  // Using environment variable
  

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);