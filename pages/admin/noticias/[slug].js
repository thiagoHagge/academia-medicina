import { useState } from 'react';
import { useRouter } from 'next/router'
import FormData from 'form-data'
import TextField from '@mui/material/TextField';
import Form from 'react-bootstrap/Form';

import Layout from '../../../src/patterns/Layout';
import CKEditor from '../../../src/components/CKeditor';
import { UpdateButton } from '../../../src/components/UpdateButton';
import api from '../../../src/api';
import apiAdmin from '../../../src/api/admin';

export default function NewsEditor({oldLink = '', oldTitle = '', oldContent = '', error = false, oldImage = null}) {
    const [title, setTitle] = useState(oldTitle);
    const [content, setContent] = useState(oldContent);
    const [image, setImage] = useState(null);
    const [isButtonEnable, setIsButtonEnable] = useState(false)
    const [titleError, setTitleError] = useState('')
    const [link, setLink] = useState(oldLink)
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
        apiAdmin.post('news/new', data).then(res => {
            // TODO: show error message
            if(!res.data.success) {
                setTitleError(res.data.error)
                return
            }
            setTitleError('')
            setIsButtonEnable(false)
            console.log(res.data.link)
            if(res.data.link != link) {
                router.push(`/admin/noticias/${res.data.link}`, undefined, { shallow: true })
                setLink(res.data.link)
            } else {
                router.reload(router.asPath)
            }

        })
    }
    
    return (
        <Layout navbarEditable error={error}>
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
            error={titleError !== ''}
            helperText={titleError}
            />
            {/* TODO: mostrar imagem antiga */}
            <Form.Group controlId="image" className="mb-3">
                <Form.Control 
                type="file" 
                accept="image/*" 
                onChange={(event) => {
                    setImage(event.target.files[0])
                    setIsButtonEnable(true)
                }} 
                />
            </Form.Group>
            {oldImage != null && <img 
            alt=""
            src={oldImage} 
            style={{maxWidth: '100%', marginBottom: '1rem'}}
            />}
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
            oldLink: query.slug,
            oldTitle: '',
            oldContent: ''
        }
    }
    return api.get(`news/get/${query.slug}`).then(res => {
        console.log(res)
        if(res.data.success && res.data.news != null) {
            return {
                oldLink: query.slug,
                oldTitle: res.data.news.title,
                oldImage: res.data.news.image,
                oldContent: res.data.news.content
            }
        }
        return {
            error: res.data.error || true,
            oldLink: query.slug,
        }
    })
}