import Link from 'next/link';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
export default function Noticias({ news, admin = '' }) {
    return (
        <Grid container spacing={2}>
            {news.map(item => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.image + item.title}>
                    <Card sx={{mt: 2, height: '100%'}}>
                        <Link href={`${admin}noticias/${item.link}`} passHref>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                image={`${process.env.URL_API}images/${item.image}`}
                                alt="Live from space album cover"
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography component="div" variant="h5">
                                            {item.title}
                                        </Typography>
                                        {/* <Typography variant="subtitle1" color="text.secondary" component="div">
                                            Mac Miller
                                        </Typography> */}
                                    </CardContent>
                                </Box>
                            </CardActionArea>
                        </Link>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}