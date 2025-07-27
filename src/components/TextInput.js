import React from 'react';
import { TextField, Button } from '@mui/material';
import { Download } from '@mui/icons-material';

export default function TextInput({ jsonInput, setJsonInput, onConvert }) {
  return (
    <>
      <TextField
        fullWidth
        multiline
        rows={12}
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Paste your JSON data here..."
        variant="outlined"
        sx={{ mb: 3 }}
      />
      <Button
        variant="contained"
        size="large"
        startIcon={<Download />}
        onClick={() => onConvert(jsonInput, true)}
        fullWidth
        sx={{ py: 1.5 }}
      >
        Convert & Download CSV
      </Button>
    </>
  );
}