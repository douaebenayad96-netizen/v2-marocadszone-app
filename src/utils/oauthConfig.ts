// src/utils/oauthConfig.ts

/**
 * OAuth Configuration Helper
 * 
 * Update these values based on your Firebase Console setup
 */

// Configuration flags - update these after completing Firebase setup
export const OAUTH_CONFIG = {
  google: {
    enabled: true,
    configured: true
  },  facebook: {
    enabled: true, // Enable for testing after Firebase Console setup
    configured: true // Set to true after you complete Facebook app setup
  },
  twitter: {
    enabled: false, // Set to true after Firebase Console + Twitter app setup  
    configured: false // Set to true when Twitter app is fully configured
  }
};

// 🔥 QUICK TEST: After enabling in Firebase Console, you can temporarily set:
// facebook: { enabled: true, configured: false } - to test Firebase connection
// twitter: { enabled: true, configured: false } - to test Firebase connection
// ⚠️  Remember: You'll still get errors until external apps are configured

/**
 * Helper function to check if a provider is ready to use
 */
export const isProviderReady = (provider: keyof typeof OAUTH_CONFIG): boolean => {
  return OAUTH_CONFIG[provider].enabled && OAUTH_CONFIG[provider].configured;
};

/**
 * Get all ready providers
 */
export const getReadyProviders = (): string[] => {
  return Object.entries(OAUTH_CONFIG)
    .filter(([, config]) => config.enabled && config.configured)
    .map(([provider]) => provider);
};

/**
 * Instructions for enabling providers
 */
export const SETUP_INSTRUCTIONS = {
  facebook: [
    "1. Go to Firebase Console → Authentication → Sign-in method",
    "2. Enable Facebook provider",
    "3. Create Facebook app at developers.facebook.com",
    "4. Add App ID and App Secret to Firebase",
    "5. Add OAuth redirect URI to Facebook app",
    "6. Set OAUTH_CONFIG.facebook.configured = true"
  ],
  twitter: [
    "1. Go to Firebase Console → Authentication → Sign-in method", 
    "2. Enable Twitter provider",
    "3. Create Twitter app at developer.twitter.com",
    "4. Add API Key and Secret to Firebase",
    "5. Add callback URL to Twitter app",
    "6. Set OAUTH_CONFIG.twitter.configured = true"
  ]
};

/**
 * Quick enable function for when setup is complete
 * Call this after completing Firebase Console setup
 */
export const enableProvider = (provider: keyof typeof OAUTH_CONFIG) => {
  OAUTH_CONFIG[provider].enabled = true;
  OAUTH_CONFIG[provider].configured = true;
  console.log(`✅ ${provider} OAuth enabled successfully`);
};

/**
 * Disable provider temporarily
 */
export const disableProvider = (provider: keyof typeof OAUTH_CONFIG) => {
  OAUTH_CONFIG[provider].enabled = false;
  console.log(`❌ ${provider} OAuth disabled`);
};
