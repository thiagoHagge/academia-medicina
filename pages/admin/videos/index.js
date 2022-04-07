import ListPage from '../../../src/patterns/ListPage';
import api from '../../../src/api';

export default function Videos({news = [], pages = [], contact = {}}) {
    return (
        <ListPage news={news} slug="videos" video pages={pages} contact={contact} />
    )
}

export async function getStaticProps() {
    const {pages, contact} = await api.get('/getPages').then(res => res.data)
    return api.get('videos/get').then(res => {
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