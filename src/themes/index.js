import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
        black: '#000',
        white: '#fff',
        primary: {
            main: '#fdd200',
        },
        background: {
            paper: '#000',
        }
    },
    zIndex: { 
        deep: -1
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    ms2: {
        marginRight: '1rem',
    }

});

export default theme;