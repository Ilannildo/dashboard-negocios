import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#481c6c",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#665a6e",
      contrastText: "#FFFFFF",
    },
    tertiary: {
      main: "#805156",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#fffbff",
      // default: "#FEFEFF",
      paper: "#FEFEFF",
    },
    error: {
      main: "#ba1a1a",
    },
    text: {
      primary: "#2d004f",
      disabled: "#7c757e",
    },
    onPrimary: {
      main: "#FFFFFF",
    },
    onPrimaryContainer: {
      main: "#211829",
    },
    onSecondary: {
      main: "#FFFFFF",
    },
    onSecondaryContainer: {
      main: "#211829",
    },
    onSurface: {
      main: "#3c4b64",
    },
    onSurfaceVariant: {
      main: "#4b454d",
    },
    onTertiary: {
      main: "#FFFFFF",
    },
    onTertiaryContainer: {
      main: "#321015",
    },
    primaryContainer: {
      main: "#f1daff",
    },
    secondaryContainer: {
      main: "#eeddf6",
    },
    surfaceVariant: {
      main: "#e9dfea",
    },
    tertiaryContainer: {
      main: "#ffdadc",
    },
    neutral: {
      main: "#DDE3EA",
    },
  },
  typography: {
    fontFamily: "Montserrat",
    h1: {
      color: "#211829",
    },
  },
  components: {
    // Name of the component
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});

declare module "@mui/material/styles" {
  interface PaletteOptions {
    tertiary: PaletteOptions["primary"];
    onPrimary: PaletteOptions["primary"];
    onPrimaryContainer: PaletteOptions["primary"];
    primaryContainer: PaletteOptions["primary"];
    onSecondary: PaletteOptions["primary"];
    onSecondaryContainer: PaletteOptions["primary"];
    secondaryContainer: PaletteOptions["primary"];
    onTertiary: PaletteOptions["primary"];
    onTertiaryContainer: PaletteOptions["primary"];
    tertiaryContainer: PaletteOptions["primary"];
    onSurface: PaletteOptions["primary"];
    onSurfaceVariant: PaletteOptions["primary"];
    surfaceVariant: PaletteOptions["primary"];
    neutral: PaletteOptions["primary"];
  }

  interface Palette {
    tertiary: Palette["primary"];
    onPrimary: Palette["primary"];
    onPrimaryContainer: Palette["primary"];
    primaryContainer: Palette["primary"];
    onSecondary: Palette["primary"];
    onSecondaryContainer: Palette["primary"];
    secondaryContainer: Palette["primary"];
    onTertiary: Palette["primary"];
    onTertiaryContainer: Palette["primary"];
    tertiaryContainer: Palette["primary"];
    onSurface: Palette["primary"];
    onSurfaceVariant: Palette["primary"];
    surfaceVariant: Palette["primary"];
    neutral: Palette["primary"];
  }
}
