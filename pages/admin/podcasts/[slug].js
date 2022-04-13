import CreatePage from '../../../src/patterns/CreatePage';
import api from '../../../src/api';

export default function VideoEditor({id = 0, oldLink = '', oldTitle = '', oldContent = '', oldPodcast = '', error = false, pages={pages}, contact = {}}) {
    return (
        <CreatePage
        id={id}
        slug="podcasts"
        oldLink={oldLink} 
        oldTitle={oldTitle}
        oldContent={oldContent}
        oldPodcast={oldPodcast}
        error={error}
        components={['link']}
        pages={pages}
        podcast
        contact={contact}
        />
    )
}
export async function getServerSideProps({query}) {
    const {pages, contact} = await api.get('/getPages').then(res => res.data)
    if (query.slug == 'new') {
        return {
            props: {
                pages: pages,
                oldLink: query.slug,
                oldTitle: '',
                oldContent: '',
                id: 0,
                contact: contact
            },
        }
    }
    return api.get(`podcasts/get/${query.slug}`).then(res => {
        // console.log(res.data)
        if(res.data.success && res.data.news != null) {
            return {
                props: {
                    pages: pages,
                    oldTitle: res.data.news.title,
                    oldContent: res.data.news.content,
                    oldPodcast: res.data.news.podcast,
                    id: res.data.news.id,
                    contact: contact
                }
            }
        } 
        return {
            props: {
                pages: pages,
                error: res.data.error || true,
                oldLink: query.slug,
                contact: contact
            }
        }
    })
}