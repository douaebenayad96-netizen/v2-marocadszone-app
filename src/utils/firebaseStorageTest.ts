import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../services/firebase/config';

/**
 * Test Firebase Storage connection and upload functionality
 */
export async function testFirebaseStorage(): Promise<void> {
  try {
    console.log('🔥 [Storage Test] Testing Firebase Storage connection...');
    
    // Create a simple test file
    const testContent = 'Firebase Storage Test';
    const testFile = new Blob([testContent], { type: 'text/plain' });
    const testFileName = `test_${Date.now()}.txt`;
    
    // Create storage reference
    const storageRef = ref(storage, `test/${testFileName}`);
    
    console.log('🔥 [Storage Test] Uploading test file...');
    
    // Upload test file
    const snapshot = await uploadBytes(storageRef, testFile);
    console.log('🔥 [Storage Test] Test file uploaded successfully:', snapshot.metadata.name);
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('🔥 [Storage Test] Download URL generated:', downloadURL);
    
    console.log('🔥 [Storage Test] Firebase Storage test completed successfully!');
    
    return;
  } catch (error) {
    console.error('🔥 [Storage Test] Firebase Storage test failed:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('storage/unauthorized')) {
        console.error('🔥 [Storage Test] PERMISSION DENIED - Check Firebase Storage Rules');
        console.error('🔥 [Storage Test] Your Firebase Storage rules may be too restrictive');
        console.error('🔥 [Storage Test] Consider updating rules to allow authenticated users');
      } else if (error.message.includes('network')) {
        console.error('🔥 [Storage Test] NETWORK ERROR - Check internet connection');
      } else if (error.message.includes('quota')) {
        console.error('🔥 [Storage Test] QUOTA EXCEEDED - Check Firebase Storage quota');
      }
    }
    
    throw error;
  }
}

/**
 * Get Firebase Storage configuration for debugging
 */
export function getStorageConfig(): void {
  console.log('🔥 [Storage Config] Firebase Storage Configuration:');
  console.log('🔥 [Storage Config] Storage Bucket:', import.meta.env.VITE_FIREBASE_STORAGE_BUCKET);
  console.log('🔥 [Storage Config] Project ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID);
  console.log('🔥 [Storage Config] Storage instance:', storage);
}
