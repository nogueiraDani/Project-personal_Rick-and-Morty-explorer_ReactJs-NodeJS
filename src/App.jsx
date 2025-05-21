import "./index.css";
import ListCharacters from "./components/ListCharacters";
import DetailsCharacter from "./components/DetailsCharacter";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
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

export default App;

//TODO: parei aqui!
