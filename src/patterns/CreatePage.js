import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import FormData from 'form-data'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import dynamic from 'next/dynamic';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import IconButton from '@mui/material/IconButton';

import Layout from './Layout';
import ActionLine from '../patterns/ActionLine';
import api from '../api';
import { useAuth } from '../contexts/auth';

const CKeditor = dynamic(() => import('../components/CKeditor'), {
    ssr: false
})  
export default function CreatePage({
    id = 0, 
    slug, 
    oldLink = '', 
    oldTitle = '', 
    oldContent = '', 
    oldAuthor = '', 
    oldYtId = '',
    oldPodcast = '',
    podcast = false,
    error = false, 
    oldImage = null, 
    components = [],
    pages = [],
    contact = {}
}) {
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

    useEffect(() => {
        if (oldYtId != '') {
            setVideoLink(`https://www.youtube.com/watch?v=${oldYtId}`)
        }
        if (oldPodcast != '') {
            setVideoLink(oldPodcast)
        }
    })
    const sendRequest = () => {
        let data = {}
        if(podcast) {
            data.podcast = videoLink
        } else if (image == null) {
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
            // Clean values
            setTitleError('')
            setVideoError('')
            setIsButtonEnable(false)
            setImage(null)

            // Redirect if changed the image
            if(res.data.link != link) {
                router.push(`/admin/${slug}/${res.data.link}`, undefined, { shallow: true })
                setLink(res.data.link)
            } else {
                if(image == null) return
                router.reload(router.asPath)
            }
        })
    }

    const deleteAction = () => {
        // FIXME: change parameter allowVideoLink
        if(!confirm(`Tem certeza quer deletar ${slug == 'podcasts' ? 'o podcast' : slug == 'videos' ? 'o vídeo' : 'a notícia'}: ${title}`)) return
        api.delete(`news/delete/${id}`, {
            headers: {
                'X-Token': token
            }
        }).then((res) => {
            if(!res.data.success) return
            router.push(`/admin/${slug}`)
        })
    }

    const hasInput = (input) => {
        return components.indexOf(input) > -1
    }
    return (
        <Layout navbarEditable error={error} pages={pages} contact={contact}>
            <IconButton onClick={() => router.push(`/admin/${slug}`)} sx={{mb:2}}>
                <ArrowBackRoundedIcon />
            </IconButton>
            {hasInput('title') && <TextField 
            label="Título" 
            variant="outlined" 
            inputProps={{ maxLength: 40 }}
            fullWidth 
            sx={{mb: 2}} 
            value={title}
            onChange={(e) => {
                setTitle(e.target.value)
                setIsButtonEnable(true)
            }}
            error={titleError !== ''}
            helperText={titleError}
            />}
            {/* TODO: mostrar imagem antiga */}
            {hasInput('file') && <Form.Group controlId="image" className="mb-3">
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
            {hasInput('author') && <TextField 
            label="Autor" 
            variant="outlined" 
            inputProps={{ maxLength: 191 }}
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
            {hasInput('link') && <TextField 
            label={`Link do ${slug == 'podcasts' ? 'Spotify' : 'Youtube'}`} 
            variant="outlined" 
            inputProps={{ maxLength: 191 }}
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
            {hasInput('content') && <CKeditor 
            data={content}
            onChange={(event, editor) => {
                setContent(editor.getData());
                setIsButtonEnable(true)
            }}
            token={token}
            />}
            <ActionLine enable={isButtonEnable} updateAction={sendRequest} deleteAction={deleteAction} deleteButton={id != 0} />
        </Layout>
    )
}