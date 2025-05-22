import "./index.css";
import ListCharacters from "./pages/ListCharacters";
import DetailsCharacter from "./pages/DetailsCharacter";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Explorador de Personagens de Rick e Morty
        </h1>
        <Routes>
          <Route
            path="/"
            element={<ListCharacters />}
          />
          <Route
            path="/character/:id"
            element={<DetailsCharacter />}
          />
        </Routes>
      </div>
    </Router>
  );
}
