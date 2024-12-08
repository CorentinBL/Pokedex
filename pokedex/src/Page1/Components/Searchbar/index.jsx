export default function Searchbar({ setSearchTerm, types, setSelectedType }) {
    return (
        <div className="flex items-center space-x-4">
            <input
                type="text"
                placeholder="Search Pokémon"
                className="w-2/4 h-10 bg-slate-800 text-white border-b-2 mx-2 outline-none"
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            />
            <select
                className="w-1/4 h-10 bg-slate-800 text-white border-b-2 outline-none"
                onChange={(e) => setSelectedType(e.target.value)}
            >
                <option value="">All Types</option>
                {types.map((type) => (
                    <option key={type.id} value={type.id}>
                        {type.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
