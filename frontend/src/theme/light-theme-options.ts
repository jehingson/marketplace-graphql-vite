import { ThemeOptions } from "@mui/material";
// Colors

const neutral = {
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D1D5DB',
  400: '#9CA3AF',
  500: '#6B7280',
  600: '#4B5563',
  700: '#374151',
  800: '#1F2937',
  900: '#111827'
};

const background = {
  default: '#F9FAFC',
  paper: '#FFFFFF'
};

const divider = '#E6E8F0';

const primary = {
  main: '#8395d5',
  light: '#8EAAFB',
  dark: '#6f80ad',
  contrastText: '#fff',
};

const secondary = {
  main: '#49BEFF',
  light: '#E8F7FF',
  dark: '#23afdb',
};

const success = {
  main: '#13DEB9',
  light: '#E6FFFA',
  dark: '#02b3a9',
  contrastText: '#ffffff',
};

const info = {
  main: '#539BFF',
  light: '#EBF3FE',
  dark: '#1682d4',
  contrastText: '#ffffff',
};

const warning = {
  main: '#FFAE1F',
  light: '#FEF5E5',
  dark: '#ae8e59',
  contrastText: '#ffffff',
};

const error = {
  main: '#FA896B',
  light: '#FDEDE8',
  dark: '#f3704d',
  contrastText: '#ffffff',
};

const grey = {
  100: '#F2F6FA',
  200: '#EAEFF4',
  300: '#DFE5EF',
  400: '#7C8FAC',
  500: '#5A6A85',
  600: '#2A3547',
}

const text = {
  primary: '#2A3547',
  secondary: '#5A6A85',
  disabled: '#3741517a'
};

export const LightThemeOptions: ThemeOptions = {
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: neutral[500],
          color: '#FFFFFF'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-filledDefault': {
            backgroundColor: neutral[200],
            '& .MuiChip-deleteIcon': {
              color: neutral[400]
            }
          },
          '&.MuiChip-outlinedDefault': {
            '& .MuiChip-deleteIcon': {
              color: neutral[300]
            }
          }
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&::placeholder': {
            opacity: 1,
            color: text.secondary
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: divider
        }
      }
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderColor: divider,
          borderStyle: 'solid',
          borderWidth: 1
        }
      }
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderColor: divider,
          borderStyle: 'solid',
          borderWidth: 1
        }
      }
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: neutral[500]
        },
        track: {
          backgroundColor: neutral[400],
          opacity: 1
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${divider}`
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: neutral[100],
          '.MuiTableCell-root': {
            color: neutral[700]
          }
        }
      }
    }
  },
  palette: {
    action: {
      active: neutral[500],
      focus: '#3741511f',
      hover: '#3741510a',
      selected: '#37415114',
      disabledBackground: '#3741511f',
      disabled: '#37415142',
      hoverOpacity: 0.02,
    },
    background,
    divider,
    error,
    info,
    mode: 'light',
    primary,
    secondary,
    success,
    text,
    warning,
    grey
  },
  shadows: [
    'none',
    '0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)',
    '0px 1px 2px rgba(100, 116, 139, 0.12)',
    '0px 1px 4px rgba(100, 116, 139, 0.12)',
    '0px 1px 5px rgba(100, 116, 139, 0.12)',
    '0px 1px 6px rgba(100, 116, 139, 0.12)',
    '0px 2px 6px rgba(100, 116, 139, 0.12)',
    '0px 3px 6px rgba(100, 116, 139, 0.12)',
    '0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)',
    '0px 5px 12px rgba(100, 116, 139, 0.12)',
    '0px 5px 14px rgba(100, 116, 139, 0.12)',
    '0px 5px 15px rgba(100, 116, 139, 0.12)',
    '0px 6px 15px rgba(100, 116, 139, 0.12)',
    '0px 7px 15px rgba(100, 116, 139, 0.12)',
    '0px 8px 15px rgba(100, 116, 139, 0.12)',
    '0px 9px 15px rgba(100, 116, 139, 0.12)',
    '0px 10px 15px rgba(100, 116, 139, 0.12)',
    '0px 12px 22px -8px rgba(100, 116, 139, 0.25)',
    '0px 13px 22px -8px rgba(100, 116, 139, 0.25)',
    '0px 14px 24px -8px rgba(100, 116, 139, 0.25)',
    '0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)'
  ],
};
