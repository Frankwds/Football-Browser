# Project 4 
# Improvements and systematic testing of backend and client

In this project the group sets out to implement systematic testing of the backend and client from Project 3. Unit tests are ran using Jest. Integration tests are ran using Cypress. The server is tested using the Apollo server testing framework. 

The application allows a user to interact with a database containing football-match statistics. The user is allowed to filter, sort and search for specific matches. Moreover, the user can evaluate matches by giving stars and comments, and see how the feedback has been from other users.

# Setup

Go to the following link [http://it2810-50.idi.ntnu.no/prosjekt4/](http://it2810-50.idi.ntnu.no/prosjekt4/) to enjoy a nice presentation of your favorite football games!

The Apollo server and MongoDB database is running continuously on the Virtual Machine using the node-mode forever (https://www.npmjs.com/package/forever). Because of this there is no need to start the server locally. There have been some bugs in the deployment of the app on the VM so performance may improve by running the client locally.

## Run local client

Navigate to root and then first run `npm install`. When complete run `npm start`. This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Run remotely

Go to the following link [http://it2810-50.idi.ntnu.no/prosjekt3/](http://it2810-50.idi.ntnu.no/prosjekt3/) to enjoy a nice presentation of your favorite football games!

# Running the tests

To run unit tests with Jest:
```bash
npm test
```

To run integration tests with Cypress:
```bash
npx cypress run
```
To open the cypress GUI:
```
npx cypress open
```


# Unit testing with Jest
In this project the group has worked on implementing systematic automated testing for backend and client. Tests vary based on the functionality of each components, but usually either consider typing input into input-fields, or clicking on elements. Smoke tests, and snapshot tests are also included for all components. 


## Test location
Since unit tests work with specific components it makes sense to place them close to the components themselves. Because of this tests are places either one of two places:
1) The test is placed right next to the file it is testing.
```bash
src/
├─ App.tsx
├─ App.test.tsx
```
2) The test is place in a \_\_tests\_\_ folder in the same place as the component being tested.
```bash
gameComponents/
├─ Comments.tsx
├─ Game.tsx
├─ GameModal.tsx
├─ Rating.tsx
├─ __tests__/
│  ├─ Comments.test.tsx
│  ├─ Game.test.tsx
│  ├─ GameModal.test.tsx
│  ├─ Rating.test.tsx

```

## Setup and teardown

A general framework is put in place to ensuring tests run independently of eachother. A test `container` is generated from scratch before each test contained in the file. The container is appended to the `document.body` and is ready for the test to use. After the test is done the container is removed from the document body, and set to `container = null` in preparation for the next test. The code is shown in the code block below.

```typescript
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});
```

## Testing procedure
Three steps are performed for every unit test.
1) Generate test-data
2) Render components
3) Make assertions

Test-data is first generated and structured, for example in a `JSON` object. Then, the component rendered using the `ReactDOM.render()` method. Finally assertions are made using the `jest` library, with `expect()` being used for normal assertions while `jest.fn()` is used for spies. The general flow is illustrated in the code block below.

```typescript
it("has a descriptive name for what is tested",  () => {
    // 1) Generate test-data
    act( () => {
        // 2) render component
    }
    // 3) make assertions
    )
}
```



## Data mocking
Instead of calling the real Apollo-server configured in Project 3, MockedProvider are used to intercept component graphql queries. These interceptions return mock data that can be specifically configured for each test.

To achieve this the component's normal `<ApolloProvider>` wrapping is replaced with a `<MockedProvider>`. The normal `client` element is exchanged with a `mocks` props. 
 
<table>
<tr>
<th>Apollo-server provider</th>
<th>Mocked server provider</th>
</tr>
<tr>
<td>

```typescript
ReactDom.render(
    <ApolloProvider client={client}>
        <Component />
    </ApolloProvider>
)
```

</td>
<td>

```typescript
ReactDom.render(
    <MockedProvider mocks={mocks}>
        <Component />
    </MockedProvider>
)
```

</td>
</tr>
</table>

The `mocks` props takes care of which GraphQL querys are to be intercepted. A piece of `mockData` is generated to be returned in place of the `data` normally returned from the query. The specific `query` and which `variables` to intercept for must also be specified.

An outline for the mock configurations is specified in the code block below.

```typescript
// Generate mockData to be returned
const mockData = { key: 'value'};

// Specify which query to intercept, and for which variables
const mocks = [
  {
    request: {
      query: gql`query (...)`,
      variables: { ... },
    },
    result: { data: { mockData } },
  },
];
```
As a result, mockData is returned in place of normal GraphQL queried data. This allows for running test setups without communicating with the live server.

# Cypress end-to-end testing
Cypress is an end-to-end testing framework for web test automation which we have used to write automated integration tests for the Football Browser application.


## Test location
All tests writen to cypress are stored in the same folder as shown in the code block below.
```bash
cypress/
├─ integration/Football-browser-tests/
│  ├─ comments_and_ratings_spec.js
│  ├─ filter_spec.js
│  ├─ home_page_spec.js
│  ├─ modal_spec.js
│  ├─ pagination_spec.js
│  ├─ search_and_filter_spec.js
│  ├─ search_spec.js
│  ├─ sort_spec.js
├─ support/
│  ├─ listenFunctions.js
```
## Testing coverage

Using cypress and end-2-end testing every common usecase of the application has been tested.
- The integration tests we have written covers the following:
    - Opening modals
    - Browsing pages
    - Filtering
    - Searching
    - Sorting
    - Commenting
    - Rating

The functionality has been covered by a total of 22 testcases divided on 8 tests. Cypress mocks user interaction with the different elements of the page, awaits for the server to respond with data, and makes assertions on the resulting page.

## Setup and teardown

Each test has a similar setup: Using visit to refresh the page, effectivly setting up and tearing down between each test case.

```javascript
    beforeEach( () => {
        listenForGameData()
        listenForDetailedGameData()
        listenForUserData()
        cy.visit('http://localhost:3000/prosjekt4')
        })
```
The listen functions are imported from /support/listenFunctions.js, and set up cypress to intercept Apollo graphql request
```javascript
 cy.wait("@getGames")
```
We can then explicitly wait for data, before the next page-interaction or assertion is made, thereby guaranteeing the quality of the tests.

## Testing procedure

Here is an example taken from the integration test performed on the user rating functionality. It correctly depicts how we test with cypress.
```javascript
cy.get('[data-testid="rating-stars"]').children().eq(4).click({force: true});
cy.wait('@rateGame') 
expect(ratingBeforeClick != ratingAfterClick).to.be.true
```
The DOM elements are retrieved with id or as children elements and we assert in two ways:
- using expects like in the example above.
- using cy.contains, asserting if certain text strings appears on the visible screen.



## Technology

The group has throughout the development process had an extensive focus on utilizing various third-party libraries. This has been done through an iterative process when implementing code, where the group find better and better solutions for widening the functionality of the application. The fact that the group has touched many different packages and libraries has given the members valuable insight to the ecosystem of React Web development.

### GraphQL

GraphQl is a query language for APIs enabling smooth and efficient interaction between client and server. The framework was initially concieved internally by Facebook, but is nowadays open-source hosted by the infamous Linux Foundation. GraphQL is typically denoted as a contrast to the established REST-framework and is getting more and more attention by the day. This is due to multiple factors; the nature of query statements removes the issues with excessive data responses, as only the data requested is retrieved. This gives more stable, fewer and predictable data responses.

In terms of this project, the group utilizes GraphQL extensively. Queries and mutations are used for interactions with the Apollo server. Resolvers and schemas are defined within the [server](./server) folder, defining which - and how - data fields can be populated.

### MongoDB

MongoDB was used to deploy the football-data on the Virtual Machine. A database with the name of football-data was created. Two collections made up the database. The first collection,`gamedata`, consisted of data from football matches from top european leagues. The second collection, `userdata`, consisted of user generated data in the form of ratings and comments related to each match. Mongoose was used to connect the Apollo server to the MongoDB database.

### Apollo

For interaction with the Apollo server the group utilizes the ApolloClient and ApolloProvider from the Apollo library, in addition to the Apollo Graph Plattform.
In the application the Apollo works as a stand-alone GraphQL server, which the application can make queries and mutations to. The resolvers responsible for populating data fields defined in the schema are defined in [resolvers.js](./server/resolvers.js)

### Chakra

Chakra UI is a modular and simple component library providing building blocks for React applications.

The group considers the usability of third-party UI packages very valuable, and Chakra UI is therefore used extensively throughout the application. This enables faster development and more beautiful styling. This can for instance be seen in the [Game](./src/components/gameComponents/Game.tsx) functional component which solely consists of Chakra UI components.

### Redux

We have used redux to store and pass the values of the search and filter function on our website.
The Filter passes the values in all field to our redux reducer with the action "UPDATE_SEARCH_DATA", which GameList.tsx listens to. The Query to our server is thereby automatically re-sent on any changes in these parameters.
We chose Redux over the availible Apollo Cache because it was usefull to learn a library as widely used as Redux.



# File tree

TODO: Add a file tree here after everything is done.
```bash
src/
┣ apolloExample/
┃ ┣ ApolloExample.tsx
┃ ┗ ExchangeRates.tsx
┣ components/
┃ ┣ containerComponents/
┃ ┃ ┣ __tests__/
┃ ┃ ┃ ┣ __snapshots__/
┃ ┃ ┃ ┃ ┣ Footer.test.tsx.snap
┃ ┃ ┃ ┃ ┗ Header.test.tsx.snap
┃ ┃ ┃ ┣ Content.test.tsx
┃ ┃ ┃ ┣ Footer.test.tsx
┃ ┃ ┃ ┗ Header.test.tsx
┃ ┃ ┣ Content.tsx
┃ ┃ ┣ Footer.tsx
┃ ┃ ┗ Header.tsx
┃ ┣ gameComponents/
┃ ┃ ┣ Comments.tsx
┃ ┃ ┣ Game.tsx
┃ ┃ ┣ GameModal.tsx
┃ ┃ ┗ Rating.tsx
┃ ┣ queryComponents/
┃ ┃ ┗ GamesList.tsx
┃ ┣ sortingComponents/
┃ ┃ ┣ FilterBox.tsx
┃ ┃ ┣ PageChanger.tsx
┃ ┃ ┗ SearchBar.tsx
┃ ┗ style.css
┣ redux/
┃ ┣ searchFilter/
┃ ┃ ┣ filterSearchReducer.ts
┃ ┃ ┗ searchFilterTypes.ts
┃ ┣ index.ts
┃ ┗ StateType.ts
┣ resources/
┃ ┣ football.jpg
┃ ┣ gitlab-icon.png
┃ ┗ react-icon.png
┣ App.css
┣ App.test.tsx
┣ App.tsx
┣ e2e.test.tsx
┣ index.css
┣ index.tsx
┣ logo.svg
┣ react-app-env.d.ts
┣ reportWebVitals.ts
┗ setupTests.ts
```
# Application layout

Snipped PNG of final application:
![app](resources/app.PNG "Application")