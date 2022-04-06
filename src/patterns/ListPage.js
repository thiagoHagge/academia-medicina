import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Link from 'next/link';

import Layout from './Layout';
import News from './News';
import theme from '../themes';

export default function ListPage({news, slug, video = false, podcast = false, pages = []}) {
    return (
        <Layout navbarEditable title={video ? 'Vídeos' : 'Notícias'} pages={pages}>
            <Typography variant="h5">
                {podcast ? 'Podcast' : video ? 'Vídeos' : 'Notícias'}:
			</Typography>
            <News news={news} admin="/admin" video={video} podcastEditable={podcast}>
                <Grid item xs={12} sm={6} md={3}>
                    <Link href={`/admin/${podcast? 'podcasts' : video ? 'videos' : 'noticias'}/new`} passHref>
                        <Card sx={{mt: 2, maxWidth: 345, margin: '0 auto 0'}}>
                            <CardActionArea sx={{maxHeight: 280}}>
                                <CardContent sx={{ flex: '1 0 auto', backgroundColor: '#121212', borderRadius: '0 0 4px 4px', py: 0, minHeight: 90, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                    <AddRoundedIcon sx={{fontSize: 50, color: theme.palette.font.light}} /> 
                                    <Typography
                                    variant="h6"
                                    style={{whiteSpace: 'pre-wrap', color: theme.palette.font.light, fontSize: 15, lineHeight: 1}}
                                    >
                                        Novo Item
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                </Grid>
            </News>
        </Layout>
    )
}

