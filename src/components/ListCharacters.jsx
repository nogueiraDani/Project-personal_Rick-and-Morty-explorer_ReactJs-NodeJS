import React, { useState, useEffect } from "react";
import CardCharacter from "./CardCharacter";

function ListCharacters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCharacters(data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Carregando personagens...</p>;
  }

  if (error) {
    return <p>Ocorreu um erro: {error.message}</p>;
  }

  return (
    <div>
      <h2>Lista de Personagens</h2>
      <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {characters.map((character) => (
          <CardCharacter
            key={character.id}
            personagem={character}
          />
        ))}
      </div>
    </div>
  );
}

export default ListCharacters;

