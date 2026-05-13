import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../services/store/authStore';
import { retrieveToken, retrieveUser } from '../../utils/helpers';

const AuthStateDebug: React.FC = () => {
  const { token, user, isHydrated } = useAuthStore();
  const [cookieToken, setCookieToken] = useState<string | null>(null);
  const [cookieUser, setCookieUser] = useState<any>(null);

  useEffect(() => {
    // Check cookies directly
    setCookieToken(retrieveToken());
    setCookieUser(retrieveUser());
  }, []);

  const refreshData = () => {
    setCookieToken(retrieveToken());
    setCookieUser(retrieveUser());
  };

  return (
    <div className="fixed top-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-sm z-50">
      <h3 className="text-lg font-bold mb-2 text-gray-800">🔍 Auth State Debug</h3>
      
      <div className="space-y-2 text-sm">
        <div>
          <strong>Store Hydrated:</strong> {isHydrated ? '✅ Yes' : '❌ No'}
        </div>
        <div>
          <strong>Store Token:</strong> {token ? '✅ Present' : '❌ Missing'}
        </div>
        <div>
          <strong>Store User:</strong> {user ? '✅ Present' : '❌ Missing'}
        </div>
        <div>
          <strong>Cookie Token:</strong> {cookieToken ? '✅ Present' : '❌ Missing'}
        </div>
        <div>
          <strong>Cookie User:</strong> {cookieUser ? '✅ Present' : '❌ Missing'}
        </div>
        
        {token && (
          <div>
            <strong>Token Preview:</strong> {token.substring(0, 20)}...
          </div>
        )}
        
        {user && (
          <div>
            <strong>User Info:</strong> {user.first_name} {user.last_name}
          </div>
        )}
        
        {cookieUser && (
          <div>
            <strong>Cookie User Info:</strong> {cookieUser.first_name} {cookieUser.last_name}
          </div>
        )}
      </div>
      
      <button 
        onClick={refreshData}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
      >
        🔄 Refresh
      </button>
    </div>
  );
};

export default AuthStateDebug;
