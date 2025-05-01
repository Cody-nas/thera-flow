"use server";

import { ID, Query } from "node-appwrite";
import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";

// Create appwrite user
export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return newUser; // ✅ Return on successful creation
  } catch (error: any) {
    if (error?.code === 409) {
      try {
        const documents = await users.list([
          Query.equal("email", [user.email]),
        ]);
        return documents?.users?.[0];
      } catch (innerError) {
        console.error("Failed to fetch existing user:", innerError);
      }
    }

    console.error("User creation error:", error);
    throw error; // optional: rethrow if you want to handle it in the UI
  }
};

// GetUser
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.error("Failed to get user:", error);
  }
};

// Register patient
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument.get("blobFile") as Blob,
        identificationDocument.get("fileName") as string
      );
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
        ...patient,
      }
    );
    return parseStringify(newPatient);
  } catch (error) {
    console.log(error);
  }
};

// Get patient
export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userid", userId)]
    );
    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error("Failed to get user:", error);
  }
};
