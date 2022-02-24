import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Link from 'next/link';

import Layout from '../../../src/patterns/Layout';
import api from '../../../src/api';

export default function Noticias({news}) {
    return (
        <Layout navbarEditable>
            <Card sx={{mt: 2}}>
                <Link href="/admin/noticias/new" passHref>
                    <CardActionArea sx={{height: '100%'}}>
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
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
            {news.map(item => (
                <Card sx={{mt: 2}} key={`news-${item}`}>
                    <Link href={`/admin/noticias/${item.link}`} passHref>
                        <CardActionArea sx={{display: 'flex'}}>
                            <CardMedia
                            component="img"
                            image={`http://localhost:8000/images/${item.image}`}
                            alt="Live from space album cover"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        {item.title}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Mac Miller
                                    </Typography>
                                </CardContent>
                            </Box>
                        </CardActionArea>
                    </Link>
                </Card>
            ))}
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