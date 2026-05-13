import { useState } from "react";
import {
  STORAGE_FOLDERS,
  uploadFileToFirebase,
  UploadResult,
} from "../services/firebase/storageService";

export interface UseFirebaseUploadResult {
  uploadFiles: (files: File[], folder?: string) => Promise<UploadResult[]>;
  uploadSingleFile: (file: File, folder?: string) => Promise<UploadResult>;
  isUploading: boolean;
  uploadProgress: number;
  error: string | null;
}

/**
 * Custom hook for uploading files to Firebase Storage
 * @param defaultFolder - Default folder to upload to
 * @returns Upload functions and state
 */
export function useFirebaseUpload(
  defaultFolder: string = STORAGE_FOLDERS.ANNONCE_IMAGES
): UseFirebaseUploadResult {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadFiles = async (
    files: File[],
    folder: string = defaultFolder
  ): Promise<UploadResult[]> => {
    if (!files || files.length === 0) {
      throw new Error("No files provided for upload");
    }

    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const results: UploadResult[] = [];

      // Upload files one by one to track progress better
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        try {
          const result = await uploadFileToFirebase(file, folder);
          results.push(result);

          // Update progress
          const progress = Math.round(((i + 1) / files.length) * 100);
          setUploadProgress(progress);
        } catch (fileError) {
          throw new Error(
            `Failed to upload ${file.name}: ${
              fileError instanceof Error ? fileError.message : "Unknown error"
            }`
          );
        }
      }

      return results;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Upload failed";
      setError(errorMessage);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  const uploadSingleFile = async (
    file: File,
    folder: string = defaultFolder
  ): Promise<UploadResult> => {
    if (!file) {
      throw new Error("No file provided for upload");
    }

    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const result = await uploadFileToFirebase(file, folder);

      setUploadProgress(100);

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Upload failed";
      setError(errorMessage);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadFiles,
    uploadSingleFile,
    isUploading,
    uploadProgress,
    error,
  };
}
