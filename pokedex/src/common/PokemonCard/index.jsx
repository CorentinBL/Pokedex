import { Link } from 'react-router-dom';
import PokemonHeight from "../../Page2/Components/PokemonHeight";
import PokemonWeight from "../../Page2/Components/PokemonWeight";
import PokemonType from "../PokemonType";
import ButtonMove from "../../Page2/Components/ButtonMove";

// Vues disponibles pour la carte Pokemon
const VIEW_TYPES = {
    LIST: 'list',
    DETAILS: 'details',
};

export default function PokemonCard({ pokemon, view }) {
    const { id, name, image, types, height, weight, moves } = pokemon;

    // Card content common for both views
    const cardContent = (
        <div
            className={`bg-white shadow-lg rounded-lg overflow-hidden my-1 drop-shadow-2xl 
              ${view === VIEW_TYPES.DETAILS ? 'w-1/2 ' : ''}`}
        >
            
            {/* Pokémon Information */}
            <div className="px-6 py-4">
                {/* Name */}
                <div className="font-bold text-xl mb-2 text-center capitalize">{name}</div>

                {/* Image Section */}
            <div className="flex justify-center ">
                <img
                    className={`object-cover w-1/2`}
                    src={image}
                    alt={`${name} sprite`}
                />
            </div>

                {/* Types */}
                <div className="flex justify-evenly">
                    {types.map((type) => (
                        <PokemonType key={type} type={type} />
                    ))}
                </div>

                {/* If view is DETAILS, show additional information */}
                {view === VIEW_TYPES.DETAILS && (
                    <>
                        {/* Height and Weight */}
                        <div className="flex justify-evenly mt-4">
                            <PokemonHeight height={height} />
                            <PokemonWeight weight={weight} />
                        </div>

                        {/* Moves */}
                        <div className="text-center mt-2">
                            <ButtonMove moves={moves} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );

    // Conditional rendering for Link
    return view === VIEW_TYPES.LIST ? (
        <Link to={`/pokemon/${id}`}>
            {cardContent}
        </Link>
    ) : (
        <div className="flex justify-center items-center w-screen">
            {cardContent} {/* Render the card content in details view */}
        </div>
    );
}
