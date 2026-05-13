/**
 * Utility functions for handling image URLs
 */

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://app.maison-savoy.store/api";
const STORAGE_URL =
  import.meta.env.VITE_STORAGE_URL || "https://app.maison-savoy.store/storage";
const BASE_URL = API_BASE_URL.replace("/api", "");

/**
 * Get the full image URL from a relative path or validate an absolute URL
 * @param imagePath - The image path from the backend
 * @returns Full image URL
 */
export function getImageUrl(imagePath: string | null | undefined): string {
  console.log("🔍 Processing image path:", imagePath);

  if (!imagePath) {
    console.log("⚠️ No image path provided, using fallback");
    return "/src/assets/img/no-image.png";
  }

  // If it's already a full URL, return as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    console.log("✅ Full URL detected:", imagePath);
    return imagePath;
  }

  // If it starts with /storage, use storage URL
  if (imagePath.startsWith("/storage")) {
    const fullUrl = imagePath.replace("/storage", STORAGE_URL);
    console.log("📁 Storage path converted:", fullUrl);
    return fullUrl;
  }

  // If it's just a filename or relative path, assume it's in storage
  if (!imagePath.startsWith("/")) {
    const fullUrl = `${STORAGE_URL}/${imagePath}`;
    console.log("📁 Relative path converted:", fullUrl);
    return fullUrl;
  }

  // For other paths, use base URL
  const fullUrl = `${BASE_URL}${imagePath}`;
  console.log("🔗 Base URL path:", fullUrl);
  return fullUrl;
}

/**
 * Get image URL with fallback
 * @param image - Image object with multiple possible URL properties
 * @returns Best available image URL
 */
export function getImageUrlFromObject(image: any): string {
  if (!image) {
    return "/src/assets/img/no-image.png";
  }

  // Try different possible properties
  const possibleUrls = [
    image.original_url,
    image.preview_url,
    image.url,
    image.path,
    image.src,
  ];

  for (const url of possibleUrls) {
    if (url) {
      // For deployment, try to construct the correct URL
      const processedUrl = getImageUrl(url);
      console.log("🖼️ Processed image URL:", processedUrl);
      return processedUrl;
    }
  }

  return "/src/assets/img/no-image.png";
}

/**
 * Alternative image URL getter that tries different approaches
 * @param image - Image object
 * @returns Image URL with multiple fallback strategies
 */
export function getImageUrlWithFallbacks(image: any): string {
  return image ? image : "/src/assets/img/no-image.png";
}

/**
 * Check if an image URL is accessible
 * @param url - Image URL to check
 * @returns Promise<boolean>
 */
export async function isImageAccessible(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
}
