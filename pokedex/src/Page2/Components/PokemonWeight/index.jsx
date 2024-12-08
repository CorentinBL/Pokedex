export default function PokemonWeight({ weight }) {
    return (
        <div className="text-center">
            <span className="font-bold">{weight/10} kg
            </span>
        </div>
    );
}