import { uploadFileToFirebase, STORAGE_FOLDERS, UploadResult } from '../services/firebase/storageService';
import { cleanupUploadedFiles } from '../utils/firebaseUtils';

/**
 * Firebase Storage Test Utility
 * Use this for manual testing of Firebase Storage functionality
 */
export class FirebaseStorageTestUtil {
  
  /**
   * Test basic file upload functionality
   */
  static async testBasicUpload(): Promise<UploadResult> {
    console.log('🧪 [Test] Starting basic upload test...');
    
    try {
      // Create a simple test file
      const testContent = 'Test file content for Firebase Storage';
      const testFile = new File([testContent], 'test.txt', { type: 'text/plain' });
      
      console.log('🧪 [Test] Uploading test file...');
      const result = await uploadFileToFirebase(testFile, 'test');
      
      console.log('🧪 [Test] Upload successful!');
      console.log('🧪 [Test] Result:', result);
      
      // Clean up
      await cleanupUploadedFiles([result.url]);
      console.log('🧪 [Test] Cleanup completed');
      
      return result;
    } catch (error) {
      console.error('🧪 [Test] Basic upload test failed:', error);
      throw error;
    }
  }
  
  /**
   * Test image upload functionality
   */
  static async testImageUpload(): Promise<UploadResult> {
    console.log('🧪 [Test] Starting image upload test...');
    
    try {
      // Create a test image (1x1 pixel PNG)
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
            
            console.log('🧪 [Test] Uploading test image...');
            const result = await uploadFileToFirebase(testFile, STORAGE_FOLDERS.ANNONCE_IMAGES);
            
            console.log('🧪 [Test] Image upload successful!');
            console.log('🧪 [Test] Result:', result);
            
            // Clean up
            await cleanupUploadedFiles([result.url]);
            console.log('🧪 [Test] Image cleanup completed');
            
            resolve(result);
          } catch (error) {
            console.error('🧪 [Test] Image upload test failed:', error);
            reject(error);
          }
        }, 'image/png');
      });
    } catch (error) {
      console.error('🧪 [Test] Image upload test failed:', error);
      throw error;
    }
  }
  
  /**
   * Test multiple files upload
   */
  static async testMultipleUpload(): Promise<UploadResult[]> {
    console.log('🧪 [Test] Starting multiple upload test...');
    
    try {
      // Create multiple test files
      const files = [];
      for (let i = 0; i < 3; i++) {
        const content = `Test file ${i + 1} content`;
        const file = new File([content], `test-${i + 1}.txt`, { type: 'text/plain' });
        files.push(file);
      }
      
      console.log('🧪 [Test] Uploading multiple files...');
      const results = [];
      
      for (const file of files) {
        const result = await uploadFileToFirebase(file, 'test');
        results.push(result);
        console.log(`🧪 [Test] Uploaded: ${file.name}`);
      }
      
      console.log('🧪 [Test] Multiple upload successful!');
      console.log('🧪 [Test] Results:', results);
      
      // Clean up all files
      const urls = results.map(r => r.url);
      await cleanupUploadedFiles(urls);
      console.log('🧪 [Test] Multiple files cleanup completed');
      
      return results;
    } catch (error) {
      console.error('🧪 [Test] Multiple upload test failed:', error);
      throw error;
    }
  }
  
  /**
   * Test large file upload (should fail with size limit)
   */
  static async testLargeFileUpload(): Promise<void> {
    console.log('🧪 [Test] Starting large file upload test...');
    
    try {
      // Create a large file (over 100MB limit)
      const largeContent = new ArrayBuffer(101 * 1024 * 1024); // 101MB
      const largeFile = new File([largeContent], 'large-test.bin', { type: 'application/octet-stream' });
      
      console.log('🧪 [Test] Attempting to upload large file (should fail)...');
      
      try {
        await uploadFileToFirebase(largeFile, 'test');
        console.error('🧪 [Test] Large file upload should have failed but succeeded!');
        throw new Error('Large file upload should have been rejected');
      } catch (expectedError) {
        if (expectedError instanceof Error && expectedError.message.includes('too large')) {
          console.log('🧪 [Test] Large file correctly rejected:', expectedError.message);
          return; // Test passed
        } else {
          throw expectedError; // Unexpected error
        }
      }
    } catch (error) {
      console.error('🧪 [Test] Large file upload test failed:', error);
      throw error;
    }
  }
  
  /**
   * Run all tests
   */
  static async runAllTests(): Promise<void> {
    console.log('🧪 [Test Suite] Starting Firebase Storage test suite...');
    
    const tests = [
      { name: 'Basic Upload', fn: () => this.testBasicUpload() },
      { name: 'Image Upload', fn: () => this.testImageUpload() },
      { name: 'Multiple Upload', fn: () => this.testMultipleUpload() },
      { name: 'Large File Upload (Should Fail)', fn: () => this.testLargeFileUpload() },
    ];
    
    let passed = 0;
    let failed = 0;
    
    for (const test of tests) {
      try {
        console.log(`🧪 [Test Suite] Running: ${test.name}`);
        await test.fn();
        console.log(`✅ [Test Suite] PASSED: ${test.name}`);
        passed++;
      } catch (error) {
        console.error(`❌ [Test Suite] FAILED: ${test.name}`, error);
        failed++;
      }
    }
    
    console.log(`🧪 [Test Suite] Results: ${passed} passed, ${failed} failed`);
    
    if (failed === 0) {
      console.log('🎉 [Test Suite] All tests passed!');
    } else {
      console.warn(`⚠️ [Test Suite] ${failed} tests failed. Check Firebase configuration.`);
    }
  }
}

// Make available in browser console for manual testing
declare global {
  interface Window {
    FirebaseStorageTestUtil: typeof FirebaseStorageTestUtil;
  }
}

if (typeof window !== 'undefined') {
  window.FirebaseStorageTestUtil = FirebaseStorageTestUtil;
  console.log('🧪 [Test Util] Firebase Storage Test Utility loaded!');
  console.log('🧪 [Test Util] Usage:');
  console.log('🧪 [Test Util] - FirebaseStorageTestUtil.testBasicUpload()');
  console.log('🧪 [Test Util] - FirebaseStorageTestUtil.testImageUpload()');
  console.log('🧪 [Test Util] - FirebaseStorageTestUtil.testMultipleUpload()');
  console.log('🧪 [Test Util] - FirebaseStorageTestUtil.runAllTests()');
}

export default FirebaseStorageTestUtil;
