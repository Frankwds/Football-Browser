describe('Pagination and Sort', () => {
    beforeEach(() => {
        listenForGameData()
        listenForDetailedGameData()
        listenForUserData()
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

    it('Sorts by Date', () => {
        //Wait for game data:
        cy.wait("@getGames").then((interception) => {
            //Needed to load games to page first:
            cy.wait("@userData")
            const ID = interception.response.body.data.GetGamesFilterList.games[0].id_odsp;
            //Click the first Game on the list.
            cy.get(('[id="'+ ID +'"]')).click()
            
            //Save the response data date from the new GameDetail Query just sent.
            cy.wait("@gameDetails").then((interception1) => {

                //Get the date for later comparison:
                const dateBefore = interception1.response.body.data.GetGameByID.date

                }).then((interception1) => {
                    //Close modal
                    cy.get(`[id="CloseModal"]`).click()
                    //Click Sort
                    cy.get(`[id="sortButton"]`).click()
                    console.log(interception1.response.body.data.GetGameByID.date);

                }).then((interception1)=> {
                    
                    //Wait for new game data:
                    cy.wait("@getGames").then((gameInterception) => {
                    //Get the ID of the first game on the new list.
                    const ID = gameInterception.response.body.data.GetGamesFilterList.games[0].id_odsp;
                    //Needed to load games to page first:
                    cy.wait("@userData")

                    //Click the first Game on the new list of games
                    cy.get(('[id="'+ ID +'"]')).click()
                }).then(()=>{

                    cy.wait("@gameDetails").then((interception2) => {})

                }).then((interception2)=>{
                    
                    const dateAfter = interception2.response.body.data.GetGameByID.date
                    console.log(dateAfter);
                        
                })
            })
        })
    })
        
        



    it.skip('Sorts by Country', () => {
        
    })
    it.skip('Sorts by League', () => {
        
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