import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from 'next/link';

import Layout from '../../src/patterns/Layout';


export default function Index() {
	return (
		<Layout navbarEditable>
			<Grid container spacing={2}>
				{/* TODO: Style boxes showing the images */}
				<Grid item xs={8}>
					<Link href="/admin/carousel">
						<Box sx={{border: 'solid 1px black'}}>Carousel</Box>
					</Link>
				</Grid>
				<Grid item xs={4}>
					<Link href="/admin/noticias">
						<Box sx={{border: 'solid 1px black'}}>Notícias</Box>
					</Link>
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