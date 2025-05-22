import { FilterSelect } from "./FilterSelect";

const GENDER_OPTIONS = [
  { value: "", label: "Todos" },
  { value: "male", label: "Masculino" },
  { value: "female", label: "Feminino" },
  { value: "gender less", label: "Sem gênero" },
  { value: "other", label: "Desconhecido" },
];

export function GenderFilter({ value, onChange }) {
  return (
    <FilterSelect
      id="gender-filter"
      label="Filtrar por gênero: "
      value={value}
      options={GENDER_OPTIONS}
      onChange={onChange}
    />
  );
}
