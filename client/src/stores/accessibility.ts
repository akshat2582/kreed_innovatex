import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AccessibilityState {
  fontSize: number;
  highContrast: boolean;
  setFontSize: (size: number) => void;
  toggleContrast: () => void;
}

export const useAccessibilityStore = create<AccessibilityState>()(
  persist(
    (set, get) => ({
      fontSize: 14,
      highContrast: false,
      
      setFontSize: (size: number) => {
        set({ fontSize: size });
        document.body.style.fontSize = `${size}px`;
      },
      
      toggleContrast: () => {
        const newContrast = !get().highContrast;
        set({ highContrast: newContrast });
        
        if (newContrast) {
          document.body.classList.add('high-contrast');
        } else {
          document.body.classList.remove('high-contrast');
        }
      }
    }),
    {
      name: 'bigbasket-accessibility',
    }
  )
);
