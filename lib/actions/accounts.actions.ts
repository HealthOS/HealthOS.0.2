import { Client, Account } from "appwrite";

import { ID } from "node-appwrite";
import { ENDPOINT, PROJECT_ID } from "../appwrite.config";
import { parseStringify } from "../utils";

const client = new Client()
    .setEndpoint(ENDPOINT!)
    .setProject(PROJECT_ID!);

const account = new Account(client);

export const createAccount = async ({ email, password }:
    {
        email: string
        password: string
    }) => {

    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password
        );

        if (newAccount) {
            createSession({ email, password })
        } else {
            return parseStringify(newAccount)
        }
    } catch (error) {
        console.log(error)
        return null;
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
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const getUser = async () => {
    try {
        let user = await account.get();

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
        return null;
    }
}