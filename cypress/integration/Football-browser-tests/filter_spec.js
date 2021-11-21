import {listenForDetailedGameData, listenForGameData} from "../../support/listenFunctions"

describe('Filter', () => {
    beforeEach(() => {
        listenForGameData()
        listenForDetailedGameData()
        cy.visit('http://localhost:3000/prosjekt4')
    })

    //1. filter
    //2. sort by league - sample league
    //3. sort by league again - sample again
    //4. compare the two leages to be eqaual
    it('Filters by Leauge', () => {
      cy.get(`[testid="filterLeague"]`).type("SP1")
      cy.get(`[testid="filterAndSearchButton"]`).click()
      cy.wait("@getGames")
      cy.wait("@getGames").then((gameInterception1) => {
        const leagueBefore = gameInterception1.response.body.data.GetGamesFilterList.games[0].league;
        cy.get(`[id="selectSort"]`).select("league")
        cy.get(`[id="sortButton"]`).click()
        cy.wait("@getGames").then((gameInterception1) => {
          const leagueAfter = gameInterception1.response.body.data.GetGamesFilterList.games[0].league;
          //localeCompare() does lexicographical comparison
          //Return -1, 0 or 1.
          const comparison = leagueAfter.localeCompare(leagueBefore);
          //Returns 1 if league after (spain) is lexicographic greater than league before sort (england)
          expect(comparison === 0).to.be.true
        })
      })
    })

    //1. filter
    //2. sort by league - - sample and check if correct season
    //3. sort by league again - sample again and check if correct season
    it('Filters by Season', () => {
      //1.
      cy.get(`[testid="filterSeason"]`).type("2016")
      cy.get(`[testid="filterAndSearchButton"]`).click()
      cy.wait("@getGames")

      //2.
      cy.wait("@getGames").then((gameInterception)=>{
        const ID = gameInterception.response.body.data.GetGamesFilterList.games[0].id_odsp;
        cy.get(('[id="'+ ID +'"]')).click()
      })
      cy.wait("@gameDetails")
      //Check:
      cy.contains("2016")


      cy.get(`[id="CloseModal"]`).click()
      cy.get(`[id="sortButton"]`).click()

      //3.
      cy.wait("@getGames").then((gameInterception)=>{
        const ID = gameInterception.response.body.data.GetGamesFilterList.games[0].id_odsp;
        cy.get(('[id="'+ ID +'"]')).click()
      })
      cy.wait("@gameDetails")
      //Check:
      cy.contains("2016")
      })

})


