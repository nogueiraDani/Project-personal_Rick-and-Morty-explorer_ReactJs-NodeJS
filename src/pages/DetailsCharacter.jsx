import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCharacter(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Carregando detalhes do personagem...</div>;
  }

  if (error) {
    return <div>Ocorreu um erro ao carregar os detalhes: {error.message}</div>;
  }

  if (!character) {
    return <div>Personagem não encontrado.</div>;
  }

  return (
    <div className="bg-white rounded-md shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Detalhes de {character.name}
        </h2>
        <Link
          to="/"
          className="text-blue-600 hover:underline"
        >
          Voltar para a lista
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={character.image}
            alt={character.name}
            className="w-full rounded-md"
          />
        </div>
        <div>
          <p>
            <span className="font-semibold">Status:</span> {character.status}
          </p>
          <p>
            <span className="font-semibold">Espécie:</span> {character.species}
          </p>
          <p>
            <span className="font-semibold">Gênero:</span> {character.gender}
          </p>
          <p>
            <span className="font-semibold">Origem:</span>{" "}
            {character.origin?.name || "Desconhecida"}
          </p>
          <p>
            <span className="font-semibold">Localização Atual:</span>{" "}
            {character.location?.name || "Desconhecida"}
          </p>
          <div>
            <h3 className="font-semibold mt-4">Episódios:</h3>
            <ul>
              {character.episode?.map((episodeUrl) => {
                const episodeId = episodeUrl.split("/").pop();
                return <li key={episodeId}>{episodeId}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetails;
