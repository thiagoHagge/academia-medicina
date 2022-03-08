import ListPage from '../../../src/patterns/ListPage';
import api from '../../../src/api';

export default function NoticiasAdmin({news = []}) {
    return (
        <ListPage news={news} slug="noticias"/>
    )
}

NoticiasAdmin.getInitialProps = async () => {
    return api.get('news/get').then(res => {
        if(!res.data.success) return
        return {
            news: res.data.news
        }
    })
}