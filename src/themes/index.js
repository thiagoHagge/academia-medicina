import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
        black: '#000',
        black50: '#00000040',
        yellow: '#FFD200',
        white: '#fff',
        primary: {
            main: '#fdd200',
        },
        background: {
            paper: '#000',
        },
        danger: '#f00f00'
    },
    zIndex: { 
        deep: -1
    },
    align: {
        center: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
        },
        start: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'left',
            height: '100%',
        }
    },

    ps2: {
        paddingLeft: '1rem',
    }

});

export default theme;