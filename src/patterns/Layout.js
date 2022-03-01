import Head from 'next/head';
import { useRef } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Carousel from 'react-bootstrap/Carousel';
import purple from '@material-ui/core/colors/purple';
import theme from '../themes';
import useWindowDimensions from '../hook/useWindowDimensions';
import Navbar from './Navbar';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';

// Icons
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/Call';
import { Typography } from '@material-ui/core';

export default function Layout({title = 'Academia Itabunense de Medicina', children, navbarEditable = false, carousel = [], error = false}) {
	const navbarRef = useRef(null)
	
	const { windowHeight } = useWindowDimensions();
	// console.log(navbarRef.current?.clientHeight)
	return (
		<ThemeProvider theme={theme}>
			<Head>
				<title>{title}</title>
				<link
				rel="stylesheet"
				href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
				integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
				crossorigin="anonymous"
				/>
				<link rel="icon" type="image/png" href="/favicon-32x32.png"/>
			</Head>
			<Box>
				{!navbarEditable && (
					<Box>
						<Grid container sx={{backgroundColor: theme.palette.primary.main}}>
							<Grid item xs={8} >
								<Box sx={[theme.align.start, theme.ps2]}>
									{/* Tratar para ligas de todos os aparelhos */}
									<CallIcon />
									<Typography sx={theme.ps2}>
										(73) 99901-3110
									</Typography>
								</Box>
							</Grid>
							{/* <Grid item xs={4}>
								<Box sx={theme.align.center}>

								</Box>
							</Grid> */}
							<Grid item xs={4}>
								<Box sx={theme.align.center}>
									<IconButton sx={{color: theme.palette.black}}>
										<WhatsAppIcon />
									</IconButton>
									<IconButton sx={{color: theme.palette.black}}>
										<InstagramIcon />
									</IconButton>
									<IconButton sx={{color: theme.palette.black}}>
										<FacebookIcon />
									</IconButton>
								</Box>
							</Grid>
						</Grid>
					</Box>
				)}
				<div ref={navbarRef}>
					<Navbar editable={navbarEditable} />
				</div>
				{carousel.length > 0 && (
					<Carousel sx={{zIndex: theme.zIndex.deep}}>
						{carousel.map(({id, title, subtitle, image}) => <Carousel.Item key={id}>
							<img
							className="d-block w-100"
							style={{maxHeight: windowHeight - navbarRef.current?.clientHeight - 50}}
							// TODO: lINK EM .ENV
							src={image}
							alt=""
							/>
						</Carousel.Item>)}
					</Carousel>
				)}
			</Box>
			<Box sx={{p: 2, display: 'grid', mb: 2}}>
				{error == false ? children : <Alert severity="error">{error === true ? 'Algo deu errado, contate o desenvolvedor' : error}</Alert>}
			</Box>
		</ThemeProvider>
	);
};