'use server';

import { ID, Query } from "node-appwrite"
import { BILL_COLLECTION_ID, DATABASE_ID, databases } from "../appwrite.config"
import { parseStringify } from "../utils"
import { Bill } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";


export const addTransactionAmount = async (bill: CreateBillParams) => {
    try {
        const newBill = await databases.createDocument(
            DATABASE_ID!,
            BILL_COLLECTION_ID!,
            ID.unique(),
            bill
        )
        return parseStringify(newBill)
    } catch (error) {
        console.log(error);    
    }
}

export const getBillsByUser = async (userId: string) => {
    try {
        const bills = await databases.listDocuments(
            DATABASE_ID!,
            BILL_COLLECTION_ID!,
            [
                Query.equal("userId", userId),
                Query.orderDesc("$createdAt"),
            ]
        );

        const data = {
            totalCount: bills.total,
            documents: bills.documents
        };

        return parseStringify(data);
    } catch (error) {
        console.log("Error fetching bills:", error);
    }
};

export const getAllPatientBills = async () => {
    try {
        const data = await databases.listDocuments(
            DATABASE_ID!,
            BILL_COLLECTION_ID!,
            [Query.orderDesc("$createdAt")]
        );
        return parseStringify(data.documents);
    } catch (error) {
        console.log(error)
    }
}