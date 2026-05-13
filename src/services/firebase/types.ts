// src/services/firebase/types.ts

// Firebase Authentication types
export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// OAuth provider types
export type OAuthProvider = 'google' | 'facebook' | 'twitter';

// Authentication result interface
export interface AuthResult {
  success: boolean;
  user?: FirebaseUserData;
  token?: string;
  error?: string;
}

// User data interface for Firebase users
export interface FirebaseUserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  providerId: string;
  emailVerified: boolean;
  createdAt?: string;
}

// Authentication state interface
export interface AuthState {
  user: FirebaseUserData | null;
  loading: boolean;
  error: string | null;
}

// OAuth button props interface
export interface OAuthButtonProps {
  provider: OAuthProvider;
  onSuccess?: (user: FirebaseUserData, token: string) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

// Provider configuration interface
export interface ProviderConfig {
  name: string;
  icon: React.ComponentType;
  color: string;
  bgColor: string;
}

export default {};
