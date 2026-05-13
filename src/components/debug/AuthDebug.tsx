import React from 'react'
import { useAuthStore } from '../../services/store/authStore'
import { retrieveToken, retrieveUser } from '../../utils/helpers'

const AuthDebug: React.FC = () => {
  const { token, user } = useAuthStore()
  const cookieToken = retrieveToken()
  const cookieUser = retrieveUser()

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Authentication Debug Info</h3>
      
      <div className="space-y-2">
        <div>
          <strong>Auth Store Token:</strong> {token ? '✅ Present' : '❌ Missing'}
        </div>
        <div>
          <strong>Cookie Token:</strong> {cookieToken ? '✅ Present' : '❌ Missing'}
        </div>
        <div>
          <strong>Auth Store User:</strong> {user ? '✅ Present' : '❌ Missing'}
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
            <strong>User Info:</strong> {user.first_name} {user.last_name} ({user.email})
          </div>
        )}
      </div>
    </div>
  )
}

export default AuthDebug
