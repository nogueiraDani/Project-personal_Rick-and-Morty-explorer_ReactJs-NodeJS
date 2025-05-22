import { Link } from "react-router-dom";

export function CharacterCard({ character: character }) {
  return (
    <Link
      to={`/character/${character.id}`}
      className="bg-white rounded-md shadow-md p-4 block hover:shadow-lg transition-shadow duration-200"
    >
      <img
        src={character.image}
        alt={character.name}
        className="w-full rounded-md"
      />
      <h3 className="font-bold text-lg mt-2">{character.name}</h3>
      <p className="text-sm text-gray-600">Status: {character.status}</p>
      <span>
        {character.status}
      </span>
    </Link>
  );
}

