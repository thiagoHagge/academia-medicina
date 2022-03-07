import Layout from "../../src/patterns/Layout";
import News from "../../src/patterns/News";
import api from "../../src/api";
import Videos from "../../src/patterns/Videos";

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
            <Videos videos={videos} />
        </Layout>
    )
}