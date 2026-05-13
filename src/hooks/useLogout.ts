import { useQueryClient } from 'react-query'
import { useAuthStore } from '../services/store/authStore'

export const useLogout = () => {
  const queryClient = useQueryClient()
  const logout = useAuthStore(state => state.logout)

  return () => {
    logout()
    queryClient.clear()
  }
}