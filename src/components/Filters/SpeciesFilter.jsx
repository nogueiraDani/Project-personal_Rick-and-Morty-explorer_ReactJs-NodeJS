import { FilterSelect } from "./FilterSelect";

const SPECIES_OPTIONS = [
  { value: "", label: "Todos" },
  { value: "human", label: "Humano" },
  { value: "alien", label: "Alien" },
  { value: "humanoid", label: "Humanóide" },
  { value: "poopybutthole", label: "Poopybutthole" },
  { value: "mythological creature", label: "Criatura Mitológica" },
  { value: "animal", label: "Animal" },
  { value: "robot", label: "Robô" },
  { value: "cronenberg", label: "Cronenberg" },
  { value: "disease", label: "Doença" },
  { value: "unknown", label: "Desconhecida" },
];

export function SpeciesFilter({ value, onChange }) {
  return (
    <FilterSelect
      id="species-filter"
      label="Filtrar por Espécie: "
      value={value}
      options={SPECIES_OPTIONS}
      onChange={onChange}
    />
  );
}
