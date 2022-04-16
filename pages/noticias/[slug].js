import { useState } from 'react';

import ReadPage from '../../src/patterns/ReadPage';
import api from '../../src/api';

export default function ReadNews({
    link = '', 
    title = '', 
    content = '', 
    error = false, 
    image = null, 
    lastNews = [], 
    pages = [], 
    contact = {}
}) {
    // console.log(content)
    return (
        <ReadPage 
        title={title}
        error={error}
        link={link}
        content={content}
        image={image}
        lastItems={lastNews}
        pages={pages}
        contact={contact}
        />
    )
}

export async function getStaticPaths() {
    const news = await api.get('news/get').then(res => res.data.news);
    let paths = news.map(item =>  {
        return {'params': {'slug': item.link}}
    })
    // console.log({
    //     paths: paths,
    //     fallback: false
    // })
    return {
        paths: paths,
        fallback: true
    }
}
export async function getStaticProps(context) {
    const data = await api.get(`news/get/${context.params.slug}`).then(res => res.data)
    // console.log('=====================')
    // console.log(data)
    const {pages, contact} = await api.get('/getPages').then(res => res.data)
	return {
		props: {
			link: context.params.slug,
            title: data.news.title,
            image: data.news.image,
            content: data.news.content,
            lastNews: data.lastNews,
            pages: pages,
            contact: contact
		},
        revalidate: 60
	}
}