import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import Layout from '../../../src/patterns/Layout';
import CKEditor from '../../../src/components/CKeditor';
import { UpdateButton } from '../../../src/components/UpdateButton';
import api from '../../../src/api';

export async function getServerSideProps(context) {
    const { link } = context.query;
    return api.get(`getContent/${link}`).then(res => {
        // TODO: tratar erro
        // console.log('res', res.data)
        if (res.data.success) {
            return {
                props: {
                    oldContent: res.data.content == null ? '' : res.data.content,
                    // wasButtonEnabled: false
                }
            }
        } else {
            return {
                props: {
                    error: 'Página não encontrada',
                }
            }
        }
    })
}

export default function PageEdit({ oldContent = '', error = false }) {

    const [content, setContent] = useState(oldContent);
    const [isButtonEnable, setIsButtonEnable] = useState(false)

    const editorRef = useRef()

    const router = useRouter()

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
        <Layout navbarEditable error={error}>
            {!notFound && (
                <>
                    <CKEditor
                        data={content}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setContent(data);
                            setIsButtonEnable(true)
                        }}
                    />
                    <UpdateButton onClick={updateContent} enable={isButtonEnable} />
                </>
            )}
        </Layout>
    )
}