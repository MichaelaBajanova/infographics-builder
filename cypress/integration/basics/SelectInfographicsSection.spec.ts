describe('Select Infographics Section', () => {

    it('Select section', () => {
        cy
            .visit('')
            .get('.button')
            .contains('Add new section')
            .click()
            .get('.button')
            .contains('Divide')
            .should('be.disabled')
            .get('.infographics__infographics-section ')
            .click()
            .get('.infographics__infographics-section--active')
            .should('exist')
            .get('.button')
            .contains('Divide')
            .should('not.be.disabled')
    });

    // TODO: unselect test when it works better
});
