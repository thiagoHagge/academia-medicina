import Layout from "../../src/patterns/Layout";
import Typography from '@mui/material/Typography';
import News from "../../src/patterns/News";
import api from "../../src/api";

export default function Noticias({news = [], pages = [], contact = {}}) {
    return (
        <Layout title="Notícias" pages={pages} contact={contact}>
            <Typography component="span" variant="h5">
                Notícias
            </Typography>
            <News news={news} />
        </Layout>
    )
}

export async function getStaticProps(context) {
    const {pages, contact} = await api.get('/getPages').then(res => res.data)
    return api.get('/news/get').then(res => {
        if (!res.data.success) return
        return {
            props: {
                news: res.data.news,
                pages: pages,
                contact: contact
            },
            revalidate: 60
        }
    })
}