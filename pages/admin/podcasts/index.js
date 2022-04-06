import ListPage from '../../../src/patterns/ListPage';
import api from '../../../src/api';

export default function NoticiasAdmin({news = [], pages = []}) {
    return (
        <ListPage 
        news={news} 
        slug="noticias" 
        podcast
        pages={pages}
        />
    )
}

export async function getStaticProps() {
    const pages = await api.get('/getPages').then(res => res.data.pages)
	return api.get('podcasts/get').then(res => {
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