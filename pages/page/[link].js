import ReadPage from '../../src/patterns/ReadPage';
import api from '../../src/api';
import { useRouter } from 'next/router'

export async function getStaticPaths() {
    const pages = await api.get('pages/all').then(res => res.data.pages);
    let paths = pages.map(item =>  {
        return {'params': {'link': item.link}}
    })
    return {
        paths: paths,
        fallback: true
    }
}

export async function getStaticProps(context) {
    const { link } = context.params
    const {pages, contact} = await api.get('/getPages').then(res => res.data)
    const { data } = await api.get(`getContent/${link}`);
    if (data.success) {
        return {
            props: {
                content: data.content,
                title: data.title,
                pages: pages,
                contact: contact
            },
            revalidate: 60
        }
    }
}

export default function Index({content, title, pages = [], contact = {}}) {
    // get link from url
	return (
        <ReadPage 
        title={title}
        content={content}
        page
        pages={pages}
        contact={contact}
        />
	)
}