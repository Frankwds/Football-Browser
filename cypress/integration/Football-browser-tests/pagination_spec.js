describe('Sort', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/prosjekt4')
    })

    it.skip('Is default at page 1', () => {
        cy.contains("Page: 1 of")
    })

    it.skip('Can browse pages', () => {
      cy.wait("@getGames")
      
      
      cy.get(`[aria-label="Go page front"]`).click().click().click()
      cy.contains("Page: 4 of")
      cy.get(`[aria-label="Go page back"]`).click().click()
      cy.contains("Page: 2 of")
    })

    it.skip('Can not browse to less than page 1', () => {
      cy.get(`[aria-label="Go page back"]`).click().click().click().click().click().click()
      cy.contains("Page: 1 of")
    })

    it.skip('Can not browse past last page', () => {
      //This must be tested after filter functions, to get less pages.
    })
})