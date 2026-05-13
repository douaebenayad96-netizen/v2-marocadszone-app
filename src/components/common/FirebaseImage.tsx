import React, { useState, useEffect } from 'react';
import { getDirectStorageUrl, getProxiedImageUrl } from '../../utils/firebaseCorsHelper';

interface FirebaseImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * A component that handles displaying images from Firebase Storage
 * with automatic CORS error handling
 */
const FirebaseImage: React.FC<FirebaseImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  onLoad,
  onError
}) => {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [errorCount, setErrorCount] = useState<number>(0);
  
  useEffect(() => {
    // Reset when source changes
    setImageSrc(src);
    setErrorCount(0);
  }, [src]);
  
  const handleError = () => {
    // Try different approaches to load the image if it fails
    if (errorCount === 0) {
      // First try: Use direct storage URL
      console.log('Firebase image load failed, trying direct URL...');
      setImageSrc(getDirectStorageUrl(src));
      setErrorCount(1);
    } else if (errorCount === 1) {
      // Second try: Use proxied URL
      console.log('Direct URL failed, trying proxied URL...');
      setImageSrc(getProxiedImageUrl(src));
      setErrorCount(2);
    } else {
      // All attempts failed
      console.error('All attempts to load image failed:', src);
      if (onError) onError();
    }
  };
  
  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onLoad={onLoad}
      onError={handleError}
    />
  );
};

export default FirebaseImage;