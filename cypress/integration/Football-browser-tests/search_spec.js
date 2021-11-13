describe('Search', () => {
    beforeEach(() => {
        listenForGameData()
        listenForDetailedGameData()
        listenForUserData()
        cy.visit('http://localhost:3000/prosjekt4')
    })


    it('Searches for country', () => {
        
    })
    it('Searches for Home Teams', () => {
        
    })
    it('Searches for Away Teams', () => {
        
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