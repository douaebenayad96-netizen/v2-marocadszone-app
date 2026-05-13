// src/components/auth/FirebaseAuthRedirectHandler.tsx
import { useEffect } from 'react';
import { checkRedirectResult, extractUserData } from '../../services/firebase/authService';
import { useFirebaseLogin } from '../../services/api/fetchAuth';
import { useAuthStore } from '../../services/store/authStore';
import CustomToast from '../common/CustomToast';
import { useTranslation } from 'react-i18next';

const FirebaseAuthRedirectHandler = () => {
  const { t } = useTranslation();
  const firebaseLoginMutation = useFirebaseLogin();
  const { signIn } = useAuthStore();

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        // Check if there's a redirect result
        const result = await checkRedirectResult();
        
        if (result.user && result.token) {
          console.log('🔥 Firebase redirect login successful - exchanging for Laravel token...');
          
          // Extract user data for backend
          const userData = extractUserData(result.user);
          
          // Use the proper Firebase login API to exchange tokens
          const firebaseLoginData = {
            firebaseToken: result.token,
            email: userData.email,
            name: userData.displayName,
            photoURL: userData.photoURL,
            providerId: userData.providerId
          };
          
          console.log('🚀 Sending Firebase redirect data to Laravel:', firebaseLoginData);
          
          // Exchange Firebase token for Laravel token
          const laravelAuthResponse = await firebaseLoginMutation.mutateAsync(firebaseLoginData);
          
          console.log('✅ Laravel auth response received:', laravelAuthResponse);
          
          // Sign in with Laravel token
          signIn(laravelAuthResponse, false);
          CustomToast(t('connexion_reussie'), 'success');

          window.location.href = '/user-account/dashboard';
        }
      } catch (error) {
        console.error('❌ Error handling Firebase redirect:', error);
      }
    };
    
    handleRedirectResult();
  }, [firebaseLoginMutation, signIn, t]);
  
  // The component doesn't render anything visible
  return null;
};

export default FirebaseAuthRedirectHandler;
