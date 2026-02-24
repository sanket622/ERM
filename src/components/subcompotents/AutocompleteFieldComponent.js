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
  isMulti = false,
  placeholder = "",
  getOptionLabel = (option) => option?.label || '',
  error = false,           // <-- add error prop
  helperText = '',         // <-- add helperText prop
}) => {
  return (
    <Autocomplete
      multiple={isMulti}
      className={className}
      fullWidth={fullWidth}
      size={size}
      options={options}
      value={value}
      onChange={(event, newValue) => onChange(newValue)}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField 
          {...params} 
          label={label} 
          placeholder={placeholder} 
          error={error}            // <-- pass error to TextField
          helperText={helperText}  // <-- pass helperText to TextField
        />
      )}
      sx={{
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: '#4B5563',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '10px',
          },
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#4B5563',
        },
      }}
    />
  );
};

export default AutocompleteFieldComponent;
