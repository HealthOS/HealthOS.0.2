import { Client, Account } from "appwrite";

import { ID } from "node-appwrite";
import { ENDPOINT, PROJECT_ID } from "../appwrite.config";
import { parseStringify } from "../utils";

const client = new Client()
    .setEndpoint(ENDPOINT!)
    .setProject(PROJECT_ID!);

const account = new Account(client);

export const createAccount = async ({ email, password, name }:
    {
        email: string
        password: string
        name: string
    }) => {

    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            name
        );
            return parseStringify(newAccount);
    } catch (error) {
        console.log(error)
        return error;
    }
}

export const createSession = async ({ email, password }:
    {
        email: string
        password: string
    }) => {

    try {
        const newSession = await account.createEmailPasswordSession(
            email,
            password
        );

        return parseStringify(newSession)
    } catch (error:any) {
        console.log(error.message)
        return { error: true, message: error.message || "Failed to fetch user" };;
    }
}

export const getUser = async () => {
    try {
        let user = await account.get();

        console.log(user);

        return parseStringify(user);

    } catch (error) {
        console.log(error)
        return null;
    }
}

export const logout = async () => {
    try {

        let user = await account.deleteSessions();

        return parseStringify(user);

    } catch (error) {
        console.log(error)
        return error;
    }
}


export const UpdatePassword = async ({currentPassword, newPassword}:{
    currentPassword: string
    newPassword: string
}) => {
    try {

        const result = await account.updatePassword(
            newPassword, // password
            currentPassword // oldPassword (optional)
        );

        return parseStringify(result);

    } catch (error) {
        console.log(error)
        return null;
    }
}