import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [modoOscuro, setModoOscuro] = useState(false);

    useEffect(() => {
        const tema = localStorage.getItem("modoOscuro") === "true";
        setModoOscuro(tema);
    }, []);

    const toggleModoOscuro = () => {
        setModoOscuro(prev => {
            localStorage.setItem("modoOscuro", !prev);
            return !prev;
        });
    };

    return (
        <ThemeContext.Provider value={{ modoOscuro, toggleModoOscuro }}>
            {children}
        </ThemeContext.Provider>
    );
};

