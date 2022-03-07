import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import theme from '../themes';

export default function LoadingScreen() {

	return (
		<Box 
			sx={{
				backgroundColor: theme.palette.black.main,
				padding: 10,
				display: 'flex', 
				justifyContent: 'center', 
				alignItems: 'center', 
				flexDirection: 'column',
				height: '100vh',
				width: '100vw',
				color: theme.palette.yellow,
			}}
		>
            <CircularProgress color="inherit" />
		</Box>
	)
}