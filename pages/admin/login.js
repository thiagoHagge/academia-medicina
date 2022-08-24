import { useState, useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAuth } from '../../src/contexts/auth';
import { useRouter } from 'next/router';
import theme from '../../src/themes';

export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter()
	const { signed, login } = useAuth();
	useEffect(() => {
		if(signed == true) {
			router.push('/admin')
		};
	})
		
	return (
		<ThemeProvider theme={theme}>
			<Head>
				<title>Área de edição</title>
				<meta name="description" content="Painel de amin" />
				<meta name="robots" content="noindex, nofollow"/>
				<link rel="icon" type="image/png" href="/favicon-32x32.png"/>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link href="https://fonts.googleapis.com/css2?family=Lora&display=swap" rel="stylesheet" />
			</Head>
			<Box 
				mode="dark"
				sx={{
					width: '100vw',
					height: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Box 
					sx={{
						backgroundColor: theme.palette.yellow,
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
					{router.query.error && (<Alert icon={false} sx={{width: '100%', py: 0, mb: 1, backgroundColor: 'black', color: '#aaa'}}>
						{router.query.error}
					</Alert>)}
					<Button 
						variant="contained" 
						size="large"
						onClick={() => login(username, password)}
						sx={{color: 'white', backgroundColor: theme.palette.black.main,  "&:hover": {
							backgroundColor: theme.palette.black.main,
						},}}
					>
						Logar
					</Button>
				</Box>
			</Box>
		</ThemeProvider>
	);
}