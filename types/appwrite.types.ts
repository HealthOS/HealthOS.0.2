import { Models } from "node-appwrite";

export interface Patient extends Models.Document {
  userId: string;
  name: string;
  room: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string | undefined;
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
  privacyConsent: boolean;
  temperature: string | undefined;
  bloodPressure: string | undefined;
  description: string | undefined;
  seriousConditions: string | undefined;
  diabetes: string | undefined;
  tachycardia: string | undefined;
  hypoxia: string | undefined;
  respiratoryDistress: string | undefined;
  hypercholesterolemia: string | undefined;
  anemia: string | undefined;
  chronicKidneyDisease: string | undefined;
  hypothyroidism: string | undefined;
  hyperthyroidism: string | undefined;
  obesity: string | undefined;
  gout: string | undefined;
  coagulationDisorder: string | undefined;
  osteoporosis: string | undefined;
  report: string | undefined;
  doctor: DoctorParams;
}

export interface Bill extends Models.Document {
  patient: Patient;
  dateTime: Date;
  transactionAmount: number;
  userId: string;
}

export interface Appointment extends Models.Document {
  patient: Patient;
  schedule: Date;
  status: Status;
  primaryPhysician: string;
  reason: string;
  note: string;
  userId: string;
  cancellationReason: string | null;
}

export interface DoctorParams extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  birthDate?: Date;
  passKey?: string;
  registrationNumber?: string;
  licensingAuthority?: string;
  validFrom?: Date;
  validTill?: Date;
  specialization?: string;
  experience?: string;
  highestDegree?: string;
  university?: string;
  yearOfGraduation?: string;
}
