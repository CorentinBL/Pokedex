export default function PokemonHeight({ height }) {
    //Affiche la taille d'un pokémon
    return (
        <div className="text-center">
          <span className="font-bold"> {height*10} cm
          </span>
        </div>
    );
}