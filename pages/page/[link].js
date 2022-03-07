import Layout from '../../src/patterns/Layout';
import api from '../../src/api';

// TODO: aplicar getStaticPath para páginas importantes 
export async function getServerSideProps(context) {
    const { link } = context.query;
    const { data } = await api.get(`getContent/${link}`);
    if (data.success) {
        return {
            props: {
                content: data.content,
                title: data.title,
            },
        };

    } 
}

export default function Index({content, title}) {
    // get link from url
    
	return (
        <>
		    <Layout title={title}>
                <div dangerouslySetInnerHTML={{__html: content}} />
            </Layout>
        </>
	)
}