import { FilterSelect } from "./FilterSelect";

const STATUS_OPTIONS = [
  { value: "        ", label: "Todos" },
  { value: "alive", label: "Vivo" },
  { value: "dead", label: "Morto" },
  { value: "unknown", label: "Desconhecido" },
];

export function StatusFilter({ value, onChange }) {
  return (
    <FilterSelect
      id="status-filter"
      label="Filtrar por status: "
      value={value}
      options={STATUS_OPTIONS}
      onChange={onChange}
    />
  );
}
