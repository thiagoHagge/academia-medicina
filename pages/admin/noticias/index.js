import ListPage from '../../../src/patterns/ListPage';
import api from '../../../src/api';

export default function NoticiasAdmin({news = [], pages = []}) {
    return (
        <ListPage pages={pages} news={news} slug="noticias"/>
    )
}

export async function getStaticProps() {
    const pages = await api.get('/getPages').then(res => res.data.pages)
	return api.get('news/get').then(res => {
        if(!res.data.success) return
        return {
            props: {
                pages: pages,
                news: res.data.news
            },
            revalidate: 10
        }
    })
}