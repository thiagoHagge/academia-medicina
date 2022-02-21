import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAuth } from '../../src/contexts/auth';
import { useRouter } from 'next/router';

export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter()
	const { signed, login } = useAuth();
	useEffect(() => {
		if(signed == true) {
			router.push('/admin')
		};
	}, [])
		
	return (
		<Box 
			mode="dark"
			sx={{
				width: '100vw',
				height: '100vh',
				backgroundColor: 'secondary.main',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Box 
				sx={{
					backgroundColor: 'warning.light',
					padding: 10,
					display: 'flex', 
					justifyContent: 'center', 
					alignItems: 'center', 
					flexDirection: 'column'
				}}
			>
				<Typography
					variant="h6"
					noWrap
					component="div"
					sx={{ 
						mb: 2, 
						display: { 
							xs: 'none', 
							md: 'flex' 
						} 
					}}
				>
					Login
				</Typography>
				<TextField 
					id="user" 
					label="Usuário" 
					variant="outlined"
					margin="normal"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<TextField 
					id="pass" 
					label="Senha"
					type="password"
					autoComplete="current-password" 
					variant="outlined"
					margin="normal"	
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					// sx={{
					// 	mb: 2
					// }}
				/>
				<Button 
					variant="contained" 
					size="large"
					onClick={() => login(username, password)}
				>
					Logar
				</Button>
			</Box>
		</Box>
  );
}