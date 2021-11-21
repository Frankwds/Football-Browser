import {listenForDetailedGameData, listenForGameData} from "../../support/listenFunctions"

describe('Search', () => {
    beforeEach(() => {
        listenForGameData()
        listenForDetailedGameData()
        cy.visit('http://localhost:3000/prosjekt4')
    })

    /* 
    1. Search for e.
    2. Sample that results contain "e"
    3. Search for eng
    4. Sample that results contain "eng"

    */
    it('Searches for country', () => {
      cy.wait("@getGames")
      cy.get(`[testid="searchCountry"]`).type("e")
      cy.get(`[testid="filterAndSearchButton"]`).click()
      cy.wait("@getGames").then((gameInterception1) => {
        const country1 = gameInterception1.response.body.data.GetGamesFilterList.games[0].country;
        const country2 = gameInterception1.response.body.data.GetGamesFilterList.games[1].country;
        const country3 = gameInterception1.response.body.data.GetGamesFilterList.games[2].country;
        expect(country1.toLowerCase().includes("e")).to.be.true
        expect(country2.toLowerCase().includes("e")).to.be.true
        expect(country3.toLowerCase().includes("e")).to.be.true
      })

      cy.get(`[testid="searchCountry"]`).clear().type("eng")
      cy.get(`[testid="filterAndSearchButton"]`).click()
      cy.wait("@getGames").then((gameInterception1) => {
        const country1 = gameInterception1.response.body.data.GetGamesFilterList.games[0].country;
        const country2 = gameInterception1.response.body.data.GetGamesFilterList.games[1].country;
        const country3 = gameInterception1.response.body.data.GetGamesFilterList.games[2].country;
        expect(country1.toLowerCase().includes("eng")).to.be.true
        expect(country2.toLowerCase().includes("eng")).to.be.true
        expect(country3.toLowerCase().includes("eng")).to.be.true
      })
    })



    it('Searches for Home Teams', () => {
      cy.wait("@getGames")
      cy.get(`[testid="searchHT"]`).type("E")
      cy.get(`[testid="filterAndSearchButton"]`).click()
      cy.wait("@getGames").then((gameInterception1) => {
        const homeTeam1 = gameInterception1.response.body.data.GetGamesFilterList.games[0].ht;
        const homeTeam2 = gameInterception1.response.body.data.GetGamesFilterList.games[1].ht;
        const homeTeam3 = gameInterception1.response.body.data.GetGamesFilterList.games[2].ht;
        expect(homeTeam1.toLowerCase().includes("e")).to.be.true
        expect(homeTeam2.toLowerCase().includes("e")).to.be.true
        expect(homeTeam3.toLowerCase().includes("e")).to.be.true
      })

      cy.get(`[testid="searchHT"]`).clear().type("Everton")
      cy.get(`[testid="filterAndSearchButton"]`).click()
      cy.wait("@getGames").then((gameInterception1) => {
        const homeTeam1 = gameInterception1.response.body.data.GetGamesFilterList.games[0].ht;
        const homeTeam2 = gameInterception1.response.body.data.GetGamesFilterList.games[1].ht;
        const homeTeam3 = gameInterception1.response.body.data.GetGamesFilterList.games[2].ht;
        expect(homeTeam1.toLowerCase().includes("everton")).to.be.true
        expect(homeTeam2.toLowerCase().includes("everton")).to.be.true
        expect(homeTeam3.toLowerCase().includes("everton")).to.be.true
        const awayTeam1 = gameInterception1.response.body.data.GetGamesFilterList.games[0].at;
        const awayTeam2 = gameInterception1.response.body.data.GetGamesFilterList.games[1].at;
        const awayTeam3 = gameInterception1.response.body.data.GetGamesFilterList.games[2].at;
        expect(awayTeam1.toLowerCase().includes("everton")).to.be.false
        expect(awayTeam2.toLowerCase().includes("everton")).to.be.false
        expect(awayTeam3.toLowerCase().includes("everton")).to.be.false
      })
    })




    it('Searches for Away Teams', () => {
      cy.wait("@getGames")

      cy.get(`[testid="searchAT"]`).type("E")
      cy.get(`[testid="filterAndSearchButton"]`).click()
      cy.wait("@getGames").then((gameInterception1) => {
        const awayTeam1 = gameInterception1.response.body.data.GetGamesFilterList.games[0].at;
        const awayTeam2 = gameInterception1.response.body.data.GetGamesFilterList.games[1].at;
        const awayTeam3 = gameInterception1.response.body.data.GetGamesFilterList.games[2].at;
        expect(awayTeam1.toLowerCase().includes("e")).to.be.true
        expect(awayTeam2.toLowerCase().includes("e")).to.be.true
        expect(awayTeam3.toLowerCase().includes("e")).to.be.true

      })

      cy.get(`[testid="searchAT"]`).clear().type("Everton")
      cy.get(`[testid="filterAndSearchButton"]`).click()
      cy.wait("@getGames").then((gameInterception1) => {
        const awayTeam1 = gameInterception1.response.body.data.GetGamesFilterList.games[0].at;
        const awayTeam2 = gameInterception1.response.body.data.GetGamesFilterList.games[1].at;
        const awayTeam3 = gameInterception1.response.body.data.GetGamesFilterList.games[2].at;
        expect(awayTeam1.toLowerCase().includes("everton")).to.be.true
        expect(awayTeam2.toLowerCase().includes("everton")).to.be.true
        expect(awayTeam3.toLowerCase().includes("everton")).to.be.true
        const homeTeam1 = gameInterception1.response.body.data.GetGamesFilterList.games[0].ht;
        const homeTeam2 = gameInterception1.response.body.data.GetGamesFilterList.games[1].ht;
        const homeTeam3 = gameInterception1.response.body.data.GetGamesFilterList.games[2].ht;
        expect(homeTeam1.toLowerCase().includes("everton")).to.be.false
        expect(homeTeam2.toLowerCase().includes("everton")).to.be.false
        expect(homeTeam3.toLowerCase().includes("everton")).to.be.false
      })
    })










})
