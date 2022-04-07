import ReadPage from '../../src/patterns/ReadPage';
import api from '../../src/api';
import { useRouter } from 'next/router'

// TODO: aplicar getStaticPath para páginas importantes 
export async function getServerSideProps(context) {
    const { link } = context.query
    const {pages, contact} = await api.get('/getPages').then(res => res.data)
    const { data } = await api.get(`getContent/${link}`);
    if (data.success) {
        return {
            props: {
                content: data.content,
                title: data.title,
                pages: pages,
                contact: contact
            }
        }
    }
}

export default function Index({content, title, pages = [], contact = {}}) {
    // get link from url
	return (
        <ReadPage 
        title={title}
        content={content}
        page
        pages={pages}
        contact={contact}
        />
	)
}