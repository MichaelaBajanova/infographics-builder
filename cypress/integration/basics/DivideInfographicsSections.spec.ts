describe('Divide Infographics Sections', () => {

    it('Divide section', () => {
        cy
            .visit('')
            .get('.tools-menu__item--add-section')
            .click()
            .get('.infographics__infographics-section')
            .click()
            .get('.tools-menu__item--divide-section')
            .click()
            .get('.infographics__infographics-section')
            .its('length')
            .should('equal', 2)
            .get('.section-row')
            .should('have.css', 'grid-template-columns', '200px 200px')
    });
});
