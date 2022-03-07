import Layout from "../../src/patterns/Layout";
import News from "../../src/patterns/News";
import api from "../../src/api";

export async function getServerSideProps(context) {
    return api.get('/news/get').then(res => {
        // console.log(res)
        if (!res.data.success) return;
        return {
            props: {
                news: res.data.news
            }
        };
    })
}

export default function Noticias({news}) {
    return (
        <Layout title="Notícias">
            <News news={news} />
        </Layout>
    )
}