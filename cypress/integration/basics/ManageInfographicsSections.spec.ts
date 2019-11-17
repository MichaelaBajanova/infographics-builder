describe('Manage Infographics Sections Test', () => {

    it('Add new section', () => {
        cy
            .visit('')
            .get('.tools-menu__item--add-section')
            .click()
            .get('.infographics__infographics-section').should('be.visible')
    });

    it('Delete section', () => {
        cy
            .visit('')
            .get('.tools-menu__item--add-section')
            .click()
            .get('.infographics__delete-infographics .fa-times')
            .click()
            .get('.infographics').should('not.have.descendants')
    })
});
