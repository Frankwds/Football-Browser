describe('My First Test', () => {
    it('Visits the Remote Client', () => {
        cy.visit('http://it2810-50.idi.ntnu.no/prosjekt4/')
      })
    it('Visits the Local Client', () => {
      cy.visit('http://localhost:3000/prosjekt4')
    })
    
    it('finds the text content of title, filter, date sorter, and page indicator', () => {
    cy.visit('http://localhost:3000/prosjekt4')
    cy.contains("WebDev Project3 - Football browser")
    cy.contains("Filter By")
    cy.contains("Date")
    cy.contains("Page")
    })

    it('is able to click "Date"', () => {
        cy.visit('http://localhost:3000/prosjekt4')
        cy.contains('Date').click({force: true})
    })

    it('can click "Sort By" after clicking Date', () => {
        cy.visit('http://localhost:3000/prosjekt4')
        cy.contains('Date').click({force: true})
        cy.contains('Sort by').click({force: true})
    })
    
    it('should show 4 options after cliking "Date"', () => {
        cy.visit('http://localhost:3000/prosjekt4')
        cy.contains('Date').click({force: true})
        cy.contains('Sort by').should('be.visible')
        cy.contains('Date').should('be.visible')
        cy.contains('Country').should('be.visible')
        cy.contains('League').should('be.visible')
    })
  })