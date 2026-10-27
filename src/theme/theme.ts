import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#f4f6fb", 
      paper: "#ffffff",   
    },
    primary: {
      main: "#2563eb",    
      light: "#dbeafe",   
    },
    text: {
      primary: "#111827",
      secondary: "#6b7280",
    },
    divider: "#e5e7eb",
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f4f6fb",
        },
      },
    },
  },
});

export default theme;