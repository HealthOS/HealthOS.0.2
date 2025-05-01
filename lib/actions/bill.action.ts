'use server';

import { ID, Query } from "node-appwrite"
import { BILL_COLLECTION_ID, DATABASE_ID, databases } from "../appwrite.config"
import { parseStringify } from "../utils"
import { Bill } from "@/types/appwrite.types";


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

export const getAllPatientBills = async ( doctor : string ) => {
    try {
        const billsData = await databases.listDocuments(
            DATABASE_ID!,
            BILL_COLLECTION_ID!,
            [
                Query.equal("doctor", doctor),
                Query.orderDesc("$createdAt")
            ]
        );

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Midnight today

        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1); // Midnight yesterday

        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const initialCounts = {
            todayTxn: 0,
            yesterdayTxn: 0,
            last7dTxn: 0
        }

        const counts = (billsData.documents as Bill[]).reduce((acc, bill) => {

            const billDate = new Date(bill.dateTime);
            const billDay = new Date(billDate.getFullYear(), billDate.getMonth(), billDate.getDate());

            if (billDay.getTime() === today.getTime()) acc.todayTxn += bill.transactionAmount;
            else if (billDay.getTime() === yesterday.getTime()) acc.yesterdayTxn += bill.transactionAmount;
            if (billDay.getTime() >= sevenDaysAgo.getTime()) acc.last7dTxn += bill.transactionAmount;
            return acc;
        }, initialCounts);

        const data = {
            totalCount: billsData.total,
            ...counts,
            documents: billsData.documents
        }
        
        return parseStringify(data);
    } catch (error) {
        console.log(error)
    }
}

export const getAllBillsByOldest = async () => {
    try {
        const data = await databases.listDocuments(
            DATABASE_ID!,
            BILL_COLLECTION_ID!,
            [Query.orderAsc("$createdAt")]
        );
        return parseStringify(data.documents);
    } catch (error) {
        console.log(error)
    }
}