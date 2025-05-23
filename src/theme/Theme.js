import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  // Configurações do seu tema
  palette: {
    mode: "light", // ou 'dark' para tema escuro
    primary: {
      main: "#3f51b5", // Azul padrão do Material UI
      light: "#757de8",
      dark: "#002984",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f50057", // Rosa
      light: "#ff5983",
      dark: "#bb002f",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#2196f3",
    },
    success: {
      main: "#4caf50",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    },
  
  spacing: 8, // Unidade base de espaçamento (8px)
  components: {
    // Customizações específicas de componentes
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Remove uppercase padrão dos botões
          borderRadius: 8, // Bordas mais arredondadas
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
          },
        },
      },
    },
  },
});

export default theme;
