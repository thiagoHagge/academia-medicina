import Layout from "../../src/patterns/Layout";
import Typography from '@mui/material/Typography';
import News from "../../src/patterns/News";
import api from "../../src/api";

export default function Noticias({news = [], pages = []}) {
    return (
        <Layout title="Notícias" pages={pages}>
            <Typography component="span" variant="h5">
                Notícias
            </Typography>
            <News news={news} />
        </Layout>
    )
}

export async function getStaticProps(context) {
    const pages = await api.get('/getPages').then(res => res.data.pages)
    return api.get('/news/get').then(res => {
        if (!res.data.success) return
        return {
            props: {
                news: res.data.news,
                pages: pages
            }
        }
    })
}