import ReadPage from '../../src/patterns/ReadPage';
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
        <ReadPage 
        title={title}
        content={content}
        />
	)
}