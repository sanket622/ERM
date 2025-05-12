import React from "react";
import { Autocomplete, TextField } from "@mui/material";

const AutocompleteFieldComponent = ({
  label,
  options = [],
  value,
  onChange,
  fullWidth = true,
  size = "small",
  className = "",
}) => {
  return (
    <Autocomplete
      className={className}
      fullWidth={fullWidth}
      size={size}
      options={options}
      value={value}
      onChange={(event, newValue) => onChange(newValue)}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.label
      }
      isOptionEqualToValue={(option, value) =>
        option.value === value?.value
      }
      renderInput={(params) => <TextField {...params} label={label} />}
      sx={{
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: '#0000FF',
          },
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#0000FF',
        },
      }}
    />
  );
};

export default AutocompleteFieldComponent;
