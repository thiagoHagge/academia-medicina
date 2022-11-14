import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import IconButton from '@mui/material/IconButton';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import theme from '../themes';
export default function NewsList({ news = [], admin = '', video = false, podcasts = false, podcastEditable = false, containerSx = {}, itemXs = 0, itemSm = 0, itemMd = 0, noImage = false, align = 'center', children, width = 0 }) {
    const [imgHeight , setImgHeight] = useState(0);
    const imgRef = useRef(null);
    useEffect(() => {
        // console.log(imgRef.current);
        if (imgRef.current) {
            setImgHeight(imgRef.current.width*0.75)
            window.addEventListener("resize", () => setImgHeight(imgRef.current.width*0.75), false);
        }
    }, [imgRef])
    dynamic(() => {
    }, {
        ssr: false
    })  
    return (
        <Grid container spacing={2} sx={containerSx}>
            {children}
            {news.map(item => {
                let date = new Date(Date.parse(item.updated.replace(/\s/, 'T')))
                // console.log(date)
                const month = [
                    'Jan',
                    'Fev',
                    'Mar',
                    'Abr',
                    'Mai',
                    'Jun',
                    'Jul',
                    'Ago',
                    'Set',
                    'Out',
                    'Nov',
                    'Dez'
                ]
                // console.log(date, date.getDay())
                let dateStr = `${date.getDate()} de ${month[date.getMonth()]} de ${date.getFullYear()}`
                return (
                // TODO: criar componente da news box e alinhas com botão de novo item
                <Grid item xs={itemXs === 0 ? 12 : itemXs} sm={itemSm === 0 ? 6 : itemSm} md={itemMd === 0 ? 3 : itemMd} key={item.image + item.title} sx={{alignSelf: 'stretch', justifySelf: 'stretch'}}>
                    <Card sx={[{mt: 2, margin: align == 'center' ? '0 auto 0' : '0'}, !podcasts && {maxWidth: 345}]}>
                        {!podcasts ? <Link href={`${admin}/${podcastEditable ? 'podcasts' : video ? 'videos' : 'noticias'}/${item.link}`} passHref>
                            <CardActionArea>
                                {(video || item.image) && !noImage && <CardMedia
                                component="img"
                                image={video ? `https://i.ytimg.com/vi/${item.ytId}/hqdefault.jpg` : item.image}
                                alt=""
                                ref={imgRef}
                                sx={{height: imgHeight}}
                                />}
                                <CardContent 
                                sx={{ 
                                    flex: '1 0 auto', 
                                    backgroundColor: '#121212', 
                                    borderRadius: '0 0 4px 4px', 
                                    pt: 2,
                                    pb: 1, 
                                    minHeight: 90, 
                                    display: 'flex', 
                                    flexDirection: !podcasts ? 'column' : 'row', 
                                    justifyContent: 'center', 
                                    alignItems: !podcasts ? 'flex-start' : 'center',
                                }}>
                                    {<Typography 
                                    gutterBottom 
                                    component="div" 
                                    variant="h5" 
                                    style={{
                                        color: '#fff', 
                                        fontSize: 15, 
                                        marginBottom: podcasts ? 0 : '0.35em', 
                                        overflowWrap: 'break-word',
                                        fontFamily: "'Arial Black', 'Arial Bold', Gadget, sans-serif",
                                        width: '100%' 
                                    }}>
                                        {item.title}
                                    </Typography>}
                                    {!video && !podcasts && (
                                        <Box sx={{color: '#ffffffb3', display: 'flex'}}>
                                            <CalendarMonthRoundedIcon sx={{color: theme.palette.primary.dark, marginRight: '3px'}} />
                                            <Typography variant="subtitle1" component="div" style={{color: '#ffffffb3', fontSize: 14}}>
                                                {dateStr}
                                            </Typography>
                                        </Box>
                                    )}
                                    {podcasts && <Link href={item.podcast} passHref>
                                        <IconButton sx={{color: theme.palette.primary.main, marginRight: '3px'}}>
                                            <PlayCircleFilledRoundedIcon />
                                        </IconButton>
                                    </Link>}
                                </CardContent>
                            </CardActionArea>
                        </Link> : <CardContent sx={{ flex: '1 1 auto', backgroundColor: '#121212', borderRadius: '0 0 4px 4px', pb: 0, minHeight: 90, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                            {<Typography gutterBottom component="div" variant="h5" style={{whiteSpace: 'pre-wrap', color: '#fff', fontSize: 15, lineHeight: 1, marginBottom: podcasts ? 0 : '0.35em' }}>
                                {item.title}
                            </Typography>}
                            {!video && !podcasts && (
                                <Box sx={{color: '#ffffffb3', display: 'flex'}}>
                                    <CalendarMonthRoundedIcon sx={{color: theme.palette.primary.dark, marginRight: '3px'}} />
                                    <Typography variant="subtitle1" component="div" style={{color: '#ffffffb3', fontSize: 14}}>
                                        {dateStr}
                                    </Typography>
                                </Box>
                            )}
                            {podcasts && <a href={item.podcast} target="_blank">
                                <IconButton sx={{color: theme.palette.primary.main, marginRight: '3px'}}>
                                    <PlayCircleFilledRoundedIcon />
                                </IconButton>
                            </a>}
                        </CardContent>}
                    </Card>
                </Grid>
            )})}
        </Grid>
    )
}