import React from 'react'
import 'styles/modals/title-modal/AddTitleModal.scss'
import Modal from 'components/ui/Modal'
import {IInfographicsSection} from 'types/IInfographicsSection'
import {EModalSize} from 'enums/EModalSize'
import ReactQuill from 'react-quill'
import {IInfographicsContent} from 'types/IInfographicsContent'

interface IProps {
    addContent: (section: IInfographicsSection, content: IInfographicsContent) => void,
    closeTitleModal: () => void,
    selectedSection: IInfographicsSection | null,
    titleEditorContent: string,
}

class AddTitleModal extends React.Component<IProps> {

    quillRef = null as any
    reactQuillRef = null as any

    componentDidMount() {
        const {titleEditorContent} = this.props
        this.attachQuillRefs()

        this.quillRef.root.innerHTML = titleEditorContent
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
                {'script': 'sub'},
                {'script': 'super'},
                {'color': []},
                {'background': []},
                'clean',
            ],
        }

        return (
            <div className={'scope__AddTitleModal'}>
                <Modal
                    headerText={'Add Title'}
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
        const {addContent, closeTitleModal, selectedSection} = this.props
        const editorHtml = this.quillRef.root.innerHTML
        const infographicsContent: IInfographicsContent = {
            title: editorHtml,
        }

        addContent(selectedSection!, infographicsContent)
        closeTitleModal()
    }

    private onCancelButtonClick = () => {
        const {closeTitleModal} = this.props
        closeTitleModal()
    }
}

export default AddTitleModal
