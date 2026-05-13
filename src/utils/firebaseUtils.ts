import { deleteFileFromFirebase } from '../services/firebase/storageService';

/**
 * Utility function to clean up uploaded files from Firebase Storage
 * This is useful when the form submission fails after files are uploaded
 */
export async function cleanupUploadedFiles(uploadedUrls: string[]): Promise<void> {
  if (!uploadedUrls || uploadedUrls.length === 0) {
    return;
  }

  console.log('🧹 [Cleanup] Starting cleanup of uploaded files:', uploadedUrls.length);

  const cleanupPromises = uploadedUrls.map(async (url) => {
    try {
      // Extract the file path from the Firebase Storage URL
      // Firebase Storage URLs have format: https://firebasestorage.googleapis.com/v0/b/{bucket}/o/{path}?alt=media&token={token}
      const urlParts = url.split('/o/')[1]?.split('?')[0];
      if (urlParts) {
        const filePath = decodeURIComponent(urlParts);
        await deleteFileFromFirebase(filePath);
        console.log('🧹 [Cleanup] Deleted file:', filePath);
      }
    } catch (error) {
      console.error('🧹 [Cleanup] Failed to delete file:', url, error);
      // Don't throw error here - cleanup should not fail the main operation
    }
  });

  try {
    await Promise.allSettled(cleanupPromises);
    console.log('🧹 [Cleanup] Cleanup completed');
  } catch (error) {
    console.error('🧹 [Cleanup] Cleanup failed:', error);
  }
}

/**
 * Extract file path from Firebase Storage URL
 */
export function extractFilePathFromUrl(url: string): string | null {
  try {
    const urlParts = url.split('/o/')[1]?.split('?')[0];
    return urlParts ? decodeURIComponent(urlParts) : null;
  } catch (error) {
    console.error('Failed to extract file path from URL:', url, error);
    return null;
  }
}
