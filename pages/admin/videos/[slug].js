import CreatePage from '../../../src/patterns/CreatePage';
import api from '../../../src/api';

export default function VideoEditor({oldLink = '', oldTitle = '', oldContent = '', error = false}) {
    return (
        <CreatePage
        slug="videos"
        oldTitle={oldTitle}
        oldContent={oldContent}
        error={error}
        components={['title', 'link', 'content']}
        />
    )
}
VideoEditor.getInitialProps = async ({query}) => {
    if (query.slug == 'new') {
        return {
            oldLink: query.slug,
            oldTitle: '',
            oldContent: ''
        }
    }
    return api.get(`videos/get/${query.slug}`).then(res => {
        // console.log(res)
        if(res.data.success && res.data.news != null) {
            return {
                oldLink: query.slug,
                oldTitle: res.data.news.title,
                oldContent: res.data.news.content
            }
        }
        return {
            error: res.data.error || true,
            oldLink: query.slug,
        }
    })
}