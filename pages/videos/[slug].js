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

export async function getServerSideProps({query}) {
    const {pages, contact} = await api.get('/getPages').then(res => res.data)
	return api.get(`videos/get/${query.slug}`).then(res => {
        // console.log(res)
        if(res.data.success && res.data.news != null) {
            return {
                props: {
                    link: query.slug,
                    title: res.data.news.title,
                    image: res.data.news.image,
                    content: res.data.news.content,
                    ytId: res.data.news.ytId,
                    lastVideos: res.data.lastVideos,
                    pages: pages,
                    contact: contact
                }
            }
        }
        return {
            props: {
                error: res.data.error || true,
                link: query.slug,
            }
        }
    })
}