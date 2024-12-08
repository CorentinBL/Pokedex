import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import PokemonCard from '../../../common/PokemonCard';
import LanguageSelector from '../../../common/Components/LanguageSelector';
import LanguageContext from '../../../common/Components/LanguageContext';
import getPokemonDetails from '../../../getPokemonDetails';

const usePokemonDetails = (id, language) => {
  const [pokemon, setPokemon] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const pokemonDetail = await getPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${id}`, language);
        setPokemon(pokemonDetail[0]); // Le premier élément de la réponse
      } catch (err) {
        setError('Error fetching Pokémon details');
        console.error('Error fetching Pokémon detail:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPokemonDetail();
    }
  }, [id, language]); //Recharge dans le cas ou la langue change

  return { pokemon, loading, error };
};

export default function PokemonDetails() {
  const { id } = useParams();
  const { language } = useContext(LanguageContext);
  const { pokemon, loading, error } = usePokemonDetails(id, language);

  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
          <p className="text-white text-2xl">Loading Pokémon...</p>
        </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!pokemon) {
    return <p className="text-white">Pokémon not found!</p>;
  }

  return (
      <div className="flex flex-col justify-center items-center w-full">
        <LanguageSelector />
        <PokemonCard key={pokemon.id} pokemon={pokemon} view="details" />
      </div>
  );
}
