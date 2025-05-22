import { useState, useEffect } from "react";
import { CharacterCard } from "../components/CharacterCard/CharacterCard";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { GenderFilter } from "../components/Filters/GenderFilter";
import { SpeciesFilter } from "../components/Filters/SpeciesFilter";
import { StatusFilter } from "../components/Filters/StatusFilter";
import { Pagination } from "../components/Pagination/Pagination";

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
  const [inputName, setInputName] = useState("");
  const [nameFilter, setNameFilter] = useState("");

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

    if (nameFilter) {
      apiUrl += `&name=${encodeURIComponent(nameFilter)}`;
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
  }, [currentPage, statusFilter, speciesFilter, genderFilter, nameFilter]);

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

  const handleNameSearch = (e) => {
    e.preventDefault();
    setNameFilter(inputName);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setInputName("");
    setNameFilter("");
    setCurrentPage(1);
  };

  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
    setCurrentPage(1);
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

      {/* Campo de busca por nome */}
      <div className="mb-4">
        <SearchBar
          handleNameSearch={handleNameSearch}
          inputName={inputName}
          setInputName={setInputName}
          handleClearSearch={handleClearSearch}
        />
      </div>

      <div className="mb-4">
        <GenderFilter
          value={genderFilter}
          onChange={handleFilterChange(setGenderFilter)}
        />
      </div>
      <div className="mb-4">
        <StatusFilter
          value={statusFilter}
          onChange={handleFilterChange(setStatusFilter)}
        />
      </div>
      <div className="mb-4">
        <SpeciesFilter
          value={speciesFilter}
          onChange={handleFilterChange(setSpeciesFilter)}
        />
      </div>

      <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
          />
        ))}
      </div>
      <Pagination
        goToPreviousPage={goToPreviousPage}
        prevPageUrl={prevPageUrl}
        currentPage={currentPage}
        goToNextPage={goToNextPage}
        nextPageUrl={nextPageUrl}
        totalPages={totalPages}
      />
    </div>
  );
}

export default ListCharacters;
