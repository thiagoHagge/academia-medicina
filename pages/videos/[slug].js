import { useState } from 'react';

import ReadPage from '../../src/patterns/ReadPage';
import api from '../../src/api';

export default function ReadVideos({link = '', title = '', content = '', error = false, image = null, ytId = ''}) {
    return (
        <ReadPage 
        title={title}
        erraor={error}
        link={link}
        content={content}
        video={ytId}
        />
    )
}
ReadVideos.getInitialProps = async ({query}) => {
    return api.get(`videos/get/${query.slug}`).then(res => {
        console.log(res)
        if(res.data.success && res.data.news != null) {
            return {
                link: query.slug,
                title: res.data.news.title,
                image: res.data.news.image,
                content: res.data.news.content,
                ytId: res.data.news.ytId
            }
        }
        return {
            error: res.data.error || true,
            link: query.slug,
        }
    })
}