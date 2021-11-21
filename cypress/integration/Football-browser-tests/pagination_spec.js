import {listenForGameData, listenForUserData} from "../../support/listenFunctions"

describe('Filter', () => {
    beforeEach(() => {
        listenForGameData()
        listenForUserData()
        cy.visit('http://localhost:3000/prosjekt4')
    })

    it('Is default at page 1', () => {
        cy.contains("Page: 1 of")
    })

    it('Can browse pages', () => {
      cy.wait("@getGames")
      
      
      cy.get(`[aria-label="Go page front"]`).click().click().click()
      cy.contains("Page: 4 of")
      cy.get(`[aria-label="Go page back"]`).click().click()
      cy.contains("Page: 2 of")
    })

    it('Can not browse to less than page 1', () => {
      cy.get(`[aria-label="Go page back"]`).click().click().click().click().click().click()
      cy.contains("Page: 1 of")
    })

    it('Can not browse past last page', () => {
      cy.get(`[testid="filterLeague"]`).type("E0")
      cy.get(`[testid="searchCountry"]`).type("england")
      cy.get(`[testid="filterSeason"]`).type("2016")
      cy.get(`[testid="searchHT"]`).type("Everton")
      cy.get(`[testid="searchAT"]`).clear().type("Crystal Palace")
      cy.get(`[testid="filterAndSearchButton"]`).click()

      cy.get(`[aria-label="Go page front"]`).click().click().click()
      cy.contains("Page: 1 of")
    })
})