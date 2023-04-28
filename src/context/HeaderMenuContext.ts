import { createContext } from 'react';

export type HeaderMenuContent = {
    activeMenuIndex: number
    setActiveMenuIndex:(n: number) => void
    onHeaderFocus: boolean
    setOnHeaderFocus:(b: boolean) => void
}

const initialState = {
    activeMenuIndex: 0, 
    setActiveMenuIndex: () => {},
    onHeaderFocus: true,
    setOnHeaderFocus: () => {}
};

export const HeaderMenuContext = createContext<HeaderMenuContent>(initialState);