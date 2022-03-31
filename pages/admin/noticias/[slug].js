import CreatePage from '../../../src/patterns/CreatePage';
import api from '../../../src/api';

export default function NewsEditor({id = 0, oldLink = '', oldTitle = '', oldContent = '', oldAuthor = '', error = false, oldImage = null}) {
    return (
        <CreatePage
        id={id}
        slug="noticias"
        oldLink={oldLink} 
        oldTitle={oldTitle}
        oldContent={oldContent}
        oldAuthor={oldAuthor}
        error={error}
        oldImage={oldImage}
        components={['title', 'file', 'author', 'content']}
        />
    )
}
NewsEditor.getInitialProps = async ({query}) => {
    if (query.slug == 'new') {
        return {
            oldLink: query.slug,
            oldTitle: '',
            oldContent: '',
            id: 0
        }
    }
    return api.get(`news/get/${query.slug}`).then(res => {
        // console.log(res.data)
        if(res.data.success && res.data.news != null) {
            return {
                oldLink: query.slug,
                oldTitle: res.data.news.title,
                oldImage: res.data.news.image,
                oldContent: res.data.news.content,
                oldAuthor: res.data.news.author,
                id: res.data.news.id
            }
        }
        return {
            error: res.data.error || true,
            oldLink: query.slug,
        }
    })
}