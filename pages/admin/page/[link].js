import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import dynamic from 'next/dynamic'

import Layout from '../../../src/patterns/Layout';
import ActionLine from '../../../src/patterns/ActionLine';
import api from '../../../src/api';
import { useAuth } from '../../../src/contexts/auth';

const CKeditor = dynamic(() => import('../../../src/components/CKeditor'), {
    ssr: false
})  
export async function getServerSideProps(context) {
    const pages = await api.get('/getPages').then(res => res.data.pages)
    const { link } = context.query;
    return api.get(`getContent/${link}`).then(res => {
        // TODO: tratar erro
        // console.log('res', res.data)
        if (res.data.success) {
            return {
                props: {
                    oldContent: res.data.content == null ? '' : res.data.content,
                    pages: pages,
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

export default function PageEdit({ oldContent = '', error = false, pages = [] }) {

    const [content, setContent] = useState(oldContent);
    const [isButtonEnable, setIsButtonEnable] = useState(false)
    const { token } = useAuth();
    const editorRef = useRef()

    const router = useRouter()

    const updateContent = () => {
        const { link } = router.query
        api.put('updatePage', { page: link, content: content }, {
            headers: {
                'X-Token': token
            }
        }).then(res => {
            // TODO: show Loading and ERROR
            if (res.data.success) {
                setIsButtonEnable(false)
            }
        })
    }

    return (
        <Layout navbarEditable error={error} pages={pages}>
            <>
                <CKeditor
                    data={content}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setContent(data);
                        setIsButtonEnable(true)
                    }}
                    token={token}
                />
            <ActionLine onClick={updateContent} enable={isButtonEnable} />
            </>
        </Layout>
    )
}