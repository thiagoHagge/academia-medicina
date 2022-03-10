import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Layout from '../../src/patterns/Layout';

export default function ReadPage({link = '', title = '', content = '', error = false, image = null, video = null}) {
    var formattedContent = [];
    // prepare videos to be displayed
    (function() {
        let i = 0;
        let cutStart = content.search('<figure class="media"><oembed url="') 
        let cutEnd;
        while (cutStart > 0) {
            // get paragraph before video
            formattedContent[i++] = content.slice(0, cutStart)
            // remove tags before video
            content = content.replace('<figure class="media"><oembed url="', '')
            
            // get url of video
            cutEnd = content.search('"></oembed></figure>')
            let url = content.slice(cutStart, cutEnd)
            content = content.replace(url, '')
            formattedContent[i++] = `{#url}${url}`
    
            // remove tags after video
            content = content.replace('"></oembed></figure>', '')
            cutStart = content.search('<figure class="media"><oembed url="')
            
        }
        // get paragraph after video
        formattedContent[i++] = content.slice(cutEnd, content.length)
    })()
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
                style={{margin: 'auto', maxWidth: '100%', maxHeight: 315}}
                src={`https://www.youtube.com/embed/${video}`} 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
                >
                </iframe>}
                {/* TODO: trata pra não aparece url ao subir 2 videos */}
                {formattedContent != [] ? 
                    formattedContent.map((p) => {
                        if (p.slice(0, 6) == '{#url}') {
                            return (
                                <iframe 
                                style={{margin: 'auto', maxWidth: '100%', maxHeight: 315}}
                                src={p.slice(6, p.length).replace('watch?v=', 'embed/')} 
                                title="YouTube video player" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen
                                >
                                </iframe>
                            )
                        }
                        return <div dangerouslySetInnerHTML={{__html: p}} />
                    }) : 
                    <div dangerouslySetInnerHTML={{__html: content}} />
                }
            </Box>
        </Layout>
    )
}