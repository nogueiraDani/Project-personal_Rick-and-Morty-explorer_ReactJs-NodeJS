import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  styled,
  Box,
  Avatar,
  Chip,
  Container,
  Stack,
  Grid,
  Paper,
  Divider,
  useTheme,
} from "@mui/material";

function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

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

  const HeroBanner = styled(Box)(({ theme }) => ({
    height: 200,
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(4),
    color: theme.palette.common.white,
    position: "relative",
  }));

  const CharacterAvatar = styled(Avatar)(({ theme }) => ({
    width: 250,
    height: 250,
    border: `4px solid ${theme.palette.background.paper}`,
    boxShadow: theme.shadows[10],
    marginTop: -75,
    "&:hover": {
      transform: "scale(1.05)",
      transition: "all 0.3s ease",
    },
  }));

  const StatusChip = styled(Chip)(({ status, theme }) => ({
    backgroundColor:
      status === "Vivo"
        ? theme.palette.success.light
        : status === "Morto"
        ? theme.palette.error.light
        : theme.palette.warning.light,
    fontWeight: "bold",
    position: "absolute",
    bottom: theme.spacing(-3),
    right: theme.spacing(2),
    zIndex: 1,
  }));

  return (
    <Container maxWidth="lg">
      {/* Banner Hero com Status Chip */}
      <HeroBanner>
        <Typography variant="h2" component="h1">
          {character.name}
        </Typography>
        <StatusChip label={character.status} status={character.status} />
      </HeroBanner>

      {/* Layout Principal */}
      <Grid
        container
        spacing={4}
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
      >
        {/* Coluna da Esquerda - Avatar */}
        <Grid size="grow">
          <Box display="flex" justifyContent="flex-start">
            <CharacterAvatar alt={character.name} src={character.image} />
          </Box>
        </Grid>

        {/* Coluna da Direita - Conteúdo */}
        <Grid size="grow">
          {/* Biografia - Ocupa toda a largura disponível */}
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h5">Biografia</Typography>
              <Stack direction="row" spacing={1}>
                <Chip
                  label={`Espécie: ${character.species}`}
                  size="small"
                  color="primary"
                />
                <Chip
                  label={`Gênero: ${character.gender}`}
                  size="small"
                  color="secondary"
                />
              </Stack>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Origem</Typography>
                <Typography>
                  {character.origin?.name === "unknown"
                    ? "Desconhecida"
                    : character.origin?.name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Localização</Typography>
                <Typography>
                  {character.location?.name === "unknown"
                    ? "Desconhecida"
                    : character.location?.name}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Episódios */}
        <Box mt={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Aparições em episódios ({character.episode?.length || 0})
            </Typography>
            <Box
              sx={{
                maxHeight: 400,
                overflowY: "auto",
                pr: 1,
                "&::-webkit-scrollbar": {
                  width: 6,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: "3px",
                },
              }}
            >
              <Grid container spacing={1}>
                {character.episode?.map((episodeUrl) => {
                  const episodeId = episodeUrl.split("/").pop();
                  return (
                    <Grid item xs={4} key={episodeId}>
                      <Chip label={`Episódio ${episodeId}`} size="small" />
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Grid>
    </Container>
  );
}

export default CharacterDetails;
