import { useState, useEffect } from "react";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { GenderFilter } from "../components/Filters/GenderFilter";
import { SpeciesFilter } from "../components/Filters/SpeciesFilter";
import { StatusFilter } from "../components/Filters/StatusFilter";
import { Container, Grid, ImageList, Pagination } from "@mui/material";
import { CharacterCard } from "../components/CharacterCard/CharacterCard";

function ListCharacters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [currentPage, statusFilter, speciesFilter, genderFilter, nameFilter]);

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
    <>
      <Container sx={{ p: 0, mb: 2 }}>
        <h2>Lista de Personagens</h2>
        <SearchBar
          handleNameSearch={handleNameSearch}
          inputName={inputName}
          setInputName={setInputName}
          handleClearSearch={handleClearSearch}
        />
      </Container>

      <Container sx={{ mb: 2 }}>
        <Grid container justifyContent="space-between">
          <GenderFilter
            value={genderFilter}
            onChange={handleFilterChange(setGenderFilter)}
          />

          <StatusFilter
            value={statusFilter}
            onChange={handleFilterChange(setStatusFilter)}
          />

          <SpeciesFilter
            value={speciesFilter}
            onChange={handleFilterChange(setSpeciesFilter)}
          />
        </Grid>
      </Container>

      <Container>
        <ImageList fullwidht={true} cols={3} sx={{ mb: 2 }}>
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </ImageList>
        <Grid container justifyContent="center">
          <Pagination
            count={totalPages}
            variant="outlined"
            shape="rounded"
            page={currentPage}
            onChange={(e, value) => setCurrentPage(value)}
          />
        </Grid>
      </Container>
    </>
  );
}

export default ListCharacters;
