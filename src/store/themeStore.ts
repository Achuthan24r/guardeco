import { create } from 'zustand';

interface ThemeState {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    isDarkMode: true, // Default to dark mode for the premium look
    toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));
