describe('Manage Infographics Sections Test', () => {

    it('Add new section', () => {
        cy
            .visit('')
            .get('.button').contains('Add new section')
            .click()
            .get('.infographics__infographics-section').should('be.visible')
    });

    it('Delete selected section', () => {
        cy
            .visit('')
            .get('.button').contains('Add new section')
            .click()
            .get('.infographics__infographics-section')
            .click()
            .get('.button').contains('Delete selected section')
            .click()
            .should('be.disabled')
            .get('.infographics').should('not.have.descendants')
    })
});