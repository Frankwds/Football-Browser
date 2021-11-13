import { Button, VisuallyHidden } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import "./../style.css";
import { Grid } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { useDispatch } from "react-redux";

type Props = {
  color: string;
  accent: string;
};

/**
 * FilterBox - Component to facilitate filtering and search depending on parameters
 *
 * @param func
 * @param color
 * @param accent
 *
 * @returns {React.FC}
 *
 * Utilizing hooks to keep track of which input fields to filter on.
 * The @param func acts as a callback function to @link {../App.tsx} with the hooks.
 *
 */

const FilterBox: React.FC<Props> = ({ color, accent }) => {
  const [league, setLeague] = useState("");
  const [contry, setContry] = useState("");
  const [season, setSeason] = useState("");
  const [ht, setHt] = useState("");
  const [at, setAt] = useState("");
  const updateSearchQueries = useDispatch();

  const handleApplyFilter = (
    league: string,
    contry: string,
    season: string,
    ht: string,
    at: string
  ) => {
    // Provide given search query object
    updateSearchQueries({
      type: "UPDATE_SEARCH_DATA",
      payload: {
        league: league,
        country: contry,
        season: season,
        ht: ht,
        at: at,
      },
    });
  };

  //Renders the filterbox, with visually hidden text for improved web accessability.s
  return (
    <Box bg={color} borderRadius="lg" padding={"15px"}>
      <Grid templateRows="repeat(6, 1fr)" gap={3}>
        <Box
          bg={accent}
          fontSize="xl"
          borderRadius="lg"
          padding={"6px"}
          color={"white"}
          display="flex"
        >
          - Filter By -
        </Box>
        <SearchBar id="filterLeague" color={accent} type={"League: "} get={setLeague}>
          <VisuallyHidden>Search for a League, example: l1</VisuallyHidden>
        </SearchBar>
        <SearchBar id="searchCountry" color={accent} type={"Contry: "} get={setContry}>
          <VisuallyHidden>
            Search for a Country, example: england
          </VisuallyHidden>
        </SearchBar>
        <SearchBar id="filterSeason" color={accent} type={"Season: "} get={setSeason}>
          <VisuallyHidden>Search for a Season, example 2016</VisuallyHidden>
        </SearchBar>
        <SearchBar id="searchHT" color={accent} type={"Home Team: "} get={setHt}>
          <VisuallyHidden>
            Search for a home-team, example Stoke City
          </VisuallyHidden>
        </SearchBar>
        <SearchBar id="searchAT" color={accent} type={"Away Team: "} get={setAt}>
          <VisuallyHidden>
            Search for a away-team, example Everton
          </VisuallyHidden>
        </SearchBar>
        <Button
          id="filterAndSearchButton"
          border="2px"
          borderColor={accent}
          color={accent}
          background={"white"}
          textAlign={"center"}
          //Passing search parameters back to App.tsx
          onClick={() => handleApplyFilter(league, contry, season, ht, at)}
        >
          -Filter and search!
          <BsSearch />-
        </Button>
      </Grid>
    </Box>
  );
};

export default FilterBox;
