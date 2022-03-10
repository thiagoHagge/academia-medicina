import { useState } from 'react';

import ReadPage from '../../src/patterns/ReadPage';
import api from '../../src/api';

export default function ReadNews({link = '', title = '', content = '', error = false, image = null}) {
    return (
        <ReadPage 
        title={title}
        error={error}
        link={link}
        content={content}
        image={image}
        />
    )
}
ReadNews.getInitialProps = async ({query}) => {
    return api.get(`news/get/${query.slug}`).then(res => {
        // console.log(res)
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