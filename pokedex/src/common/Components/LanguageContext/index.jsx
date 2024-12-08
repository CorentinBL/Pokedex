import React, { createContext, useState, useEffect } from "react";

const LanguageContext = createContext();
export function LanguageProvider({ children }) {

    const [language, setLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem("language");
        return savedLanguage || "en"; // "en" par défaut si aucune langue n'est sauvegardée
    });

    // Mettre à jour le localStorage lorsque la langue change
    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);

    // Fournit le contexte avec la langue actuelle et une fonction pour la changer
    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export default LanguageContext;
