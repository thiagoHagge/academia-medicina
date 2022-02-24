import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router'
import Button from '@mui/material/Button';

import Layout from '../../../src/patterns/Layout';
import CKEditor from '../../../src/components/CKeditor';
import { UpdateButton } from '../../../src/components/UpdateButton';
import api from '../../../src/api';

export default function PageEdit({ oldContent }) {

    const [content, setContent] = useState(oldContent);
    const [isButtonEnable, setIsButtonEnable] = useState(false)

    const editorRef = useRef()

    const router = useRouter()
    useEffect(() => {
        const { link } = router.query
        // get link from url
        (api.get(`getContent/${link}`).then(res => {
            // TODO: tratar erro
            if (res.data.success) {
                setContent(res.data.content == null ? '' : res.data.content)
                setIsButtonEnable(false)
            }
        }))()
    }, [router])

    const updateContent = () => {
        const { link } = router.query
        api.put('updatePage', { page: link, content: content }).then(res => {
            // TODO: show Loading and ERROR
            if (res.data.success) {
                setIsButtonEnable(false)
            }
        })
    }

    return (
        <Layout navbarEditable>
            <CKEditor
                data={content}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setContent(data);
                    setIsButtonEnable(true)
                }}
            />
            <UpdateButton onClick={updateContent} enable={isButtonEnable} />
        </Layout>
    )
}