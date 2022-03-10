import { useState, useEffect, useRef } from 'react';
import FormData from 'form-data'

import api from '../api';

export default function CKeditor({token, ...rest}) {
    const [editorLoaded, setEditorLoaded] = useState(false)
    
    const editorRef = useRef()
    const {CKEditor, CustomEditor} = editorRef.current || {}

    useEffect(() => {
        editorRef.current = {
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
            CustomEditor: require('ckeditor5-custom-build'),
            // Alignment: require('@ckeditor/ckeditor5-alignment/src/alignment')
        }
        setEditorLoaded(true)
    }, [])
    function uploadAdapter(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    let data = new FormData();
                    loader.file.then((file) => {
                        data.append("image", file);
                        api.post('/saveImage', data, {
                            headers: {
                                'X-Token': token
                            }
                        })
                        .then((res) => {
                            resolve({
                                default: res.data.url
                            });
                        })
                        .catch((err) => {
                            reject(err);
                        });
                    });
                });
            }
        };
    }
    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return uploadAdapter(loader);
        };
    }

    return editorLoaded ? (
        <CKEditor
        // TODO: setar altura baseada na altura da tela
        editor={ CustomEditor }
        onReady={(editor) => {
            editor.editing.view.change((writer) => {
                writer.setStyle(
                    "height",
                    "400px",
                    editor.editing.view.document.getRoot()
                );
            });
            editor.editing.view.change((writer) => {
                writer.setStyle(
                    "width",
                    "100%",
                    editor.editing.view.document.getRoot()
                );
            });
        }}
        config={{
            extraPlugins: [uploadPlugin],
            simpleUpload: {
                uploadUrl: `${process.env.URL_API}api/`,
                withCredentials: true,
                headers: {
                    'X-TOKEN': token
                }    
            }
        }}
        {...rest}
        />
    ) : <></>
}
