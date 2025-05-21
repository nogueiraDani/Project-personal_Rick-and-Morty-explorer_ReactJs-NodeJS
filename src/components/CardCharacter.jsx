function CardCharacter({ personagem: character }) {
  return (
    <div className="bg-white rounded-md shadow-md p-4">
      <img
        src={character.image}
        alt={character.name}
        className="w-full rounded-md"
      />
      <h3 className="font-bold text-lg mt-2">{character.name}</h3>
      <p className="text-sm text-gray-600">Status: {character.status}</p>
    </div>
  );
}

export default CardCharacter;
