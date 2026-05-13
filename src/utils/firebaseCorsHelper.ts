/**
 * Firebase Storage CORS Helper
 * 
 * This utility helps handle CORS issues with Firebase Storage by providing
 * alternative methods to access storage resources.
 */

/**
 * Converts a Firebase Storage URL to a direct download URL that may bypass CORS restrictions
 * @param firebaseUrl The original Firebase Storage URL
 * @returns A modified URL that may work better with CORS
 */
export function getDirectStorageUrl(firebaseUrl: string): string {
  try {
    // If it's already a direct URL, return it
    if (!firebaseUrl.includes('firebasestorage.googleapis.com')) {
      return firebaseUrl;
    }
    
    // Extract the path from the URL
    const urlObj = new URL(firebaseUrl);
    const pathMatch = urlObj.pathname.match(/\/o\/(.+)$/);
    
    if (!pathMatch || !pathMatch[1]) {
      console.warn('Could not parse Firebase Storage URL:', firebaseUrl);
      return firebaseUrl;
    }
    
    const encodedPath = pathMatch[1];
    const decodedPath = decodeURIComponent(encodedPath);
    
    // Construct a direct URL
    const firebaseStorageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "marocadszone-2298a.appspot.com";
    const storageBaseUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseStorageBucket}/o/`;
    const directUrl = `${storageBaseUrl}${encodeURIComponent(decodedPath)}?alt=media`;
    
    return directUrl;
  } catch (error) {
    console.error('Error converting Firebase URL:', error);
    return firebaseUrl;
  }
}

/**
 * Creates an image proxy URL that can bypass CORS restrictions
 * @param imageUrl The original image URL
 * @returns A proxied URL
 */
export function getProxiedImageUrl(imageUrl: string): string {
  // Use images.weserv.nl as a proxy
  return `https://images.weserv.nl/?url=${encodeURIComponent(imageUrl)}`;
}

/**
 * Adds CORS headers to a fetch request
 * @param url The URL to fetch
 * @returns Promise with the response
 */
export async function fetchWithCORS(url: string): Promise<Response> {
  return fetch(url, {
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  });
}