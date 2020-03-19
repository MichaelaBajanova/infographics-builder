describe('Edit infographics width and row height', () => {

    it('Width and height form appears', () => {
        cy
            .visit('')
            .get('.tools-menu__item--add-section')
            .click()
            .get('.tools-menu__item--size')
            .click()
            .get('.scope__SizeForm')
            .should('exist')
    })

    it('Height input is disabled if no section is selected', () => {
        cy
            .visit('')
            .get('.tools-menu__item--add-section')
            .click()
            .get('.tools-menu__item--size')
            .click()
            .get('#height')
            .should('be.disabled')
    })

    it('Change infographics width', () => {
        cy
            .visit('')
            .get('.tools-menu__item--add-section')
            .click()
            .get('.tools-menu__item--size')
            .click()
            .get('#width')
            .clear()
            .type('600')
            .get('.width-form')
            .submit()
            .get('.infographics')
            .should('have.css', 'width', '600px')
    });

    it('Change row height', () => {
        cy
            .visit('')
            .get('.tools-menu__item--add-section')
            .click()
            .get('.tools-menu__item--add-section')
            .click()
            .get('#section-0')
            .click()
            .get('.tools-menu__item--size')
            .click()
            .get('#height')
            .clear()
            .type('100')
            .get('.height-form')
            .submit()
            .get('.section-row')
            .first()
            .should('have.css', 'height', '100px')
    });
});
