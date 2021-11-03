import "./App.css";
import Header from "./components/containerComponents/Header";

import Content from "./components/containerComponents/Content";
import Footer from "./components/containerComponents/Footer";
import { Grid } from "@chakra-ui/layout";
import FilterBox from "./components/sortingComponents/FilterBox";
import { useState } from "react";

const col = "rgb(192,192,192)";
const acc = "rgb(0,128,128)";

/**
 * App - Presents application
 * 
 * @returns {React.FC}
 * 
 * Enables users to see and interact with football matches. Two elements are displayed, FilterBox and Content. The primer allows the user to filter, sort and search in data,
 * while the latter also gives feedback on matches.
 * 
 * The football-data is stored in @link {../server/football-data/game-data.json}
 * 
 */

function App() {
  const [params, setParams] = useState(["", "", "", "", ""]);

  //Setting parameters to utilize for search/filtering
  const SetPar = (childData: string[]) => {
    setParams(childData);
  };

  // Return screen of feed for activities
  return (
    <Grid h="100vh" templateRows="150px 1fr 100px">
      <Header />
      <Content color={col} accent={acc} />
      <Footer />
    </Grid>
  );
}

export default App;
