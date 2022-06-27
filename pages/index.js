import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styles from '../styles/Home.module.css'
import Link from 'next/link';

import api from '../src/api';
import theme from '../src/themes';
import Layout from '../src/patterns/Layout';
import Videos from '../src/patterns/Videos'
import News from '../src/patterns/News';

export default function Home({carouselItems, news, videos, pages, contact}) {
	function ShowSpotifyLink({spotify}) {
		if (spotify == '') return <></>
		let spotify_split = spotify.split('/')
		return (
			<Box sx={{display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				position: 'relative',
				left: '50%',
				transform: 'translateX(-50%)', pt: 2, pb:2, mb: 2, mt: 4, maxWidth: 720}}>
				<Typography component="span" variant="h4" sx={{mb: 2}} >
					Conheça nosso podcast!
				</Typography>
				<iframe style={{borderRadius:12}}
						src={`https://open.spotify.com/embed/show/${spotify_split[spotify_split.length - 1]}?utm_source=generator&theme=0`}
						width="100%" height="232" allowFullScreen
						allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
			</Box>
		)
	}
	return (
		<Layout	Layout title='Academia de Medicina de Itabuna' carousel={carouselItems} noMargin pages={pages} contact={contact}>
			<Box sx={{mt: 4, mr: 4, ml: 4, mb:1}}>
				<Grid item xs={12} sx={{display: 'flex', mb: 2}}>
					<Typography component="span" variant="h5">
						Notícias
					</Typography>
					<Link href="/noticias" passHref>
						<Button variant="contained" sx={{color: theme.palette.font.dark, backgroundColor: theme.palette.primary.main, '&:hover': {backgroundColor: theme.palette.primary.dark, color: theme.palette.font.dark}, marginLeft: 'auto'}}>Ver todas</Button>
					</Link>
				</Grid>
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
			<ShowSpotifyLink spotify={contact.spotify} />
		</Layout>
	);
};

export async function getStaticProps() {
	try {
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
	} catch (e) {
		console.log(e)
	}
}