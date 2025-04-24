'use server';

import { BUCKET_ID } from '../appwrite.config';
import { ID } from 'node-appwrite';
import { parseStringify } from '../utils';
import { storage } from './accounts.actions';

export const uploadPDF = async (file: File) => {

  try {
    const result = await storage.createFile(
      BUCKET_ID!,
      ID.unique(),
      file
    )
    return parseStringify(result);

  } catch (error) {

  }
}

export const deletePDF = async (fileId: string) => {

  try {
    const result = await storage.deleteFile(
      BUCKET_ID!, // bucketId
      fileId // fileId
    );

    return result;

  } catch (error) {

  }
}

export const extractTextFromPDF = async (fileId: string) => {
  try {

    const response = storage.getFileDownload(BUCKET_ID!, fileId);

    const res = await fetch(`http://localhost:8000/extract-text?file_url=${encodeURIComponent(response)}`);
    const data = await res.json();

    if (data) {
      console.log("Extracted Text:", data);
    }
    else{
      console.log("Error extracting text:", data);
    }

      const text = data.data.candidates[0].content.parts[0].text;
      const cleanText = text.replace(/^```json\s*|\s*```$/g, '');

      const obj = JSON.parse(cleanText);
      return obj;
    } catch (error) {
      console.log("PDF extraction error:", error);
      return error;
    }
  };
