import { useEffect, useState } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';

const fullConfig = resolveConfig(tailwindConfig);

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const defaultScreens = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

type Direction = 'min' | 'max';

const screens = { ...defaultScreens, ...fullConfig.theme?.screens };

const useBreakpoint = (size: Size, direction: Direction = 'min') => {
  // Initialize the state with the result of window.matchMedia
  const initialState =
    typeof window !== 'undefined'
      ? window.matchMedia(`(${direction}-width: ${screens[size]})`).matches
      : false;

  const [isScreen, setIsScreen] = useState(initialState);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(${direction}-width: ${screens[size]})`,
    );
    const listener = () => setIsScreen(mediaQuery.matches);

    // Add event listener for changes
    mediaQuery.addEventListener('change', listener);

    // Return cleanup function
    return () => mediaQuery.removeEventListener('change', listener);
  }, [size, direction]);

  return isScreen;
};

export default useBreakpoint;
