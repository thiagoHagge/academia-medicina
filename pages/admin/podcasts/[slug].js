import CreatePage from '../../../src/patterns/CreatePage';
import api from '../../../src/api';

export default function VideoEditor({oldLink = '', oldTitle = '', oldContent = '', oldPodcast = '', error = false, pages={pages}}) {
    return (
        <CreatePage
        slug="podcasts"
        oldLink={oldLink} 
        oldTitle={oldTitle}
        oldContent={oldContent}
        oldPodcast={oldPodcast}
        error={error}
        components={['link']}
        pages={pages}
        podcast
        />
    )
}
export async function getServerSideProps({query}) {
    const pages = await api.get('/getPages').then(res => res.data.pages)
    if (query.slug == 'new') {
        return {
            props: {
                pages: pages,
                oldLink: query.slug,
                oldTitle: '',
                oldContent: '',
                id: 0
            },
        }
    }
    return api.get(`podcasts/get/${query.slug}`).then(res => {
        console.log(res.data)
        if(res.data.success && res.data.news != null) {
            return {
                props: {
                    pages: pages,
                    oldTitle: res.data.news.title,
                    oldContent: res.data.news.content,
                    oldPodcast: res.data.news.podcast
                }
            }
        }
        return {
            props: {
                pages: pages,
                error: res.data.error || true,
                oldLink: query.slug,
            }
        }
    })
}