describe('Manage Infographics Sections Test', () => {

    it('Add new section', () => {
        cy
            .visit('')
            .get('.button').contains('Add new section')
            .click()
            .get('.infographics__infographics-section').should('be.visible')
    });

    it('Delete section', () => {
        cy
            .visit('')
            .get('.button').contains('Add new section')
            .click()
            .get('.infographics__delete-infographics .material-icons').contains('clear')
            .click()
            .get('.infographics').should('not.have.descendants')
    })
});