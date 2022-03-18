import Layout from "../../src/patterns/Layout";
import Typography from '@mui/material/Typography';
import News from "../../src/patterns/News";
import api from "../../src/api";

export default function Noticias({news = []}) {
    return (
        <Layout title="Notícias">
            <Typography component="span" variant="h5">
                Notícias
            </Typography>
            <News news={news} />
        </Layout>
    )
}

Noticias.getInitialProps = async () => {
    return api.get('/news/get').then(res => {
        if (!res.data.success) return;
        return {
            news: res.data.news
        };
    })
}
