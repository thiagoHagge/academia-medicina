import { useRef, useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import News from "../../src/patterns/News";

import Layout from '../../src/patterns/Layout';

export default function ReadPage({
    link = '', 
    title = '', 
    content = '', 
    error = false, 
    image = null, 
    video = null, 
    lastItems = [], 
    page = false, 
    pages = [],
    contact = {}
}) {
    const videoRef = useRef(null);
    const contentRef = useRef(null);
    const [videoHeight, setVideoHeight] = useState(0);
    const [videoInContentHeight, setVideoInContentHeight] = useState(0);
    var formattedContent = [];
    // prepare videos to be displayed
    (function() {
        let i = 0;
        // console.log('content', content)
        let cutStart = content.search('<figure class="media"><oembed url="') 
        let cutEnd;
        let firstCut = cutStart
        // console.log('cutStart', cutStart)
        while (cutStart > -1) {
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
        if (firstCut > 0) {
            formattedContent[i++] = content.slice(cutEnd, content.length)
        }
    })()
    useEffect(() => {
        if (videoRef.current) {
            setVideoHeight(videoRef.current.offsetWidth * 0.5625)
        }
    }, [videoRef.current])
    useEffect(() => {
        if (contentRef.current) {
            setVideoInContentHeight(contentRef.current.offsetWidth* 0.5625)
        }
    }, [contentRef.current])
    // console.log('content', content)
    // console.log('formattedContent', formattedContent)
    // console.log('formattedContent ?', formattedContent ? 'true' : 'false')
    return (
        <Layout title={title} error={error} pages={pages} contact={contact}>
            <Grid container spacing={2} sx={{px: {xs: 0, md: 7}}}>
                <Grid item ref={contentRef} xs={12} md={!page ? 8 : 12} sx={{display: 'block'}}>
                    <Typography variant="h4" gutterBottom sx={{textAlign: 'center', mb: 3}}>
                        {title}
                    </Typography>
                    {image != null && <div style={{width: '100%', textAlign: 'center'}}><img 
                    src={image}
                    style={{height: 'auto', maxWidth: '100%', margin: '0 auto 12px'}}
                    /></div>}
                    {video != null && <iframe
                    ref={videoRef}
                    style={{width: '100%', height: videoHeight}}
                    src={`https://www.youtube.com/embed/${video}`} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    >
                    </iframe>}
                    {/* TODO: trata pra não aparece url ao subir 2 videos */}
                    {formattedContent.length > 0 ? 
                        formattedContent.map((p, i) => {
                            // console.log(p)
                            if (p.slice(0, 6) == '{#url}') {
                                return (
                                    <iframe 
                                    style={{margin: 'auto', width: '100%', height: videoInContentHeight}}
                                    src={p.slice(6, p.length).replace('watch?v=', 'embed/').split('&')[0]} 
                                    title="YouTube video player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                    key={`video-${i}`}
                                    >
                                    </iframe>
                                )
                            }
                            return <div key={`paragraph-${i}`}><div dangerouslySetInnerHTML={{__html: p}} /></div>
                        }) : 
                        <div dangerouslySetInnerHTML={{__html: content}} />
                    }
                </Grid>
                {!page && <Grid item xs={12} md={4}>
                    <Typography variant="h6" gutterBottom sx={{mb: 3}}>
                        {`${video != null ? 'Últimos vídeos' : 'Últimas notícias'}:`}
                    </Typography>
                    <News 
                    news={lastItems} 
                    containerSx={{display: 'flex', flexDirection: {xs: 'row', md:'column'}, width: '100%'}} 
                    itemSm={6}
                    itemMd={12}
                    lastNews
                    noImage
                    algin="start"
                    video={video}
                    />
                </Grid>}
            </Grid>
        </Layout>
    )
}