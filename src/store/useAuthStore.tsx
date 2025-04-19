import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {IUser} from '../share/types/user.types'

type AuthState = {
  user: IUser | null
  token: string | null
  login: (user: IUser, token: string) => void
  logout: () => void
  updateUser: (userData: Partial<IUser>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      token: null,
      isLoggedIn: false,

      login: (user, token) =>
        set({
          user,
          token,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
        }),

      updateUser: userData =>
        set(state => ({
          user: state.user ? {...state.user, ...userData} : null,
        })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)
