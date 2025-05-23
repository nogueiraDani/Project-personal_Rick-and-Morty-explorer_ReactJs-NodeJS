import { TextField, Box, Button } from "@mui/material";

export function SearchBar({
  handleNameSearch,
  inputName,
  setInputName,
  nameFilter,
  handleClearSearch,
}) {
  return (
    <Box component="form" noValidate onSubmit={handleNameSearch}>
      <TextField
        id="name"
        label="Busca por nome"
        variant="outlined"
        type="text"
        size="small"
        fullWidth
        margin="normal"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
      />
      <Button variant="outlined" size="medium" type="submit">
        Buscar
      </Button>
      {nameFilter && (
        <Button
          type="button"
          onClick={handleClearSearch}
          variant="outlined"
          size="medium"
        >
          Limpar
        </Button>
      )}
    </Box>
  );
}
