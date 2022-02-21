import Box from '@mui/material/Box';

export default function LoadingScreen() {

	return (
		<Box 
			sx={{
				backgroundColor: 'warning.dark',
				padding: 10,
				display: 'flex', 
				justifyContent: 'center', 
				alignItems: 'center', 
				flexDirection: 'column'
			}}
		>
            Carregando...
		</Box>
	)
}