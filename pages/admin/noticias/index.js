import ListPage from '../../../src/patterns/ListPage';
import api from '../../../src/api';

export default function Noticias({news}) {
    return (
        <ListPage news={news} slug="noticias"/>
    )
}

Noticias.getInitialProps = async () => {
    return api.get('news/get').then(res => {
        return {
            props: {
                news: res.data.news
            }
        }
    })
}