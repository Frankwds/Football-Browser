# Introduction

In this project the group sets out to create an application where the user can interact with a database containing football-match statistics. The user is allowed to filter, sort and search for specific matches. Moreover, the user can evaluate matches by giving stars and comments, and see how the feedback has been from other users.

# Problems

We encountered difficulties migrating project 3 to the Virtual Machine. The client in the virtual machine is not able to query the server, meanwhile the same client ran locally, is able to.   
The loading times for the data queries when the client is run locally are very slow.

# Setup

Go to the following link [http://it2810-50.idi.ntnu.no/prosjekt3/](http://it2810-50.idi.ntnu.no/prosjekt3/) to enjoy a nice presentation of your favorite football games!

The Apollo server and MongoDB database is running continuously on the Virtual Machine using the node-mode forever (https://www.npmjs.com/package/forever). Because of this there is no need to start the server locally. There have been some bugs in the deployment of the app on the VM so performance may improve by running the client locally.

# Run local client

Navigate to root and then first run `npm install`. When complete run `npm start`. This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Run remotely

Go to the following link [http://it2810-50.idi.ntnu.no/prosjekt3/](http://it2810-50.idi.ntnu.no/prosjekt3/) to enjoy a nice presentation of your favorite football games!

## Application layout

Snipped PNG of final application:
![app](resources/app.PNG "Application")

# Documentation

- React unit testing og Jest
- Apollo-server-mocking
- Cypress end-to-end testing


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

## Redux

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
