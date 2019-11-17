describe('Select Infographics Section', () => {

    it('Select section', () => {
        cy
            .visit('')
            .get('.tools-menu__item--add-section')
            .click()
            .get('.tools-menu__item--divide-section')
            .should('be.disabled')
            .get('.infographics__infographics-section')
            .click()
            .get('.infographics__infographics-section--active')
            .should('exist')
            .get('.tools-menu__item--divide-section')
            .should('not.be.disabled')
    });

    it('Unselect section', () => {
        cy
            .visit('')
            .get('.tools-menu__item--add-section')
            .click()
            .get('.infographics__infographics-section')
            .click()
            .get('.infographics__infographics-section--active')
            .should('exist')
            .click()
            .get('.infographics__infographics-section--active')
            .should('not.exist')
    })
});
