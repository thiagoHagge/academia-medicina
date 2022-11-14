import { useState } from 'react';

import ReadPage from '../../src/patterns/ReadPage';
import api from '../../src/api';

export default function ReadVideos({
    link = '', 
    title = '', 
    content = '', 
    error = false, 
    image = null, 
    ytId = '', 
    lastVideos = [], 
    pages = [],
    contact = {}
}) {
    return (
        <ReadPage 
        title={title}
        error={error}
        link={link}
        content={content}
        video={ytId}
        lastItems={lastVideos}
        pages={pages}
        contact={contact}
        />
    )
}
export async function getStaticPaths() {
    // const news = await api.get('videos/get').then(res => res.data.news);
    // let paths = news.map(item =>  {
    //     return {'params': {'slug': item.link}}
    // })
    return {
        paths: [],
        fallback: 'blocking'
    }
}
export async function getStaticProps({params}) {
    const {pages, contact} = await api.get('/getPages').then(res => res.data)
	return api.get(`videos/get/${params.slug}`).then(res => {
        // console.log(res)
        if(res.data.success && res.data.news != null) {
            return {
                props: {
                    link: params.slug,
                    title: res.data.news.title,
                    image: res.data.news.image,
                    content: res.data.news.content,
                    ytId: res.data.news.ytId,
                    lastVideos: res.data.lastVideos,
                    pages: pages,
                    contact: contact
                },
                revalidate: 60
            }
        }
        return {
            props: {
                error: res.data.error || true,
                link: params.slug,
            },
            revalidate: 60
        }
    })
}