// Temporary debug function for browser console
// Add this to window object for easy testing

import { uploadFileToFirebase, STORAGE_FOLDERS } from '../services/firebase/storageService';

// Make functions available globally for debugging
(window as any).debugFirebaseStorage = {
  async testUpload() {
    try {
      console.log('🔥 [Debug] Creating test file...');
      
      // Create a small test file
      const testContent = 'Test upload from browser console';
      const testFile = new File([testContent], 'test.txt', { type: 'text/plain' });
      
      console.log('🔥 [Debug] Starting upload...');
      console.log('🔥 [Debug] File:', { name: testFile.name, size: testFile.size });
      
      const result = await uploadFileToFirebase(testFile, 'debug');
      
      console.log('🔥 [Debug] Upload successful!');
      console.log('🔥 [Debug] Result:', result);
      
      return result;
    } catch (error) {
      console.error('🔥 [Debug] Upload failed:', error);
      throw error;
    }
  },

  async testImageUpload() {
    try {
      console.log('🔥 [Debug] Creating test image...');
      
      // Create a small test image (1x1 pixel PNG)
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      
      return new Promise((resolve, reject) => {
        canvas.toBlob(async (blob) => {
          if (!blob) {
            reject(new Error('Failed to create test image'));
            return;
          }
          
          try {
            const testFile = new File([blob], 'test-image.png', { type: 'image/png' });
            
            console.log('🔥 [Debug] Starting image upload...');
            console.log('🔥 [Debug] File:', { name: testFile.name, size: testFile.size });
            
            const result = await uploadFileToFirebase(testFile, STORAGE_FOLDERS.ANNONCE_IMAGES);
            
            console.log('🔥 [Debug] Image upload successful!');
            console.log('🔥 [Debug] Result:', result);
            
            resolve(result);
          } catch (error) {
            console.error('🔥 [Debug] Image upload failed:', error);
            reject(error);
          }
        }, 'image/png');
      });
    } catch (error) {
      console.error('🔥 [Debug] Test image creation failed:', error);
      throw error;
    }
  },

  getConfig() {
    console.log('🔥 [Debug] Firebase Config:');
    console.log('🔥 [Debug] API Key:', import.meta.env.VITE_FIREBASE_API_KEY?.substring(0, 10) + '...');
    console.log('🔥 [Debug] Project ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID);
    console.log('🔥 [Debug] Storage Bucket:', import.meta.env.VITE_FIREBASE_STORAGE_BUCKET);
    console.log('🔥 [Debug] Auth Domain:', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
  }
};

console.log('🔥 [Debug] Firebase Storage debug functions loaded!');
console.log('🔥 [Debug] Available functions:');
console.log('🔥 [Debug] - debugFirebaseStorage.testUpload()');
console.log('🔥 [Debug] - debugFirebaseStorage.testImageUpload()');  
console.log('🔥 [Debug] - debugFirebaseStorage.getConfig()');
