import React, { createContext, useContext, useEffect, useState } from "react";

// Crée le contexte pour les types
const TypeContext = createContext();

export function TypeProvider({ children }) {
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const res = await fetch("https://pokeapi.co/api/v2/type");
                if (!res.ok) {
                    throw new Error("Failed to fetch Pokémon types");
                }
                const data = await res.json();
                setTypes(data.results); // Stocke les données brutes des types
            } catch (err) {
                setError(err.message);
                console.error("Error fetching Pokémon types:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTypes();
    }, []); // Ne fait ce fetch qu'une seule fois au chargement

    return (
        <TypeContext.Provider value={{ types, loading, error }}>
            {children}
        </TypeContext.Provider>
    );
}

// Hook pour consommer le contexte
export function useTypes(language) {
    const { types, loading, error } = useContext(TypeContext);
    const [translatedTypes, setTranslatedTypes] = useState([]);

    useEffect(() => {
        const translateTypes = async () => {
            try {
                const translated = await Promise.all(
                    types.map(async (type) => {
                        const res = await fetch(type.url);
                        if (!res.ok) {
                            throw new Error(`Failed to fetch details for type: ${type.url}`);
                        }
                        const typeData = await res.json();
                        const typeNameEntry = typeData.names.find(
                            (name) => name.language.name === language
                        );
                        return {
                            id: typeData.id,
                            name: typeNameEntry ? typeNameEntry.name : typeData.name,
                        };
                    })
                );
                setTranslatedTypes(translated);
            } catch (err) {
                console.error("Error translating Pokémon types:", err);
            }
        };

        if (types.length > 0) {
            translateTypes();
        }
    }, [types, language]); // Ne traduit que si la langue ou les types changent

    return { translatedTypes, loading, error };
}
