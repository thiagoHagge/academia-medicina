import ListPage from '../../../src/patterns/ListPage';
import api from '../../../src/api';

export default function Videos({news = [], pages = []}) {
    return (
        <ListPage news={news} slug="videos" video pages={pages} />
    )
}

export async function getStaticProps() {
    const pages = await api.get('/getPages').then(res => res.data.pages)
    return api.get('videos/get').then(res => {
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