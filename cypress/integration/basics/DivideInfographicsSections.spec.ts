describe('Divide Infographics Sections', () => {

    it('Divide section', () => {
        cy
            .visit('')
            .get('.button')
            .contains('Add new section')
            .click()
            .get('.infographics__infographics-section')
            .click()
            .get('.button')
            .contains('Divide')
            .click()
            .get('.infographics__infographics-section')
            .its('length')
            .should('equal', 2)
            .get('.section-row')
            .should('have.css', 'grid-template-columns', '200px 200px')
    });
});
