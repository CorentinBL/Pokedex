export default async function getPokemonDetails(pokemonList, language) {
    try {
        const urls = Array.isArray(pokemonList)
            ? pokemonList.map((pokemon) => pokemon.url)
            : [pokemonList];

        const fetchTypeDetails = async (typeUrl, language) => {
            const typeRes = await fetch(typeUrl);
            if (!typeRes.ok) {
                throw new Error(`Failed to fetch type details for URL: ${typeUrl}`);
            }
            const typeData = await typeRes.json();
            const typeNameEntry = typeData.names.find((name) => name.language.name === language);
            return {
                id: typeData.id,  // Type ID for color mapping
                name: typeNameEntry ? typeNameEntry.name : typeData.name,  // Translated name, fallback to default if not found
            };
        };

        const detailedPokemonData = await Promise.all(
            urls.map(async (url) => {
                const pokemonRes = await fetch(url);
                if (!pokemonRes.ok) {
                    throw new Error(`Failed to fetch Pokémon details for URL: ${url} - Status: ${pokemonRes.status}`);
                }

                const pokemonDetails = await pokemonRes.json();
                const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonDetails.id}`);
                const speciesData = await speciesRes.json();
                const nameEntry = speciesData.names.find((name) => name.language.name === language);
                const types = await Promise.all(
                    pokemonDetails.types.map(async (typeInfo) => {
                        return await fetchTypeDetails(typeInfo.type.url, language);
                    })
                );

                // Return the Pokémon details, including type IDs and names
                return {
                    id: pokemonDetails.id,
                    name: nameEntry ? nameEntry.name : pokemonDetails.name,
                    image: pokemonDetails.sprites.front_default,
                    types: types,  // Types with IDs and translated names
                    height: pokemonDetails.height,
                    weight: pokemonDetails.weight,
                    moves: pokemonDetails.moves.map((moveInfo) => moveInfo.move.name),
                };
            })
        );

        return detailedPokemonData;
    } catch (error) {
        console.error("Error fetching Pokémon details:", error);
        return [];
    }
}
