import React from 'react'
import SectionRow from 'components/infographics/SectionRow'
import {IInfographicsSection} from 'types/IInfographicsSection'
import {IInfographicsDetails} from 'types/IInfographicsDetails'
import {getInfographicsStyle} from 'utils/infographics-utils'

interface IProps {
    deleteSection?: (section: IInfographicsSection) => void,
    infographicsDetails: IInfographicsDetails,
    isInteractive: boolean,
    selectedSection: IInfographicsSection | null,
    updateSelectedSection?: (section: IInfographicsSection | null) => void,
}

const Infographics = (props: IProps) => {

    const {
        deleteSection,
        infographicsDetails,
        isInteractive,
        selectedSection,
        updateSelectedSection,
    } = props
    const {infographics, theme} = infographicsDetails
    const style = getInfographicsStyle(infographicsDetails)

    return (
        <div className={`infographics ${!infographics.length ? 'infographics--empty' : ''}`} style={style}>
            {infographics.map(
                (row, index) => (
                    <SectionRow
                        key={index}
                        deleteSection={deleteSection}
                        isInteractive={isInteractive}
                        row={row}
                        selectedSection={selectedSection}
                        theme={theme}
                        updateSelectedSection={updateSelectedSection}
                    />)
            )}
        </div>
    )
}

export default React.memo(Infographics)
