import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Layout from '../../src/patterns/Layout';

export default function ReadPage({link = '', title = '', content = '', error = false, image = null, video = null}) {
    const router = useRouter()
    
    return (
        <Layout title={title} error={error}>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography variant="h4" gutterBottom sx={{textAlign: 'center', mb: 3}}>
                    {title}
                </Typography>
                {image != null && <img 
                src={image}
                style={{margin: 'auto', maxWidth: '100%', maxHeight: 300}}
                />}
                {video != null && <iframe 
                width="560" 
                height="315" 
                src={`https://www.youtube.com/embed/${video}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>}
                <div dangerouslySetInnerHTML={{__html: content}} />
            </Box>
        </Layout>
    )
}