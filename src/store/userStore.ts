import { create } from 'zustand';

interface UserState {
    user: any | null;
    role: 'citizen' | 'industry' | 'government' | null;
    setUser: (user: any, role: 'citizen' | 'industry' | 'government') => void;
    logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    role: null,
    setUser: (user, role) => set({ user, role }),
    logout: () => set({ user: null, role: null }),
}));
