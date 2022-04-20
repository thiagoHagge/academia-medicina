import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Link from 'next/link';


export default function Videos({videos}) {
    return (
        <Grid 
        container 
        sx={{mt: 2}} 
        spacing={2}
        >
            {videos.map(({link, title, ytId}) => (
                <Grid item xs={12} md={4} key={`vid-${link}`}>
                    <Link href={`/videos/${link}`} passHref>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                image={`https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`}
                                >
                                </CardMedia>
                            </CardActionArea>
                        </Card>
                    </Link>
                </Grid>
            ))}
        </Grid>
    )
}