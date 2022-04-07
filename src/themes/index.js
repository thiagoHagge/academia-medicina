import { createTheme } from '@material-ui/core/styles';

const palette = {
    black: {
        black: '#000000ff',
        main: '#111111',
        dark: '#0e0e0e',
    },
    font: {
        dark: '#000000',
        light: '#ffffff'
    },
    yellow: '#FFD200',
    white: '#fff',
    primary: {
        main: '#fdd200',
        active: '#fdd200',
        dark: '#caa800',
        light: '#fdd20040'
    },
    background: {
        paper: '#000',
    },
    danger: {
        main: '#f00f00',
        dark: '#bb2d3b'
    }
}
const theme = createTheme({
    palette: palette,
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