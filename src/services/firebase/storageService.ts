import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, UploadResult as FirebaseUploadResult } from 'firebase/storage';
import app from './config';

// Initialize Firebase Storage with custom domain
const storage = getStorage(app);

// Set custom domain for Firebase Storage URLs
const firebaseStorageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "marocadszone-2298a.appspot.com";
console.log("Using Firebase Storage bucket:", firebaseStorageBucket);
const storageBaseUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseStorageBucket}/o/`;
const storageTokenSuffix = '?alt=media';

export interface UploadResult {
  url: string;
  path: string;
}

/**
 * Upload a single file to Firebase Storage
 * @param file - The file to upload
 * @param folder - The folder path in storage (e.g., 'annonces/images' or 'annonces/videos')
 * @param fileName - Optional custom filename (if not provided, uses original filename with timestamp)
 * @returns Promise with download URL and storage path
 */
export async function uploadFileToFirebase(
  file: File, 
  folder: string, 
  fileName?: string
): Promise<UploadResult> {
  try {
    // Generate unique filename if not provided
    const timestamp = Date.now();
    const finalFileName = fileName || `${timestamp}_${file.name}`;
    const filePath = `${folder}/${finalFileName}`;
    
    console.log(`🔥 [Firebase Storage] Uploading file to: ${filePath}`);
    console.log(`🔥 [Firebase Storage] File size: ${file.size} bytes`);
    console.log(`🔥 [Firebase Storage] File type: ${file.type}`);
    
    // Validate file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      throw new Error(`File too large: ${file.name} (${file.size} bytes). Maximum size is 100MB.`);
    }
    
    // Create storage reference
    const storageRef = ref(storage, filePath);
    
    // Add timeout to prevent hanging uploads
    const uploadPromise = uploadBytes(storageRef, file);
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        console.error(`🔥 [Firebase Storage] Upload timeout after 120 seconds for file: ${file.name}`);
        reject(new Error('Upload timeout after 120 seconds'));
      }, 120000); // Increased timeout
    });
    
    // Upload file with timeout
    console.log(`🔥 [Firebase Storage] Starting upload...`);
    console.log(`🔥 [Firebase Storage] Upload promise created, waiting for completion...`);
    
    const snapshot = await Promise.race([uploadPromise, timeoutPromise]) as FirebaseUploadResult;
    console.log(`🔥 [Firebase Storage] Upload completed! Snapshot received:`, snapshot.metadata.name);
    console.log(`🔥 [Firebase Storage] Upload metadata:`, {
      size: snapshot.metadata.size,
      timeCreated: snapshot.metadata.timeCreated,
      updated: snapshot.metadata.updated
    });
    
    // Get download URL with timeout
    console.log(`🔥 [Firebase Storage] Generating download URL...`);
    
    // Try to get the download URL using Firebase's method first
    try {
      const urlPromise = getDownloadURL(snapshot.ref);
      const urlTimeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('URL generation timeout after 60 seconds')), 60000);
      });
      
      console.log(`🔥 [Firebase Storage] Waiting for download URL...`);
      const downloadURL = await Promise.race([urlPromise, urlTimeoutPromise]) as string;
      console.log(`🔥 [Firebase Storage] Download URL generated successfully:`, downloadURL);
      return {
        url: downloadURL,
        path: filePath
      };
    } catch (urlError) {
      console.warn(`🔥 [Firebase Storage] Error getting download URL via Firebase method:`, urlError);
      console.log(`🔥 [Firebase Storage] Falling back to manual URL construction...`);
      
      // Fallback: Construct the URL manually to avoid CORS issues
      const encodedFilePath = encodeURIComponent(filePath);
      const manualURL = `${storageBaseUrl}${encodedFilePath}${storageTokenSuffix}`;
      console.log(`🔥 [Firebase Storage] Manual URL constructed:`, manualURL);
      
      return {
        url: manualURL,
        path: filePath
      };
    }
    
    // Return statement moved to try/catch block
  } catch (error) {
    console.error('🔥 [Firebase Storage] Upload failed:', error);
    console.error('🔥 [Firebase Storage] Error details:', JSON.stringify(error, null, 2));
    
    // Log additional error properties
    if (error && typeof error === 'object') {
      console.error('🔥 [Firebase Storage] Error code:', (error as any).code);
      console.error('🔥 [Firebase Storage] Error message:', (error as any).message);
      console.error('🔥 [Firebase Storage] Error serverResponse:', (error as any).serverResponse);
      console.error('🔥 [Firebase Storage] Error customData:', (error as any).customData);
    }
    
    throw new Error(`Failed to upload ${file.name}: Firebase Storage error - check console for details`);
  }
}

/**
 * Upload multiple files to Firebase Storage
 * @param files - Array of files to upload
 * @param folder - The folder path in storage
 * @returns Promise with array of upload results
 */
export async function uploadMultipleFilesToFirebase(
  files: File[], 
  folder: string
): Promise<UploadResult[]> {
  try {
    console.log(`🔥 [Firebase Storage] Uploading ${files.length} files to ${folder}`);
    
    const results: UploadResult[] = [];
    
    // Upload files sequentially to avoid overwhelming Firebase
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(`🔥 [Firebase Storage] Uploading file ${i + 1}/${files.length}: ${file.name}`);
      
      try {
        const timestamp = Date.now() + i; // Ensure unique timestamps
        const result = await uploadFileToFirebase(file, folder, `${timestamp}_${i}_${file.name}`);
        results.push(result);
        console.log(`🔥 [Firebase Storage] File ${i + 1}/${files.length} uploaded successfully`);
      } catch (fileError) {
        console.error(`🔥 [Firebase Storage] Failed to upload file ${i + 1}/${files.length}:`, fileError);
        throw new Error(`Failed to upload ${file.name}: ${fileError instanceof Error ? fileError.message : 'Unknown error'}`);
      }
    }
    
    console.log(`🔥 [Firebase Storage] All ${files.length} files uploaded successfully`);
    console.log(`🔥 [Firebase Storage] Upload results:`, results);
    
    return results;
  } catch (error) {
    console.error('🔥 [Firebase Storage] Multiple upload failed:', error);
    throw error;
  }
}

/**
 * Delete a file from Firebase Storage
 * @param filePath - The path to the file in storage
 */
export async function deleteFileFromFirebase(filePath: string): Promise<void> {
  try {
    const storageRef = ref(storage, filePath);
    await deleteObject(storageRef);
    console.log(`🔥 [Firebase Storage] File deleted: ${filePath}`);
  } catch (error) {
    console.error('🔥 [Firebase Storage] Delete failed:', error);
    throw error;
  }
}

/**
 * Get file folder paths for different content types
 */
export const STORAGE_FOLDERS = {
  ANNONCE_IMAGES: 'annonces/images',
  ANNONCE_VIDEOS: 'annonces/videos',
  PROFILE_IMAGES: 'profiles/images',
  COMPANY_IMAGES: 'companies/images',
} as const;

export default storage;
