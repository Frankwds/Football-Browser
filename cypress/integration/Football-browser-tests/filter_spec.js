describe('Filter', () => {
    beforeEach(() => {
        listenForGameData()
        listenForDetailedGameData()
        listenForUserData()
        cy.visit('http://localhost:3000/prosjekt4')
    })

    //1. filter
    //2. sort by league
    //3. sort by league again
    it('Filters by Leauge', () => {
      cy.get(`[id="filterLeague"]`).type("SP1")
      cy.get(`[id="filterAndSearchButton"]`).click()
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




})

function listenForGameData() {
    const URL = "http://it2810-50.idi.ntnu.no:4000/graphql"
    cy.intercept("POST", URL, (req) =>{
      if(req.body.operationName === "GetGamesFilterList"){
        req.alias = "getGames"
        req.continue()
      }
    })
  }
  
  function listenForDetailedGameData() {
    const URL = "http://it2810-50.idi.ntnu.no:4000/graphql"
    cy.intercept("POST", URL, (req) =>{
      if(req.body.operationName === "GetGameDetailsByID"){
        req.alias = "gameDetails"
        req.continue()
      }
    })
  }

  function listenForUserData() {
    const URL = "http://it2810-50.idi.ntnu.no:4000/graphql"
    cy.intercept("POST", URL, (req) =>{
      if(req.body.operationName === "GetUserDataByGameIDMutation"){
        req.alias = "userData"
        req.continue()
      }
    })
}