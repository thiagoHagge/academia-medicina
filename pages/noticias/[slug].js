import { useState } from 'react';
import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography';

import Layout from '../../src/patterns/Layout';
import api from '../../src/api';

export default function NewsEditor({link = '', title = '', content = '', error = false, image = null}) {
    const router = useRouter()
    
    return (
        <Layout error={error}>
            <Typography variant="h4" gutterBottom sx={{textAlign: 'center'}}>
                {title}
            </Typography>
            <img 
            alt=""
            src={`${process.env.URL_API}images/${image}`}
            style={{margin: 'auto'}}
            />
            <div dangerouslySetInnerHTML={{__html: content}} />

        </Layout>
    )
}
NewsEditor.getInitialProps = async ({query}) => {
    return api.get(`news/get/${query.slug}`).then(res => {
        console.log(res)
        if(res.data.success && res.data.news != null) {
            return {
                link: query.slug,
                title: res.data.news.title,
                image: res.data.news.image,
                content: res.data.news.content
            }
        }
        return {
            error: res.data.error || true,
            link: query.slug,
        }
    })
}