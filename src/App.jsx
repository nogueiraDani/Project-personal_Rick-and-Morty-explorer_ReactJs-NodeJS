import "./index.css";
import ListCharacters from "./pages/ListCharacters";
import DetailsCharacter from "./pages/DetailsCharacter";
import { Container, CssBaseline, Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <CssBaseline />
      <Container
        sx={{
          mb: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            color="text.primary"
            mb={4}
          >
            Explorador de Personagens de Rick e Morty
          </Typography>
        </Link>

        <Routes>
          <Route path="/" element={<ListCharacters />} />
          <Route path="/character/:id" element={<DetailsCharacter />} />
        </Routes>
      </Container>
    </Router>
  );
}
