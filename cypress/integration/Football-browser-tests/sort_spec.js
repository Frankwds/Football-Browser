describe('Sort', () => {
    beforeEach(() => {
        listenForGameData()
        listenForDetailedGameData()
        listenForUserData()
        cy.visit('http://localhost:3000/prosjekt4')
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
                localStorage.setItem('dateBefore', dateBefore);
                
                }).then(() => {
                    //Close modal
                    cy.get(`[id="CloseModal"]`).click()
                    //Click Sort
                    cy.get(`[id="sortButton"]`).click()
                }).then(()=> {
                    //Wait for new game data:
                    cy.wait("@getGames").then((gameInterception) => {
                    //Get the ID of the first game on the new list.
                    const ID = gameInterception.response.body.data.GetGamesFilterList.games[0].id_odsp;
                    //Needed to load games to page first:
                    cy.wait("@userData")
                    //Click the first Game on the new list of games
                    cy.wait(200)
                    cy.get(('[id="'+ ID +'"]')).click()
                }).then(()=> {
                    cy.wait("@gameDetails").then((interception2) => {})

                }).then((interception2)=>{
                    const dateAfterSort = interception2.response.body.data.GetGameByID.date
                    const dateBeforeSort = window.localStorage.getItem("dateBefore")

                    var date1 = new Date(dateBeforeSort).getTime();
                    var date2 = new Date(dateAfterSort).getTime();
                    
                  // date1 should allways be larger than date2 when sorted by date.
                    expect(date1 > date2).to.be.true
                })
            })
        })
    })
        
        



    it('Sorts by Country', () => {
      //Sort for country
      cy.get(`[id="selectSort"]`).select("country")
      cy.get(`[id="sortButton"]`).click()

      cy.wait("@getGames")
      cy.wait("@getGames").then((gameInterception1) => {
        const countryBefore = gameInterception1.response.body.data.GetGamesFilterList.games[0].country;

        //Sort again
        cy.get(`[id="sortButton"]`).click()
        cy.wait("@getGames").then((gameInterception2) => {
          const countryAfter = gameInterception2.response.body.data.GetGamesFilterList.games[0].country;
          //localeCompare() does lexicographical comparison
          //Return -1, 0 or 1.
          const comparison = countryAfter.localeCompare(countryBefore);
          //Returns 1 if country after (spain) is lexicographic greater than country before sort (england)
          expect(comparison === 1).to.be.true
        })

      })
    })


    it('Sorts by Leauge', () => {
      //Sort for league
      cy.get(`[id="selectSort"]`).select("league")
      cy.get(`[id="sortButton"]`).click()

      cy.wait("@getGames")
      cy.wait("@getGames").then((gameInterception1) => {
        const leagueBefore = gameInterception1.response.body.data.GetGamesFilterList.games[0].league;

        //Sort again
        cy.get(`[id="sortButton"]`).click()
        cy.wait("@getGames").then((gameInterception2) => {
          const leagueAfter = gameInterception2.response.body.data.GetGamesFilterList.games[0].league;
          //localeCompare() does lexicographical comparison
          //Return -1, 0 or 1.
          const comparison = leagueAfter.localeCompare(leagueBefore);
          //Returns 1 if league after (spain) is lexicographic greater than league before sort (england)
          expect(comparison === 1).to.be.true
        })
      })
    })
    
})//For the whole describe(Sort)

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
