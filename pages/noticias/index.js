import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Link from 'next/link';

import Layout from '../../../src/patterns/Layout';
import api from '../../../src/api';
import News from '../../../src/patterns/News';

export default function Noticias({news}) {
    return (
        <Layout navbarEditable>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{mt: 2, height: '100%'}}>
                        <Link href="/admin/noticias/new" passHref>
                            <CardActionArea sx={{height: '100%'}}>
                                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                                    <AddRoundedIcon sx={{fontSize: 40}} /> 
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
                <News news={news} admin="/admin/" />
            </Grid>
        </Layout>
    )
}

Noticias.getInitialProps = async () => {
    return api.get('news/get').then(res => {
        return {
            news: res.data.news
        }
    })
}