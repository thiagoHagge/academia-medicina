import Link from 'next/link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

import theme from '../themes';

export default function NewsList({ news = [], admin = '', video = false, containerSx = {}, itemXs = 0, itemSm = 0, itemMd = 0, noImage = false }) {
    return (
        <Grid container spacing={2} sx={containerSx}>
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
                <Grid item xs={itemXs === 0 ? 12 : itemXs} sm={itemSm === 0 ? 6 : itemSm} md={itemMd === 0 ? 3 : itemMd} key={item.image + item.title} sx={{alignSelf: 'stretch', justifySelf: 'stretch'}}>
                    <Link href={`${admin}/${video ? 'videos' : 'noticias'}/${item.link}`} passHref>
                        <Card sx={{mt: 2, maxWidth: 345, margin: '0 auto 0'}}>
                            <CardActionArea sx={{maxHeight: 280}}>
                                {(video || item.image) && !noImage && <CardMedia
                                component="img"
                                sx={{height: 200}}
                                image={video ? `https://i.ytimg.com/vi/${item.ytId}/hqdefault.jpg` : item.image}
                                alt=""
                                />}
                                <CardContent sx={{ flex: '1 0 auto', backgroundColor: '#121212', borderRadius: '0 0 4px 4px', py: 0, minHeight: 80, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                    <Typography gutterBottom component="div" variant="h5" style={{whiteSpace: 'pre-wrap', color: '#fff', fontSize: 15, lineHeight: 1}}>
                                        {item.title}
                                    </Typography>
                                    {!video && (
                                        <Box sx={{color: '#ffffffb3', display: 'flex'}}>
                                            <CalendarMonthRoundedIcon sx={{color: theme.palette.primary.dark, marginRight: '3px'}} />
                                            <Typography variant="subtitle1" component="div" style={{color: '#ffffffb3', fontSize: 14}}>
                                                {dateStr}
                                            </Typography>
                                        </Box>
                                    )}
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                </Grid>
            )})}
        </Grid>
    )
}