// src/components/auth/OAuthConfig.tsx
import React from 'react';
import { OAUTH_CONFIG } from '../../utils/oauthConfig';

const OAuthConfig: React.FC = () => {
  return (
    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
      <h4 className="text-sm font-medium text-blue-800 mb-2">
        OAuth Configuration Status
      </h4>
      <div className="space-y-1 text-xs">
        <div className="flex items-center">
          <span className={`w-2 h-2 rounded-full mr-2 ${OAUTH_CONFIG.google.enabled && OAUTH_CONFIG.google.configured ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className="text-blue-700">Google OAuth: {OAUTH_CONFIG.google.enabled && OAUTH_CONFIG.google.configured ? 'Enabled' : 'Disabled'}</span>
        </div>
        <div className="flex items-center">
          <span className={`w-2 h-2 rounded-full mr-2 ${OAUTH_CONFIG.facebook.enabled && OAUTH_CONFIG.facebook.configured ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
          <span className="text-blue-700">Facebook OAuth: {OAUTH_CONFIG.facebook.enabled && OAUTH_CONFIG.facebook.configured ? 'Enabled' : 'Setup Required'}</span>
        </div>
        <div className="flex items-center">
          <span className={`w-2 h-2 rounded-full mr-2 ${OAUTH_CONFIG.twitter.enabled && OAUTH_CONFIG.twitter.configured ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
          <span className="text-blue-700">Twitter OAuth: {OAUTH_CONFIG.twitter.enabled && OAUTH_CONFIG.twitter.configured ? 'Enabled' : 'Setup Required'}</span>
        </div>
      </div>
      {(!OAUTH_CONFIG.facebook.configured || !OAUTH_CONFIG.twitter.configured) && (
        <div className="mt-2 text-xs text-blue-600">
          📖 Check OAUTH_SETUP_GUIDE.md for setup instructions
        </div>
      )}
    </div>
  );
};

export default OAuthConfig;
