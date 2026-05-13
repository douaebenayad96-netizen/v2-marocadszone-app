// src/components/FirebaseOAuthButtons.tsx
import { User } from "firebase/auth";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiLoaderAlt } from "react-icons/bi";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { OAuthProvider, useFirebaseOAuth } from "../hooks/useFirebaseOAuth";
import {
  extractUserData,
  FirebaseUserData,
} from "../services/firebase/authService";
import { OAUTH_CONFIG } from "../utils/oauthConfig";
import CustomToast from "./common/CustomToast";

interface FirebaseOAuthButtonsProps {
  onSuccess?: (user: User, token: string, userData: FirebaseUserData) => void;
  onError?: (error: string) => void;
  className?: string;
  showGoogle?: boolean;
  showFacebook?: boolean;
  showTwitter?: boolean;
}

const FirebaseOAuthButtons: React.FC<FirebaseOAuthButtonsProps> = ({
  onSuccess,
  onError,
  className = "",
  showGoogle = OAUTH_CONFIG.google.enabled,
  showFacebook = OAUTH_CONFIG.facebook.enabled, // Controlled by config
  showTwitter = OAUTH_CONFIG.twitter.enabled, // Controlled by config
}) => {
  const { t } = useTranslation();
  const { loading, error, signInWithProvider, clearError } = useFirebaseOAuth();

  const handleProviderSignIn = async (provider: OAuthProvider) => {
    clearError();

    try {
      const result = await signInWithProvider(provider);

      if (result.user && result.token) {
        // Extract user data for your backend
        const userData = extractUserData(result.user);     // Success message will be handled by parent component

        // Call success callback with Firebase user data
        onSuccess?.(result.user, result.token, userData);
      } else if (result.error) {
        console.error("Firebase OAuth error:", result.error);
        CustomToast(result.error, "error");
        onError?.(result.error);
      } else {
        // Handle case where user is null or token is missing
        const errorMsg = "Authentication failed - no user data received";
        console.error("Firebase OAuth error:", errorMsg);
        CustomToast(errorMsg, "error");
        onError?.(errorMsg);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "OAuth failed";
      console.error("OAuth error:", err);
      CustomToast(errorMessage, "error");
      onError?.(errorMessage);
    }
  };

  // Common button styles
  const buttonBaseClass = `
    w-full flex items-center justify-center px-4 py-3 border rounded-md shadow-sm text-sm font-medium 
    transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
    ${className}
  `;

  return (
    <div className="space-y-3">
      {/* Google Button */}
      {showGoogle && (
        <button
          onClick={() => handleProviderSignIn("google")}
          disabled={loading}
          className={`${buttonBaseClass} border-gray-300 bg-white text-gray-700 hover:bg-gray-50`}
        >
          {loading ? (
            <BiLoaderAlt className="w-5 h-5 animate-spin mr-2" />
          ) : (
            <FcGoogle className="w-5 h-5 mr-2" />
          )}
          {loading
            ? t("connexion_en_cours")
            : t("Continue with Google") || "Continue with Google"}
        </button>
      )}

      {/* Facebook Button */}
      {showFacebook && (
        <button
          onClick={() => handleProviderSignIn("facebook")}
          disabled={loading}
          className={`${buttonBaseClass} border-blue-600 bg-blue-600 text-white hover:bg-blue-700`}
        >
          {loading ? (
            <BiLoaderAlt className="w-5 h-5 animate-spin mr-2" />
          ) : (
            <FaFacebook className="w-5 h-5 mr-2" />
          )}
          {loading
            ? t("connexion_en_cours")
            : t("continuer_avec_facebook") || "Continue with Facebook"}
        </button>
      )}

      {/* Twitter Button */}
      {showTwitter && (
        <button
          onClick={() => handleProviderSignIn("twitter")}
          disabled={loading}
          className={`${buttonBaseClass} border-blue-400 bg-blue-400 text-white hover:bg-blue-500`}
        >
          {loading ? (
            <BiLoaderAlt className="w-5 h-5 animate-spin mr-2" />
          ) : (
            <FaTwitter className="w-5 h-5 mr-2" />
          )}
          {loading
            ? t("connexion_en_cours")
            : t("continuer_avec_twitter") || "Continue with Twitter"}
        </button>
      )}

      {/* Error Display */}
      {error && (
        <div className="mt-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default FirebaseOAuthButtons;
