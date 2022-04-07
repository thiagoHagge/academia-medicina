import ListPage from '../../../src/patterns/ListPage';
import api from '../../../src/api';

export default function NoticiasAdmin({news = [], pages = [], contact = {}}) {
    return (
        <ListPage pages={pages} contact={contact} news={news} slug="noticias"/>
    )
}

export async function getStaticProps() {
    const {pages, contact} = await api.get('/getPages').then(res => res.data)
	return api.get('news/get').then(res => {
        if(!res.data.success) return
        return {
            props: {
                pages: pages,
                contact: contact,
                news: res.data.news
            },
            revalidate: 10
        }
    })
}