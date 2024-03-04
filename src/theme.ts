import { createTheme } from '@mui/material/styles';
import { red, blue, grey } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: blue[500],
        },
        /*text: {
          primary: '#fff',
          secondary: grey[500],
        },
        secondary: {
          main: '#19857b',
        },
        error: {
          main: red.A400,
        },*/
    },
    // Here you could add global styles what you exactly want
    components: {
       /* MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: '1rem',
                    background: blue[500],
                    color: '#fff',
                    fontWeight: 'bold'
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    marginBottom: 50,
                },
            },
        }*/
    }

});

export default theme;