import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Link from 'next/link';

import Layout from './Layout';
import News from './News';
import theme from '../themes';

export default function ListPage({news, slug, video = false}) {
    return (
        <Layout navbarEditable>
            <Grid container spacing={2}>
                <News news={news} admin="/admin" video={video}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Card sx={{mt: 2, height: '100%'}}>
                            <Link href={`/admin/${slug}/new`} passHref>
                                <CardActionArea sx={{height: '100%', '&:hover': {color: theme.palette.primary.main}}}>
                                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                                        <AddRoundedIcon sx={{fontSize: 50}} /> 
                                        <Typography
                                        variant="h6"
                                        >
                                            Novo Item
                                        </Typography>
                                    </Box>
                                </CardActionArea>
                            </Link>
                        </Card>
                    </Grid>
                </News>
            </Grid>
        </Layout>
    )
}

