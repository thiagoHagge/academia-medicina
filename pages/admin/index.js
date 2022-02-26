import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from 'next/link';
import CardActionArea from '@mui/material/CardActionArea';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ViewCarouselOutlinedIcon from '@mui/icons-material/ViewCarouselOutlined';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import Layout from '../../src/patterns/Layout';


export default function Index() {
	return (
		<Layout navbarEditable>
			<Grid container spacing={2}>
				{/* TODO: Style boxes showing the images */}
				<Grid item xs={3}>
					<Card>
						<Link href="/admin/carousel" passHref>
							<CardActionArea>
								<CardContent sx={{textAlign: 'center'}}>
									<ViewCarouselOutlinedIcon sx={{fontSize: 50}} />
								</CardContent>
							</CardActionArea>
						</Link>
					</Card>
				</Grid>
				<Grid item xs={3}>
					<Card>
						<Link href="/admin/noticias" passHref>
							<CardActionArea>
								<CardContent sx={{textAlign: 'center'}}>
									<NewspaperRoundedIcon sx={{fontSize: 50}} />
								</CardContent>
							</CardActionArea>
						</Link>
					</Card>
				</Grid>
				{/* <Grid item xs={4}>
					<Box>xs=4</Box>
				</Grid>
				<Grid item xs={4}>
					<Box>xs=4</Box>
				</Grid>
				<Grid item xs={8}>
					<Box>xs=8</Box>
				</Grid> */}
			</Grid>
		</Layout>
	)
}