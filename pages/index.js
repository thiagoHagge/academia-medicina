import { useState, useEffect } from 'react';
import Image from 'next/image'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Avatar from '@mui/material/Avatar';

import api from '../src/api';
import theme from '../src/themes';
import Layout from '../src/patterns/Layout';
import Videos from '../src/patterns/Videos'
import News from '../src/patterns/News';
import { textAlign } from '@mui/system';

export default function Home({carouselItems, news, videos, podcasts, pages, contact}) {
	function ShowSpotifyLink({spotify}) {
		if (spotify == '') return <></>
		if(spotify.slice(0,4) != 'http') {
			spotify = 'https://' + spotify
		} else {
			if(spotify.slice(0,5) != 'https') {
				spotify = spotify.replace('http', 'https')
			}
		}
		return (
			<a href={spotify}>
				<Button variant="contained" sx={{color: theme.palette.font.dark, backgroundColor: theme.palette.primary.main, '&:hover': {backgroundColor: theme.palette.primary.dark, color: theme.palette.font.dark}, marginLeft: 'auto'}}>Ver todos</Button>
			</a>
		)
	}
	return (
		<Layout	Layout title='Academia de Medicina de Itabuna' carousel={carouselItems} noMargin pages={pages} contact={contact}>
			<Box sx={{mt: 4, mr: 4, ml: 4, mb:1}}>
				<Box xs={12} sx={{display: 'flex', mb: 2}}>
					<Typography component="span" variant="h5">
						Notícias
					</Typography>
					<Link href="/noticias" passHref>
						<Button variant="contained" sx={{color: theme.palette.font.dark, backgroundColor: theme.palette.primary.main, '&:hover': {backgroundColor: theme.palette.primary.dark, color: theme.palette.font.dark}, marginLeft: 'auto'}}>Ver todas</Button>
					</Link>
				</Box>
				<News news={news} />
			</Box>
			{videos.length > 0 && <Box sx={{pt: 2, pr: 4, pl: 4, pb:2, mt: 4, backgroundColor: theme.palette.primary.light}}>
				<Box sx={{display: 'flex'}}>
					<Typography component="span" variant="h5" >
						Vídeos
					</Typography>
					<Link href="/videos" passHref>
						<Button variant="contained" sx={{color: theme.palette.font.dark, backgroundColor: theme.palette.primary.main, '&:hover': {backgroundColor: theme.palette.primary.dark, color: theme.palette.font.dark}, marginLeft: 'auto'}}>Ver todos</Button>
					</Link>
				</Box> 
				<Videos videos={videos}/>
			</Box>}
			<Grid container sx={{pt: 2, pb:2, mb: 2, mt: 4}}>
				{podcasts.length > 0 && <Grid item lg={9} sx={{pr: 4, pl: 4}}>
					<Box sx={{maxWidth: 720}}>
						<Box sx={{display: 'flex', mb: 2, justifyContent: 'space-between'}}>
							<Typography component="span" variant="h5" >
								Podcasts
							</Typography>
							<ShowSpotifyLink spotify={contact.spotify} />
						</Box>
						<News news={podcasts} podcasts itemXs={12}  itemSm={12} itemMd={12}/>
					</Box>
				</Grid>}
				<Grid item lg={3}>
					<Typography component="span" variant="h5" >
						Instituições parceiras
					</Typography>
					<Box>
						<ImageList
						sx={{}}
						variant="quilted"
						cols={1}
						gap={2}
						// rowHeight={121}
						>
							<ImageListItem sx={{textAlign: 'center'}}>
								<img src="http://www.acessoinformacao.com.br/ba/itabuna/wp-content/themes/acessoinformacao/images/logo.png" style={{objectFit: 'contain', maxWidth: '100%', width: 'unset', height: 'auto'}} />
							</ImageListItem>
							<ImageListItem sx={{textAlign: 'center'}}>
								<Link href="https://itabuna.fasa.edu.br/" passHref>
									<img src="https://aprimoramente.com/_next/image?url=https%3A%2F%2Fd3q79ipuvy7qd5.cloudfront.net%2Fentities%2F61ec50bec971064ec95941b6ae249234%2F86e1b2118c82581433d9df4b29aee157dbaab6b5ea7d2e1940a6e3316988a05e.png&w=3840&q=75" style={{objectFit: 'contain', maxWidth: '100%', width: 'unset', height: 'auto'}} />
								</Link>
							</ImageListItem>
							<ImageListItem sx={{textAlign: 'center'}}>
								<img src="https://academia-medicina.s3.amazonaws.com/images/TMs9oJnZ1cU8xm8BLZ0OwemWgzBgHYNzRYSC5fsl.png" style={{objectFit: 'contain', maxWidth: '100%', width: 'unset', height: 'auto'}} />
							</ImageListItem>
						</ImageList>
					</Box>
				</Grid>
			</Grid>
			<Box sx={{pt: 2, pr: 4, pl: 4, pb:5, mt: 4, backgroundColor: theme.palette.primary.light}}>
				<Box sx={{display: 'flex', justifyContent: 'center', mb: 4}}>
					<Typography component="span" variant="h5">
						O que Eles estão fazendo?
					</Typography>
				</Box> 
				<Grid container sx={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
					<Grid xs={4} item sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'justify', pr: 2, pl: 2}}>
						<Avatar sx={{width: 100, height: 100}} src="https://i.imgur.com/ungaT1s.jpg" />
						<Typography>
							“Além de exercer minha atividade
							Profissional na Beira Rio, estou desenvolvendo
							dois projetos para atender crianças
							com problemas de visão em duas
							Escola públicas e Rotary Club. Estou também
							Planejando uma tournée pela Europa
							para janeiro próximo, quando
							pretendo fazer visita a alguns países
							que estão na vanguarda do trabalho
							Ótico, a exemplo da Alemanha, trazer novos
							equipamentos, fazer um curso e visitar suas
							universidades.
							Na volta devo visitar meus filhos.
							Estou também planejando escrever
							um livro de poesias, que é um sonho
							que acalento desde uns anos atrás”.
						</Typography>
					</Grid>
					<Grid xs={4} item sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'justify', pr: 2, pl: 2}}>
						<Avatar sx={{width: 100, height: 100}} src="https://academia-medicina.s3.amazonaws.com/images/9PbzfDGjlH2mWnELUvCKmw06TGfsOd73zdkSqVDs.jpg" />
						<Typography>
							“Além de exercer minha atividade
							Profissional na Beira Rio, estou desenvolvendo
							dois projetos para atender crianças
							com problemas de visão em duas
							Escola públicas e Rotary Club. Estou também
							Planejando uma tournée pela Europa
							para janeiro próximo, quando
							pretendo fazer visita a alguns países
							que estão na vanguarda do trabalho
							Ótico, a exemplo da Alemanha, trazer novos
							equipamentos, fazer um curso e visitar suas
							universidades.
							Na volta devo visitar meus filhos.
							Estou também planejando escrever
							um livro de poesias, que é um sonho
							que acalento desde uns anos atrás”.
						</Typography>
					</Grid>
					<Grid xs={4} item sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'justify', pr: 2, pl: 2}}>
						<Avatar sx={{width: 100, height: 100}} src="https://i.imgur.com/aSrS8tY.jpg" />
						<Typography>
							“Além de exercer minha atividade
							Profissional na Beira Rio, estou desenvolvendo
							dois projetos para atender crianças
							com problemas de visão em duas
							Escola públicas e Rotary Club. Estou também
							Planejando uma tournée pela Europa
							para janeiro próximo, quando
							pretendo fazer visita a alguns países
							que estão na vanguarda do trabalho
							Ótico, a exemplo da Alemanha, trazer novos
							equipamentos, fazer um curso e visitar suas
							universidades.
							Na volta devo visitar meus filhos.
							Estou também planejando escrever
							um livro de poesias, que é um sonho
							que acalento desde uns anos atrás”.
						</Typography>
					</Grid>
				</Grid>
			</Box>
		</Layout>
	);
};

export async function getStaticProps(context) {
    const data = await api.get('/getLandingPage').then(res => res.data)
    const {pages, contact} = await api.get('/getPages').then(res => res.data)
	return {
		props: {
			carouselItems: data.carousel,
			videos: data.videos,
			podcasts: data.podcasts,
			news: data.news,
			pages: pages,
			contact: contact
		},
		revalidate: 10
	}
}