import { createContext, useContext } from 'react';

/** True once the preloader has lifted, so the hero entrance can begin. */
export const IntroContext = createContext(true);
export const useIntroReady = () => useContext(IntroContext);
