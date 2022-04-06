import Layout from "../../src/patterns/Layout";
import api from "../../src/api";
import Videos from "../../src/patterns/Videos";
import Typography from '@mui/material/Typography';

export async function getStaticProps() {
    const pages = await api.get('/getPages').then(res => res.data.pages)
    return api.get('/videos/get').then(res => {
        if (!res.data.success) return;
        return {
            props: {
                videos: res.data.news,
                pages: pages
            }
        };
    })
}

export default function Noticias({videos, pages = []}) {
    return (
        <Layout title="Vídeos" pages={pages}>
            <Typography component="span" variant="h5">
                Vídeos
            </Typography>
            <Videos videos={videos} />
        </Layout>
    )
}