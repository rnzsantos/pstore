import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import User from '../entities/User';

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  removeUser: () => void;
}

const useUserStore = create<UserStore>(set => ({
  user: null,
  setUser: user => set(() => ({ user })),
  removeUser: () => set(() => ({ user: null })),
}));

if (process.env.NODE_ENV === 'development')
  mountStoreDevtool('User Store', useUserStore);

export default useUserStore;
