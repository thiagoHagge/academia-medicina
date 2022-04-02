import { useState, useEffect } from 'react';
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

export default function Home({carouselItems, news, videos, podcasts}) {
	return (
		<Layout	Layout title='Home' carousel={carouselItems} noMargin>
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
			{podcasts.length > 0 && <Box sx={{pt: 2, pr: 4, pl: 4, pb:2, mb: 2, mt: 4, maxWidth: 720}}>
				<Box sx={{display: 'flex', mb: 2}}>
					<Typography component="span" variant="h5" >
						Podcasts
					</Typography>
					{/* <Link href="/videos" passHref>
						<Button variant="contained" sx={{color: theme.palette.font.dark, backgroundColor: theme.palette.primary.main, '&:hover': {backgroundColor: theme.palette.primary.dark, color: theme.palette.font.dark}, marginLeft: 'auto'}}>Ver todos</Button>
					</Link> */}
				</Box>
				<News news={podcasts} podcasts itemXs={12}  itemSm={12} itemMd={12}/>
			</Box>}
		</Layout>
	);
};

export async function getStaticProps(context) {
    return await api.get('/getLandingPage').then(res => {
		if (res.data.success) {
			return {
				props: {
					carouselItems: res.data.carousel,
					videos: res.data.videos,
					podcasts: res.data.podcasts,
					news: res.data.news,
				},
				revalidate: 10
			}
		} 
	});
}