import { uploadFileToFirebase, uploadMultipleFilesToFirebase, deleteFileFromFirebase, STORAGE_FOLDERS, UploadResult } from '../services/firebase/storageService';

/**
 * Helper functions to replace Spatie Media functionality with Firebase Storage
 */

/**
 * Upload files for an announcement (replaces Spatie Media collection)
 */
export const uploadAnnonceFiles = async (files: File[]): Promise<UploadResult[]> => {
  return await uploadMultipleFilesToFirebase(files, STORAGE_FOLDERS.ANNONCE_IMAGES);
};

/**
 * Upload profile image
 */
export const uploadProfileImage = async (file: File): Promise<UploadResult> => {
  return await uploadFileToFirebase(file, STORAGE_FOLDERS.PROFILE_IMAGES);
};

/**
 * Upload company images
 */
export const uploadCompanyImages = async (files: File[]): Promise<UploadResult[]> => {
  return await uploadMultipleFilesToFirebase(files, STORAGE_FOLDERS.COMPANY_IMAGES);
};

/**
 * Delete file by path (replaces Spatie Media delete)
 */
export const deleteStorageFile = async (filePath: string): Promise<void> => {
  return await deleteFileFromFirebase(filePath);
};

/**
 * Extract file path from Firebase URL for deletion
 */
export const getFilePathFromUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    const pathMatch = urlObj.pathname.match(/\/o\/(.+)\?/);
    return pathMatch ? decodeURIComponent(pathMatch[1]) : '';
  } catch {
    return '';
  }
};