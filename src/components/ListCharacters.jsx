import { useState, useEffect } from "react";
import CardCharacter from "./CardCharacter";

function ListCharacters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  useEffect(() => {
    setLoading(true);

    let apiUrl = `https://rickandmortyapi.com/api/character?page=${currentPage}`;

    if (statusFilter) {
      apiUrl += `&status=${statusFilter}`;
    }

    if (speciesFilter) {
      apiUrl += `&species=${speciesFilter}`;
    }

    if (genderFilter) {
      apiUrl += `&gender=${genderFilter}`;
    }

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCharacters(data.results);
        setTotalPages(data.info.pages);
        setPrevPageUrl(data.info.prev);
        setNextPageUrl(data.info.next);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [currentPage, statusFilter, speciesFilter, genderFilter]);

  const goToPreviousPage = () => {
    if (prevPageUrl) {
      setCurrentPage(prevPageUrl.split("=").pop());
    }
  };

  const goToNextPage = () => {
    if (nextPageUrl) {
      setCurrentPage(nextPageUrl.split("=").pop());
    }
  };

  if (loading) {
    return <p>Carregando personagens...</p>;
  }

  if (error) {
    return <p>Ocorreu um erro: {error.message}</p>;
  }

  return (
    <div>
      <h2>Lista de Personagens</h2>
      <div className="mb-4">
        <label
          htmlFor="gender"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Filtrar por Gênero:
        </label>
        <select
          id="gender"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={genderFilter}
          onChange={(e) => {
            setGenderFilter(e.target.value);
            setCurrentPage(1); // Resetar para a primeira página ao mudar o filtro
          }}
        >
          <option value="">Todos</option>
          <option value="male">Masculino</option>
          <option value="female">Feminino</option>
          <option value="genderless">Sem Gênero</option>
          <option value="unknown">Desconhecido</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="status"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Filtrar por Status:
        </label>
        <select
          id="status"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Todos</option>
          <option value="alive">Vivo</option>
          <option value="dead">Morto</option>
          <option value="unknown">Desconhecido</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="species"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Filtrar por Espécie:
        </label>
        <select
          id="species"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={speciesFilter}
          onChange={(e) => {
            setSpeciesFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Todas</option>
          <option value="human">Humano</option>
          <option value="alien">Alien</option>
          {/* Você pode adicionar mais espécies conforme desejar ou até mesmo buscar dinamicamente */}
          <option value="humanoid">Humanóide</option>
          <option value="poopybutthole">Poopybutthole</option>
          <option value="mythological creature">Criatura Mitológica</option>
          <option value="animal">Animal</option>
          <option value="robot">Robô</option>
          <option value="cronenberg">Cronenberg</option>
          <option value="disease">Doença</option>
          <option value="unknown">Desconhecida</option>
        </select>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {characters.map((character) => (
          <CardCharacter
            key={character.id}
            character={character}
          />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={goToPreviousPage}
          disabled={!prevPageUrl}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            !prevPageUrl ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Página Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={!nextPageUrl}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            !nextPageUrl ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Próxima Página
        </button>
      </div>
    </div>
  );
}

export default ListCharacters;
