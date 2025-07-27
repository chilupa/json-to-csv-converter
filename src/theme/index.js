import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: { main: "#6366f1", contrastText: "#ffffff" },
    secondary: { main: "#ec4899" },
    background: { default: "#f8fafc", paper: "#ffffff" },
    text: { primary: "#1e293b", secondary: "#64748b" },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});