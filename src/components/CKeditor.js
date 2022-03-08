import { useState, useEffect, useRef } from 'react';

export default function CKeditor(props) {
    const [editorLoaded, setEditorLoaded] = useState(false)
    
    const editorRef = useRef()
    const {CKEditor, ClassicEditor} = editorRef.current || {}

    useEffect(() => {
        editorRef.current = {
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
            ClassicEditor: require('ckeditor5-custom-build'),
            // Alignment: require('@ckeditor/ckeditor5-alignment/src/alignment')
        }
        setEditorLoaded(true)
    }, [])

    // TODO: Colocar CKEditor em português
    return editorLoaded ? (
        <CKEditor
        // TODO: setar altura baseada na altura da tela
        editor={ ClassicEditor }
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
        // config={{
        //     plugins: [ Alignment ]
        // }}
        {...props}
        />
    ) : <></>
}
