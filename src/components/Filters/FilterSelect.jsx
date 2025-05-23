import { InputLabel, Select, MenuItem, FormControl, Grid } from "@mui/material";

export function FilterSelect({ id, label, value, options, onChange }) {
  return (
    <>
      <Grid>
        <FormControl fullWidth sx={{ minWidth: 350 }}>
          <InputLabel id={id}>{label}</InputLabel>
          <Select
            labelId={id}
            id={id}
            value={value}
            label={label}
            onChange={onChange}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </>
  );
}
