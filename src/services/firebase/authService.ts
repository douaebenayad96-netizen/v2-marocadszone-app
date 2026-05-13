import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User
} from 'firebase/auth';
import { 
  auth, 
  googleProvider, 
  facebookProvider, 
  twitterProvider 
} from './config';

// TypeScript interface for our OAuth result
export interface OAuthResult {
  user: User | null;
  token?: string;
  error?: string;
}

// TypeScript interface for user data we'll extract
export interface FirebaseUserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  providerId: string;
}

// Google Sign In
export const signInWithGoogle = async (): Promise<OAuthResult> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    const token = await user.getIdToken();
    
    console.log('Google sign-in successful:', {
      uid: user.uid,
      email: user.email,
      name: user.displayName
    });
    
    return { user, token };
  } catch (error: unknown) {
    const errorMessage = handleOAuthError(error, 'Google');
    console.error('Google sign-in error:', errorMessage);
    return { user: null, error: errorMessage };
  }
};

// Facebook Sign In
export const signInWithFacebook = async (): Promise<OAuthResult> => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const user = result.user;
    const token = await user.getIdToken();
    
    console.log('Facebook sign-in successful:', {
      uid: user.uid,
      email: user.email,
      name: user.displayName
    });
    
    return { user, token };
  } catch (error: unknown) {
    const errorMessage = handleOAuthError(error, 'Facebook');
    console.error('Facebook sign-in error:', errorMessage);
    return { user: null, error: errorMessage };
  }
};

// Twitter Sign In
export const signInWithTwitter = async (): Promise<OAuthResult> => {
  try {
    const result = await signInWithPopup(auth, twitterProvider);
    const user = result.user;
    const token = await user.getIdToken();
    
    console.log('Twitter sign-in successful:', {
      uid: user.uid,
      email: user.email,
      name: user.displayName
    });
    
    return { user, token };
  } catch (error: unknown) {
    const errorMessage = handleOAuthError(error, 'Twitter');
    console.error('Twitter sign-in error:', errorMessage);
    return { user: null, error: errorMessage };
  }
};

// Sign Out
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Listen to auth state changes
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Helper function to extract user data
export const extractUserData = (user: User): FirebaseUserData => {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    providerId: user.providerData[0]?.providerId || 'unknown'
  };
};

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!auth.currentUser;
};

// Enhanced error handling for OAuth providers
const handleOAuthError = (error: Error | unknown, provider: string): string => {
  console.error(`${provider} OAuth error:`, error);
  
  // Type guard to check if error has code property
  const isFirebaseError = (err: unknown): err is { code: string; message: string } => {
    return typeof err === 'object' && err !== null && 'code' in err && 'message' in err;
  };
  
  if (isFirebaseError(error)) {
    // Handle specific error codes
    switch (error.code) {
      case 'auth/popup-closed-by-user':
        return `${provider} sign-in was cancelled`;
      case 'auth/popup-blocked':
        return `Popup was blocked. Please allow popups for this site and try again`;
      case 'auth/cancelled-popup-request':
        return `${provider} sign-in was cancelled`;
      case 'auth/account-exists-with-different-credential':
        return 'An account already exists with the same email address but different sign-in credentials';
      case 'auth/credential-already-in-use':
        return 'This credential is already associated with a different user account';
      case 'auth/operation-not-allowed':
        return `${provider} sign-in is not enabled. Please contact support`;
      case 'auth/invalid-credential':
        return `Invalid ${provider} credentials. Please try again`;
      case 'auth/user-disabled':
        return 'This user account has been disabled';
      case 'auth/user-not-found':
        return 'No user account found';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection and try again';
      default:
        return error.message || `An error occurred during ${provider} sign-in`;
    }
  }
  
  // Fallback for non-Firebase errors
  return error instanceof Error ? error.message : `An error occurred during ${provider} sign-in`;
};
