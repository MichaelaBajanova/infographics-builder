import React from 'react'
import {connect} from 'react-redux'
import 'styles/board/InfographicsPreviewList.scss'
import {IInfographicsDetails} from 'types/IInfographicsDetails'
import InfographicsPreview from 'components/board/InfographicsPreview'

interface IStateProps {
    selectedInfographics: IInfographicsDetails | null,
}

interface IOwnProps {
    infographicsList: IInfographicsDetails[],
    openDeleteInfographicsModal: (infographics: IInfographicsDetails) => void,
    openShareInfographicsModal: (infographics: IInfographicsDetails) => void,
}

interface IProps extends IStateProps, IOwnProps {}

const mapStateToProps = (state) => {
    return {
        selectedInfographics: state.board.selectedInfographics,
    }
}

class InfographicsPreviewList extends React.Component<IProps> {

    render() {
        const {
            infographicsList,
            openDeleteInfographicsModal,
            openShareInfographicsModal,
            selectedInfographics,
        } = this.props

        return (
            <div className={'scope__InfographicsPreviewList'}>
                <div className={'container'}>
                    {infographicsList.map((infographics, index) => {
                        const {id} = infographics
                        return (
                            <InfographicsPreview
                                infographicsDetails={infographics}
                                key={index}
                                isSelected={selectedInfographics && selectedInfographics.id === id}
                                openDeleteInfographicsModal={openDeleteInfographicsModal}
                                openShareInfographicsModal={openShareInfographicsModal}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(InfographicsPreviewList)
