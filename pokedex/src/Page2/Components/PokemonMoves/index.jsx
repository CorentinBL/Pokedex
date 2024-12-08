import { useEffect, useRef } from 'react';

export default function PokemonMoves({ moves, onClose }) {
    const modalRef = useRef(null);

    // Ferme la modale lorsqu'on clique à l'extérieur de celle-ci
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose(); // Appelle la fonction de fermeture
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div
                ref={modalRef} // Référence à la boîte modale
                className="bg-white rounded-lg p-4 w-11/12 max-w-md overflow-y-auto h-auto max-h-[75%]"
                >
                <h2 className="text-xl font-bold text-center underline">Moves:</h2>
                <ul className="m-2 grid grid-cols-3 space-x-1">
                    {moves.map((move) => (
                        <li className=" font-bold capitalize border-2 border-yellow-500 text-zinc-700 px-4 py-2 rounded mb-2 hover:border-yellow-600" key={move}>
                            {move}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
