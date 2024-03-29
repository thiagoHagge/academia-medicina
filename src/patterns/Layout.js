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
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
// Icons
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/Call';
import { Typography } from '@material-ui/core';

import theme from '../themes';
import useWindowDimensions from '../hook/useWindowDimensions';
import Navbar from './Navbar';
import LoadingScreen from './LoadingScreen';


export default function Layout({pages = [], title = 'Academia Itabunense de Medicina', children, navbarEditable = false, carousel = [], error = false, noMargin = false, loading = false, contact = {}}) {
	const navbarRef = useRef(null)
	const { windowHeight } = useWindowDimensions();
	let phone = ''
	if(contact.phone) {
		let regex = /\d/g
		phone = contact.phone.match(regex).join('')
	}
	function SocialMedia(color = theme.palette.black.black ) {
		const ShowIconButton = ({children, link}) => {
			if (!link) return null
			if(link.slice(0,4) != 'http') {
				link = 'https://' + link
			} else {
				if(link.slice(0,5) != 'https') {
					link = link.replace('http', 'https')
				}
			}
			return <a href={link}>
				<IconButton sx={{color: color}}>
					{children}
				</IconButton>
			</a>
		}
		let whatsNum = ''
		if(contact.whatsapp) {
			let regex = /\d/g
			whatsNum = contact.whatsapp.match(regex).join('')
		}
		return (
			<Box sx={theme.align.center}>
				{whatsNum != '' && <ShowIconButton link={`https://api.whatsapp.com/send?phone=55${whatsNum}${contact.whatsappMessage != '' ? `&text=${encodeURI(contact.whatsappMessage)}` : ''}`}>
					<WhatsAppIcon />
				</ShowIconButton>}
				<ShowIconButton link={contact.instagram}>
					<InstagramIcon />
				</ShowIconButton>
				<ShowIconButton link={contact.facebook}>
					<FacebookIcon />
				</ShowIconButton>
				<ShowIconButton link={contact.youtube}>
					<YouTubeIcon />
				</ShowIconButton>
			</Box>
		)
	}
	// console.log(contact)
	// console.log(!contact.whatsapp, !contact.instagram, !contact.facebook, !contact.youtube)
	return (
		<ThemeProvider theme={theme}>
			<Head>
				<title>{title}</title>
				<meta name="description" content="A Academia Itabunense de Medicina têm como objetivo a divulgação científica, produção de conteúdo acadêmico, divulgação de eventos, premiações, entre outros." />
				<meta name="keywords" content="academia de medicina, itabuna"/>
				<meta name="robots" content={navbarEditable ? 'noindex, nofollow' : 'index, follow'} />
				<link
				rel="stylesheet"
				href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
				integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
				crossOrigin="anonymous"
				/>
				<link rel="icon" type="image/png" href="/favicon-32x32.png"/>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link href="https://fonts.googleapis.com/css2?family=Lora&display=swap" rel="stylesheet" />
			</Head>
			{!loading ? <Box sx={{minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflowX: 'hidden'}}>
				<Box>
					<Box>
						{!navbarEditable && (
							<Box>
								<Grid container sx={{backgroundColor: theme.palette.primary.main}}>
									<Grid item xs={8} >
										<Box sx={[theme.align.start, theme.ps2]}>
											{/* Tratar para ligas de todos os aparelhos */}
											{contact.phone && <a href={`tel:55${phone}`} style={{display: 'flex', color: theme.palette.black.main}} >
													<CallIcon />
													<Typography sx={theme.ps2}>
														{contact.phone}
													</Typography>
												</a>
											}
										</Box>
									</Grid>
									<Grid item xs={4}>
										<SocialMedia color="#000000" />
									</Grid>
								</Grid>
							</Box>
						)}
						<div ref={navbarRef}>
							<Navbar editable={navbarEditable} pages={pages} />
						</div>
						{carousel.length > 0 && (
							<Carousel sx={{zIndex: theme.zIndex.deep}}>
								{carousel.map(({id, title, subtitle, image}) => <Carousel.Item key={id}>
									<img
									className="d-block w-100"
									style={{maxHeight: windowHeight && navbarRef.current?.clientHeight ? windowHeight - navbarRef.current?.clientHeight - 50: 380}}
									// TODO: lINK EM .ENV
									src={image}
									alt=""
									/>
								</Carousel.Item>)}
							</Carousel>
						)}
					</Box>
					{noMargin ? children : <Box sx={{p: 2, display: 'block', mb: 2}}>
						{error == false ? children : <Alert severity="error">{error === true ? 'Algo deu errado, contate o desenvolvedor' : error}</Alert>}
					</Box>}
				</Box>
				<Box sx={{justifySelf: 'flex-end'}}>
					<Box sx={{backgroundColor: theme.palette.black.dark, py: '20px', display: 'flex', justifyContent: 'space-evenly', alignItems: {xs: 'center', md: 'baseline'}, flexDirection: {xs: 'column', md: 'row'}}}>
						<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', order: {xs: 1, md: 0}, mb: 3, flex: 1}}>
							{(contact.phone || contact.email) && <>
								<h6 style={{fontFamily: "'Lora', serif", color: theme.palette.white, fontSize: '22px'}}>
									Contatos
								</h6>
								{contact.phone && <a href={`tel:55${phone}`} style={{fontFamily: "'Lora', serif", color: theme.palette.white, marginBottom: '5px'}}>
									<CallIcon sx={{mr: 1}} />
									{contact.phone}
								</a>}
								<a href={`mailto:${contact.email}`} style={{fontFamily: "'Lora', serif", color: theme.palette.white}}>
									<EmailRoundedIcon sx={{mr: 1}} />
									{contact.email}
								</a>
							</>}
						</Box>
						<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', order: {xs: 0, md: 1}, mb: 3, flex: 1}}>
							<img src="/logo-dark.png" style={{width: 250}} />
							<h6 style={{fontFamily: "'Lora', serif", color: theme.palette.white, fontSize: '25px', letterSpacing: '1px', marginBottom: 0, lineHeight: 1, fontWeight: 500}}>
								ACADEMIA DE
							</h6>
							<h2 style={{fontFamily: "'Lora', serif", color: theme.palette.white, letterSpacing: '5px', fontSize: '38px', marginBottom: 0, lineHeight: 1.4, fontWeight: 500}}>
								MEDICINA
							</h2>
							<h6 style={{fontFamily: "'Lora', serif", color: theme.palette.white, fontSize: '25px', letterSpacing: '1px', marginBottom: 0, lineHeight: 1, fontWeight: 500}}>
								DE ITABUNA
							</h6>
						</Box>
						<Box sx={{display: 'flex', flexDirection: 'column', order: 3, flex: 1}}>
							{(contact.whatsapp || contact.instagram || contact.facebook || contact.youtube) && <>
								<h6 style={{fontFamily: "'Lora', serif", color: theme.palette.white, fontSize: '22px', textAlign: 'center'}}>
									Redes sociais:
								</h6>
								<SocialMedia color={theme.palette.white} />
							</>}
						</Box>
					</Box>
					<Box sx={{backgroundColor: theme.palette.primary.main, py: '5px'}}>
						<p style={{fontFamily: "'Lora', serif", marginBottom: 0, textAlign: 'center'}}>
							2022 - Academia de Medicina de Itabuna - Copyright© todos os direitos reservados
						</p>
					</Box>
				</Box>
			</Box> : <LoadingScreen />}
		</ThemeProvider>
	);
};

