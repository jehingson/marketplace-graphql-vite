import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material';
import { LightThemeOptions } from './light-theme-options';


const baseOptions: ThemeOptions = {
  direction: 'ltr',
  components: {
    MuiAvatar: {
      styleOverrides: {
        fallback: {
          height: '75%',
          width: '75%',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          height: '100%',
          width: '100%',
        },
        body: {
          height: '100%',
        },
        '#root': {
          height: '100%',
        },
        '#nprogress .bar': {
          zIndex: '2000 !important',
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: 'h6',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          overflow: 'hidden',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
          marginRight: '16px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
  typography: {
    fontSize: 14,
    button: {
      fontWeight: 600,
    },
    fontFamily: '"Sora", sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: '3.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '3rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2.25rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
    },
    overline: {
      fontSize: '0.8rem',
    },
  },
};

export const theme = responsiveFontSizes(createTheme(baseOptions, LightThemeOptions));