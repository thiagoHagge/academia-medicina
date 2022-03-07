import Link from 'next/link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function NewsList({ news = [], admin = '', children, video = false }) {
    return (
        <Grid container spacing={2}>
            {children}
            {news.map(item => {
                let date = new Date(Date.parse(item.updated))
                const month = [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ]
                let dateStr = `${date.getDay()} de ${month[date.getMonth()]} de ${date.getFullYear()}`
                return (
                <Grid item xs={12} sm={6} md={3} key={item.image + item.title}>
                    <Link href={`${admin}/noticias/${item.link}`} passHref>
                        <Card sx={{mt: 2}}>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                sx={{maxHeight: 200}}
                                image={video ? `https://i.ytimg.com/vi/${item.ytId}/hqdefault.jpg` : item.image}
                                alt=""
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography component="p" variant="h5" style={{whiteSpace: 'pre-wrap'}}>
                                            {item.title}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            {item.creation == item.updated ? 'Criado em ' : 'Atualizado em '}{dateStr} por {item.author}
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </CardActionArea>
                        </Card>
                    </Link>
                </Grid>
            )})}
        </Grid>
    )
}