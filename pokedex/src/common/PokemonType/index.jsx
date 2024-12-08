export default function PokemonType({ type }) {
    // Map de couleur pour chaque type basé sur l'ID
    const typeColor = {
        1: 'bg-gray-200', // Normal
        2: 'bg-red-200',  // Fighting
        3: 'bg-blue-200', // Flying
        4: 'bg-purple-700', // Poison
        5: 'bg-yellow-200', // Ground
        6: 'bg-gray-400', // Rock
        7: 'bg-green-200', // Bug
        8: 'bg-indigo-200', // Ghost
        9: 'bg-gray-500', // Steel
        10: 'bg-red-500', // Fire
        11: 'bg-blue-500', // Water
        12: 'bg-green-500', // Grass
        13: 'bg-yellow-500', // Electric
        14: 'bg-purple-500', // Psychic
        15: 'bg-blue-300', // Ice
        16: 'bg-red-700', // Dragon
        17: 'bg-gray-800', // Dark
        18: 'bg-pink-300', // Fairy
        10001: 'bg-gray-200', // Unknown
        10002: 'bg-gray-800', // Shadow
    };

    // Récupérer la couleur basée sur l'ID
    const colorClass = typeColor[type.id] || 'bg-gray-200';

    // Si le type est 'dark', la couleur du texte en blanc pour améliorer la lisibilité
    const textColorClass = type.id === 17 ? 'text-white' : 'text-black';

    return (
        // Affichage du type avec la couleur et le nom traduit
        <span
            className={`uppercase inline-block rounded-full px-3 py-1 text-sm font-semibold border-black border mr-2 ${colorClass} ${textColorClass}`}
        >
            {type.name || 'Unknown'}
        </span>
    );
}
