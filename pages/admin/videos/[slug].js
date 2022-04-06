import CreatePage from '../../../src/patterns/CreatePage';
import api from '../../../src/api';

export default function VideoEditor({oldLink = '', oldTitle = '', oldContent = '', oldYtId = '', error = false, pages = []}) {
    return (
        <CreatePage
        slug="videos"
        oldTitle={oldTitle}
        oldContent={oldContent}
        oldYtId={oldYtId}
        error={error}
        components={['title', 'link', 'content']}
        pages={pages}
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
            },
        }
    }
    return api.get(`videos/get/${query.slug}`).then(res => {
        // console.log(res.data)
        // console.log(res.data.news)
        if(res.data.success && res.data.news != null) {
            return {
                props: {
                    pages: pages,
                    oldLink: query.slug,
                    oldTitle: res.data.news.title,
                    oldContent: res.data.news.content,
                    oldYtId: res.data.news.ytId,
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
