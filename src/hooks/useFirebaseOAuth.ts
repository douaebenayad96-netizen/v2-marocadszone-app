// src/hooks/useFirebaseOAuth.ts
import { useState } from 'react';
import { 
  signInWithGoogle, 
  signInWithFacebook, 
  signInWithTwitter, 
  signOutUser,
  OAuthResult 
} from '../services/firebase/authService';

export type OAuthProvider = 'google' | 'facebook' | 'twitter';

export interface UseFirebaseOAuthReturn {
  loading: boolean;
  error: string | null;
  signInWithProvider: (provider: OAuthProvider) => Promise<OAuthResult>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useFirebaseOAuth = (): UseFirebaseOAuthReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOAuth = async (provider: OAuthProvider): Promise<OAuthResult> => {
    setLoading(true);
    setError(null);

    let result: OAuthResult;

    try {
      switch (provider) {
        case 'google':
          result = await signInWithGoogle();
          break;
        case 'facebook':
          result = await signInWithFacebook();
          break;
        case 'twitter':
          result = await signInWithTwitter();
          break;
        default:
          throw new Error('Invalid provider');
      }

      if (result.error) {
        setError(result.error);
      }

      return result;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      return { user: null, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await signOutUser();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign out';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    loading,
    error,
    signInWithProvider: handleOAuth,
    logout,
    clearError
  };
};
