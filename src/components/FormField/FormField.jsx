import { TextField } from '@mui/material';
import React from 'react';
import { memo } from 'react';

function FormField({ styles, setValue, value, placeholder, isFullWidth }) {
  return (
    <TextField
      classes={{ root: styles }}
      variant="standard"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      fullWidth={isFullWidth}
    />
  );
}

export default memo(FormField);
