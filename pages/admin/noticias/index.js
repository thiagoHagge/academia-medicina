import ListPage from '../../../src/patterns/ListPage';
import api from '../../../src/api';

export default function NoticiasAdmin({news = []}) {
    return (
        <ListPage news={news} slug="noticias"/>
    )
}

Noticias.getInitialProps = async () => {
    return api.get('news/get').then(res => {
        if(!res.data.success) return {news: []}
        return {
            news: res.data.news
        }
    })
}