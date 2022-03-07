import { useState } from 'react';
import { useRouter } from 'next/router'
import FormData from 'form-data'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';

import Layout from './Layout';
import CKEditor from '../components/CKeditor';
import ActionLine from '../patterns/ActionLine';
import api from '../api';
import { useAuth } from '../contexts/auth';

export default function CreatePage({id = 0, slug, oldLink = '', oldTitle = '', oldContent = '', oldAuthor = '', error = false, oldImage = null, allowImage = false, allowVideoLink = false, allowAuthor = false}) {
    const [title, setTitle] = useState(oldTitle);
    const [author, setAuthor] = useState(oldAuthor);
    const [videoLink, setVideoLink] = useState('');
    const [content, setContent] = useState(oldContent);
    const [image, setImage] = useState(null);
    const [isButtonEnable, setIsButtonEnable] = useState(false)
    const [titleError, setTitleError] = useState('')
    const [videoError, setVideoError] = useState('')
    const [link, setLink] = useState(oldLink)
    const router = useRouter()
    const { token } = useAuth();

    const sendRequest = () => {
        let data = {}
        if (image == null) {
            data.title = title
            data.content = content
            if(link!='new') {
                data.link = link
            }
            if(videoLink!=''){
                data.videoLink = videoLink
            }
            if(author!=''){
                data.author = author
            }
        } else {
            data = new FormData();
            data.append('image', image);
            data.append('title', title);
            data.append('content', content);
            if(link!='new') {
                data.append('link', link);
            }
            if(author != '') {
                data.append('author', author)
            }
        }
        api.post('news/new', data, {
            headers: {
                'X-Token': token
            }
        }).then(res => {
            // TODO: show error message
            if(!res.data.success) {
                if(res.data.error.component == 'title'){
                    setTitleError(res.data.error.message)
                }
                if(res.data.error.component == 'video'){
                    setVideoError(res.data.error.message)
                }
                return
            }
            setTitleError('')
            setVideoError('')
            setIsButtonEnable(false)
            console.log(res.data.link)
            if(res.data.link != link) {
                router.push(`/admin/${slug}/${res.data.link}`, undefined, { shallow: true })
                setLink(res.data.link)
            } else {
                router.reload(router.asPath)
            }

        })
    }

    const deleteAction = () => {
        if(!confirm(`Tem certeza quer deletar ${allowVideoLink ? 'o vídeo' : 'a notícia'}: ${title}`)) return
        api.delete(`news/delete/${id}`, {
            headers: {
                'X-Token': token
            }
        }).then((res) => {
            if(!res.data.success) return
            router.push(`/admin/${slug}`)
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
            {allowImage && <Form.Group controlId="image" className="mb-3">
                <Form.Control 
                type="file" 
                accept="image/*" 
                onChange={(event) => {
                    setImage(event.target.files[0])
                    setIsButtonEnable(true)
                }} 
                />
            </Form.Group>}
            {oldImage != null && <img 
            alt=""
            src={oldImage} 
            style={{maxWidth: '100%', marginBottom: '1rem', maxHeight: 200}}
            />}
            {allowAuthor && <TextField 
            label="Autor" 
            variant="outlined" 
            fullWidth 
            sx={{mb: 2}} 
            value={author}
            onChange={(e) => {
                setAuthor(e.target.value)
                setIsButtonEnable(true)
            }}
            // error={videoError !== ''}
            // helperText={videoError}
            />}
            {allowVideoLink && <TextField 
            label="Link do Youtube" 
            variant="outlined" 
            fullWidth 
            sx={{mb: 2}} 
            value={videoLink}
            onChange={(e) => {
                setVideoLink(e.target.value)
                setIsButtonEnable(true)
            }}
            error={videoError !== ''}
            helperText={videoError}
            />}
            <CKEditor 
            data={content}
            onChange={(event, editor) => {
                setContent(editor.getData());
                setIsButtonEnable(true)
            }}
            />
            <ActionLine enable={isButtonEnable} updateAction={sendRequest} deleteAction={deleteAction} deleteButton={id != 0} />
        </Layout>
    )
}