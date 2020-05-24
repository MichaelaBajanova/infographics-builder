import React from 'react'
import 'styles/modals/text-modal/AddTextModal.scss'
import Modal from 'components/ui/Modal'
import {IInfographicsSection} from 'types/IInfographicsSection'
import {EModalSize} from 'enums/EModalSize'
import ReactQuill from 'react-quill'
import {IInfographicsContent} from 'types/IInfographicsContent'

interface IProps {
    addContent: (section: IInfographicsSection, content: IInfographicsContent) => void,
    closeTextModal: () => void,
    selectedSection: IInfographicsSection | null,
    textEditorContent: string,
}

class AddTextModal extends React.Component<IProps> {

    quillRef = null as any
    reactQuillRef = null as any

    componentDidMount() {
        const {textEditorContent} = this.props
        this.attachQuillRefs()

        this.quillRef.root.innerHTML = textEditorContent
    }

    componentDidUpdate() {
        this.attachQuillRefs()
    }

    attachQuillRefs = () => {
        if (typeof this.reactQuillRef!.getEditor !== 'function') return;
        this.quillRef = this.reactQuillRef!.getEditor();
    }

    render() {
        const modules = {
            toolbar: [
                'bold',
                'italic',
                'underline',
                'strike',
                {'header': '1'},
                {'header': '2'},
                'blockquote',
                'code-block',
                'link',
                {'script': 'sub'},
                {'script': 'super'},
                {'color': []},
                {'background': []},
                {'list': 'ordered'},
                {'list': 'bullet'},
                {'align': []},
                'clean',
            ],
        }

        return (
            <div className={'scope__AddTextModal'}>
                <Modal
                    headerText={'Add Text'}
                    onCancelButtonClick={this.onCancelButtonClick}
                    onSubmitButtonClick={this.onSaveChangesButtonClick}
                    size={EModalSize.SMALL}
                    submitButtonText={'Save changes'}
                >
                    <>
                        <div className={'text-editor-container'}>
                            <ReactQuill
                                ref={(el) => {
                                    this.reactQuillRef = el
                                }}
                                theme={'snow'}
                                modules={modules}
                                placeholder={'Your text here...'}
                            />
                        </div>
                    </>
                </Modal>
            </div>
        )
    }

    private onSaveChangesButtonClick = () => {
        const {addContent, closeTextModal, selectedSection} = this.props
        const editorHtml = this.quillRef.root.innerHTML
        const infographicsContent: IInfographicsContent = {
            textWithHtml: editorHtml,
        }

        addContent(selectedSection!, infographicsContent)
        closeTextModal()
    }

    private onCancelButtonClick = () => {
        const {closeTextModal} = this.props
        closeTextModal()
    }
}

export default AddTextModal
