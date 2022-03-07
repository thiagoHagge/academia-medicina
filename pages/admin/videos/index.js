import ListPage from '../../../src/patterns/ListPage';
import api from '../../../src/api';

export default function Videos({news = []}) {
    return (
        <ListPage news={news} slug="videos" video/>
    )
}

Videos.getInitialProps = async () => {
    return api.get('videos/get').then(res => {
        return {
            news: res.data.news
        }
    })
}