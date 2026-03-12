import { createContext, useContext, useReducer, type ReactNode } from 'react';

// --- Types ---
type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
}

type ThemeAction = { type: 'TOGGLE_THEME' };

// --- Reducer ---
const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { mode: state.mode === 'light' ? 'dark' : 'light' };
    default:
      return state;
  }
};

// --- Context ---
interface ThemeContextType {
  state: ThemeState;
  dispatch: React.Dispatch<ThemeAction>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// --- Provider ---
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(themeReducer, { mode: 'light' });

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

// --- Custom hook ---
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};
