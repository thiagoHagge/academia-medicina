import { useState } from 'react';
import { useRouter } from 'next/router'
import FormData from 'form-data'
import TextField from '@mui/material/TextField';
import Form from 'react-bootstrap/Form';

import Layout from '../../../src/patterns/Layout';
import CKEditor from '../../../src/components/CKeditor';
import { UpdateButton } from '../../../src/components/UpdateButton';
import api from '../../../src/api';

export default function NewsEditor({link, oldTitle, oldContent}) {
    const [title, setTitle] = useState(oldTitle);
    const [content, setContent] = useState(oldContent);
    const [image, setImage] = useState(null);
    const [isButtonEnable, setIsButtonEnable] = useState(false)

    const router = useRouter()

    const sendRequest = () => {
        let data = {}
        if (image == null) {
            if(link!='new') {
                data = { title, content, link }
            } else {
                data = { title, content }
            }
        } else {
            data = new FormData();
            data.append('image', image);
            data.append('title', title);
            data.append('content', content);
            if(link!='new') {
                data.append('link', link);
            }
        }
        api.post('news/new', data).then(res => {
            // TODO: show error message
            if(!res.data.success) return
            setIsButtonEnable(false)
            if(res.data.link != link)
                router.push(`/admin/noticias/${res.data.link}`)

        })
    }
    
    return (
        <Layout navbarEditable>
            <TextField 
            label="Título" 
            variant="outlined" 
            fullWidth 
            sx={{mb: 2}} 
            value={title}
            onChange={(e) => {
                setTitle(e.target.value)
                setIsButtonEnable(true)
            }}
            />
            {/* TODO: mostrar imagem antiga */}
            <Form.Group controlId="image" className="mb-3">
                <Form.Control type="file" accept="image/*" onChange={(event) => {
                    setImage(event.target.files[0])}} />
            </Form.Group>
            <CKEditor 
            data={content}
            onChange={(event, editor) => {
                setContent(editor.getData());
                setIsButtonEnable(true)
            }}
            />
            <UpdateButton enable={isButtonEnable} onClick={sendRequest} />
        </Layout>
    )
}
NewsEditor.getInitialProps = async ({query}) => {
    if (query.slug == 'new') {
        return {
            oldTitle: '',
            oldContent: ''
        }
    }
    return api.get(`news/get/${query.slug}`).then(res => {
        console.log(res.data.news)
        return {
            link: query.slug,
            oldTitle: res.data.news.title,
            oldContent: res.data.news.content
        }
    })
}