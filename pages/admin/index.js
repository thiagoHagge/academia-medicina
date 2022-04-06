import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from 'next/link';
import CardActionArea from '@mui/material/CardActionArea';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ViewCarouselOutlinedIcon from '@mui/icons-material/ViewCarouselOutlined';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PodcastsRoundedIcon from '@mui/icons-material/PodcastsRounded';
import SvgIcon from '@material-ui/core/SvgIcon';


import theme from '../../src/themes';
import Layout from '../../src/patterns/Layout';
import api from '../../src/api';

export default function Index({pages = []}) {
	return (
		<Layout navbarEditable title="Painel do admin - AMEI-BA" pages={pages}>
			<Typography variant="h5">
				Editar:
			</Typography>
			{/* TODO: Style boxes showing the images */}
			<Box sx={{flexDirection: 'row', display: 'flex', flexWrap: 'wrap'}}>
				<CardEdit link="/admin/carousel" name="Carrousel" icon={ViewCarouselOutlinedIcon} />
				<CardEdit link="/admin/noticias" name="Notícias" icon={NewspaperRoundedIcon} />
				<CardEdit link="/admin/videos" name="Vídeos" icon={YouTubeIcon} />
				<CardEdit link="/admin/podcasts" name="Podcasts" icon={PodcastsRoundedIcon} />
			</Box>
		</Layout>
	)
}

function CardEdit({link, name, icon}) {
	return (
		<Card sx={{marginRight: 2, marginBottom: 2, width: 106}}>
			<Link href={link} passHref>
				<CardActionArea sx={{'&:hover': {color: theme.palette.primary.main}}}>
					<CardContent sx={{textAlign: 'center'}}>
						<SvgIcon component={icon} style={{fontSize: 50}} ></SvgIcon>
						{/* <YouTubeIcon /> */}
						<Typography>
							{name}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Link>
		</Card>
	)
}

export async function getStaticProps() {
    const pages = await api.get('/getPages').then(res => res.data.pages)
	return {
		props: {
			pages: pages
		},
		revalidate: 10
	}
}