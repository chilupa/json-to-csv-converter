import React from "react";
import { Alert } from "@mui/material";

export default function AlertMessage({ error, success }) {
  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {success}
        </Alert>
      )}
    </>
  );
}
