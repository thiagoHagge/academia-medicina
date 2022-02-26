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
            },
        };

    } 
}

export default function Index({content}) {
    // get link from url
    
	return (
        <>
		    <Layout>
                <div dangerouslySetInnerHTML={{__html: content}} />
            </Layout>
        </>
	)
}