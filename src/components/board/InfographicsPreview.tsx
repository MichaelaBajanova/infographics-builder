import React from 'react'
import {connect} from 'react-redux'
import 'styles/board/InfographicsPreview.scss'
import {IInfographicsDetails} from 'types/IInfographicsDetails'
import SectionRowPreview from 'components/board/SectionRowPreview'
import {INFOGRAPHICS_PREVIEW_RATIO} from 'constants/infographicsPreviewRatio'
import {ERoute} from 'enums/ERoute'
import history from '../../history'
import {loadInfographics} from 'ducks/builder/builderActions'
import Icon from 'components/ui/Icon'
import {EIconName, EIconType} from 'enums/EIconName'
import {IUser} from 'types/IUser'
import {getInfographicsStyle} from 'utils/infographics-utils'

interface IStateProps {
    user: IUser,
}

interface IDispatchProps {
    loadInfographics: typeof loadInfographics,
}

interface IOwnProps {
    infographicsDetails: IInfographicsDetails,
    isSelected: boolean,
    openDeleteInfographicsModal: (infographics: IInfographicsDetails) => void,
    openShareInfographicsModal: (infographics: IInfographicsDetails) => void,
}

interface IProps extends IStateProps, IDispatchProps, IOwnProps {}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
}

const mapDispatchToProps = {
    loadInfographics,
}

const InfographicsPreview = (props: IProps) => {

    const {
        infographicsDetails,
        isSelected,
        loadInfographics,
        openDeleteInfographicsModal,
        openShareInfographicsModal,
    } = props
    const {id, infographics, theme} = infographicsDetails
    const style = getInfographicsStyle(infographicsDetails, INFOGRAPHICS_PREVIEW_RATIO)

    const onEditInfographics = async () => {
        await loadInfographics(id!)
        history.push(`${ERoute.BUILDER}/${id}`)
    }

    const onShareInfographics = () => {
        openShareInfographicsModal(infographicsDetails)
    }

    const onDeleteInfographics = () => {
        openDeleteInfographicsModal(infographicsDetails)
    }

    const renderInfographicsPreviewTop = () => {
        return (
            <div className={'infographics-preview-top'}>
                <div className={'infographics-tools'}>
                    <Icon
                        name={EIconName.SHARE}
                        type={EIconType.SOLID}
                        ownClassName={`${toolIconClassName} ${toolIconClassName}--share`}
                        onClick={onShareInfographics}
                    />
                    <Icon
                        name={EIconName.TRASH}
                        type={EIconType.SOLID}
                        ownClassName={`${toolIconClassName} ${toolIconClassName}--trash`}
                        onClick={onDeleteInfographics}
                    />
                </div>
            </div>
        )
    }

    const toolIconClassName = 'tool-icon'
    return (
        <div className={'scope__InfographicsPreview'}>
            <div className={'infographics-preview-container'}>
                {renderInfographicsPreviewTop()}
                <div
                    className={`infographics-container ${isSelected ? 'infographics-container--selected' : ''}`}
                    onClick={onEditInfographics}
                >
                    <div
                        className={'infographics'}
                        style={style}
                    >
                        {infographics.map(
                            (row, index) => {
                                return (
                                    <SectionRowPreview
                                        key={index}
                                        row={row}
                                        theme={theme}
                                    />
                                )
                            }
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(InfographicsPreview))
