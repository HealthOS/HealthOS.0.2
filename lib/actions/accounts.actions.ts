import { Client, Account, Storage } from "appwrite";

import { ID } from "node-appwrite";
import { ENDPOINT, PROJECT_ID } from "../appwrite.config";
import { parseStringify } from "../utils";

export const client = new Client()
    .setEndpoint(ENDPOINT!)
    .setProject(PROJECT_ID!);

export const storage = new Storage(client);

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
        console.log(newAccount)
        return parseStringify(newAccount);
    } catch (error: unknown) {
  // First, narrow the type
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const err = error as { code: number }; // optionally extend with message if needed
    if (err.code === 409) {
      return 409;
    }
  }

  if (error instanceof Error) {
    return { error: true, message: error.message || "Failed to create user" };
  }

  // Fallback if it's not an Error instance
  return { error: true, message: "Failed to create user" };
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
            return { error: true, message: error || "Failed to fetch user" };
        }
    }

    export const getUser = async () => {
        try {
            const user = await account.get();

            return parseStringify(user);

        } catch (error) {
            console.log(error)
            return null;
        }
    }

    export const logout = async () => {
        try {

            const user = await account.deleteSessions();

            return parseStringify(user);

        } catch (error) {
            console.log(error)
            return error;
        }
    }


    export const UpdatePassword = async ({ currentPassword, newPassword }: {
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