import {listenForGameData, listenForUserData} from "../../support/listenFunctions"

describe('Filter', () => {
    beforeEach(() => {
        listenForGameData()
        listenForUserData()
        cy.visit('http://localhost:3000/prosjekt4')
    })

//1. Filter and search to result in one game
//2. See that the game contains all expected data
    it('Filters and searches', () => {
      cy.get(`[testid="filterLeague"]`).type("E0")
      cy.get(`[testid="searchCountry"]`).type("england")
      cy.get(`[testid="filterSeason"]`).type("2016")
      cy.get(`[testid="searchHT"]`).type("Everton")
      cy.get(`[testid="searchAT"]`).clear().type("Crystal Palace")
      cy.get(`[testid="filterAndSearchButton"]`).click()
      cy.wait("@getGames")
      cy.wait("@getGames").then((gameInterception) => {
        const ID = gameInterception.response.body.data.GetGamesFilterList.games[0].id_odsp;
        cy.wait("@userData")
        cy.wait(100)
        cy.get(('[id="'+ ID +'"]')).click()

        cy.contains("League: E0")
        cy.contains("Country: england")
        cy.contains("Season: 2016")
        cy.contains("Home team: Everton")
        cy.contains("Away team: Crystal Palace")
        cy.get(`[id="CloseModal"]`).click()
      })
    })

})