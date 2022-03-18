import Layout from "../../src/patterns/Layout";
import api from "../../src/api";
import Videos from "../../src/patterns/Videos";
import Typography from '@mui/material/Typography';

export async function getServerSideProps(context) {
    return api.get('/videos/get').then(res => {
        // console.log(res)
        if (!res.data.success) return;
        return {
            props: {
                videos: res.data.news
            }
        };
    })
}

export default function Noticias({videos}) {
    return (
        <Layout title="Vídeos">
            <Typography component="span" variant="h5">
                Vídeos
            </Typography>
            <Videos videos={videos} />
        </Layout>
    )
}