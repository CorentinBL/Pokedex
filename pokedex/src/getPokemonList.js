//Fonction qui récupère la liste des 151 premiers Pokémon par défaut ou tous les Pokémon si limit est à 0
export default async function getPokemonList(limit = 151) {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        const data = await res.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching Pokémon list:", error);
        return []; // Retourne un tableau vide en cas d'erreur
    }
}