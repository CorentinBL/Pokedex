import getPokemonList from "../../../getPokemonList";
import getPokemonDetails from "../../../getPokemonDetails";
import PokemonCard from "../../../common/PokemonCard";
import Searchbar from "../Searchbar";
import React, { useState, useEffect, useContext } from 'react';
import LanguageSelector from '../../../common/Components/LanguageSelector';
import LanguageContext from '../../../common/Components/LanguageContext';

// Hook pour les pokémons
const usePokemons = (language) => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const pokemonList = await getPokemonList();
                const data = await getPokemonDetails(pokemonList, language); // Utilise la langue depuis le contexte
                setPokemons(data);
            } catch (err) {
                setError('Error fetching Pokémon');
                console.error('Error fetching Pokémon:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemons();
    }, [language]); // Recharge uniquement si la langue change

    return { pokemons, loading, error };
};

// Hook pour les types de Pokémon
const useTypes = (language) => {
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const res = await fetch("https://pokeapi.co/api/v2/type");
                const data = await res.json();

                // Traduire les noms des types
                const translatedTypes = await Promise.all(
                    data.results.map(async (type) => {
                        const typeRes = await fetch(type.url);
                        const typeData = await typeRes.json();
                        const typeNameEntry = typeData.names.find((name) => name.language.name === language);
                        return {
                            id: typeData.id,
                            name: typeNameEntry ? typeNameEntry.name : typeData.name,
                        };
                    })
                );

                setTypes(translatedTypes);
            } catch (err) {
                setError('Error fetching Pokémon types');
                console.error('Error fetching Pokémon types:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTypes();
    }, [language]); // Recharge si la langue change

    return { types, loading, error };
};

// Composant pour afficher la liste des pokémons
export default function PokemonList() {
    const { language } = useContext(LanguageContext); // Récupère la langue depuis le contexte
    const { pokemons, loading, error } = usePokemons(language); // Passe la langue au hook
    const { types } = useTypes(language); // Récupère les types de Pokémon
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState("");

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-white text-2xl">Loading Pokémon...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500 text-xl">{error}</p>
            </div>
        );
    }

    // Filtrage des Pokémon
    const filteredPokemons = pokemons.filter(pokemon => {
        const matchesSearchTerm = pokemon.name.toLowerCase().includes(searchTerm);
        const matchesType = !selectedType || pokemon.types.some(type => type.id === parseInt(selectedType));
        return matchesSearchTerm && matchesType;
    });

    return (
        <div>
            <LanguageSelector />
            <Searchbar
                setSearchTerm={setSearchTerm}
                types={types}
                setSelectedType={setSelectedType}
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredPokemons.map(pokemon => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} view="list" />
                ))}
            </div>
        </div>
    );
}
