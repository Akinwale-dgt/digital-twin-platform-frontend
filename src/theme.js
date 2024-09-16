import { createTheme } from '@mui/material/styles';

// Create a theme instance.

const CustomPrevIcon = () => 'Prev';
const CustomNextIcon = () => 'Next';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F05423',
    },
    secondary: {
      main: '#4B4B4B',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          margin: '8px 0',
        },
      },
    },
    MuiPaginationItem: {
      defaultProps: {
        //@ts-ignore
        components: { previous: CustomPrevIcon, next: CustomNextIcon },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          backgroundColor: '#373A36',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
        },
      },
    },
  },
});

export default theme;
