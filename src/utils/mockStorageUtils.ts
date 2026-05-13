/**
 * This file provides mock implementations for Firebase Storage operations
 * to use during development when CORS issues prevent direct uploads.
 */

import { UploadResult } from '../services/firebase/storageService';

export interface MockUploadOptions {
  delay?: number;
  simulateError?: boolean;
  errorMessage?: string;
}

/**
 * Simulates a file upload by creating a fake URL and returning mock data
 * Useful for development when Firebase Storage CORS is not configured
 */
export async function mockFileUpload(
  file: File,
  folder: string,
  options: MockUploadOptions = {}
): Promise<UploadResult> {
  const {
    delay = 1000,
    simulateError = false,
    errorMessage = 'Simulated upload error'
  } = options;

  console.log(`🧪 [Mock Storage] Simulating upload of ${file.name} to ${folder}`);
  
  // Create a pseudo-random ID based on timestamp and filename
  const timestamp = Date.now();
  const randomId = Math.floor(Math.random() * 10000);
  const filePath = `${folder}/${timestamp}_${file.name.replace(/\s+/g, '_')}`;
  
  // Create a simulated file URL that looks like a Firebase Storage URL
  const mockUrl = `https://firebasestorage.googleapis.com/v0/b/mock-storage/o/${encodeURIComponent(
    filePath
  )}?alt=media&token=mock-${timestamp}-${randomId}`;
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // Optionally simulate an error
  if (simulateError) {
    throw new Error(errorMessage);
  }
  
  // Create mock preview for images
  let imagePreview: string | null = null;
  if (file.type.startsWith('image/')) {
    try {
      imagePreview = await createImagePreview(file);
      console.log(`🧪 [Mock Storage] Created image preview`);
    } catch (error) {
      console.warn(`🧪 [Mock Storage] Failed to create image preview:`, error);
    }
  }
  
  console.log(`🧪 [Mock Storage] Upload simulation completed for ${file.name}`);
  console.log(`🧪 [Mock Storage] Mock URL: ${mockUrl}`);
  
  return {
    url: mockUrl,
    path: filePath,
    // Additional development-only data
    _devMockData: {
      imagePreview,
      timestamp,
      randomId,
      originalFileName: file.name,
      fileSize: file.size,
      fileType: file.type
    }
  } as UploadResult;
}

/**
 * Creates a data URL preview for an image file
 */
async function createImagePreview(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Mocks uploading multiple files
 */
export async function mockMultipleFileUpload(
  files: File[],
  folder: string,
  options: MockUploadOptions = {}
): Promise<UploadResult[]> {
  const results: UploadResult[] = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    console.log(`🧪 [Mock Storage] Uploading file ${i + 1}/${files.length}: ${file.name}`);
    
    const result = await mockFileUpload(file, folder, options);
    results.push(result);
  }
  
  return results;
}
