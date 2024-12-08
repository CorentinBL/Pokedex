import { useState } from 'react';
import PokemonMoves from '../PokemonMoves';

// Bouton pour afficher les moves d'un pokémon
export default function ButtonMove({ moves }) {
    // État pour afficher ou cacher les moves
    const [showMoves, setShowMoves] = useState(false);

    const toggleMoves = () => {
        setShowMoves(prevState => !prevState);  // Toggle the state
    };

    return (
        <div className="text-center">
            {/* Bouton pour afficher/cacher les moves */}
            <button
                className="hover:bg-slate-300 text-yellow-600 border-yellow-600 border font-bold mt-4 py-2 px-4 rounded"
                onClick={toggleMoves}
            >
                {showMoves ? 'Hide Moves' : 'Show Moves'}
            </button>

            {/* Cache ou Affiche les moves */}
            {showMoves && <PokemonMoves moves={moves} onClose={() => setShowMoves(false)} />}
        </div>
    );
}
