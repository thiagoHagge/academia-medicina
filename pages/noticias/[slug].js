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
export async function getServerSideProps(context) {
    const data = await api.get(`news/get/${context.query.slug}`).then(res => res.data)
    console.log(data)
    const {pages, contact} = await api.get('/getPages').then(res => res.data)
	return {
		props: {
			link: context.query.slug,
            title: data.news.title,
            image: data.news.image,
            content: data.news.content,
            lastNews: data.lastNews,
            pages: pages,
            contact: contact
		}
	}
}