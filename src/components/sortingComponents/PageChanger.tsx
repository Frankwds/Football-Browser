import { Box, Center, Select } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import "./../style.css";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
} from "react-icons/ai";

import { StateType } from "../../redux/StateType";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  func: any;
  page: number;
  lastpage: number;
  color?: string;
  accent?: string;
  pageSize: number;
};

/**
 * Page changer - Handler for changing which matches are displayed
 *
 * @param func
 * @param color
 * @param accent
 * @param page
 *
 *
 *
 * @returns {React.FC}
 *
 * The func parameter is the callback-function passed on from @link {../containerComponents/Content.tsx}
 */

const PageChanger: React.FC<Props> = ({
  func,
  color,
  accent,
  page,
  lastpage,
  pageSize,
}) => {
  const updateSearchQueries = useDispatch();

  const acc = useSelector(
    (state: StateType) => state.searchQueries.searchQueries.acc
  );
  const league = useSelector(
    (state: StateType) => state.searchQueries.searchQueries.league
  );
  const country = useSelector(
    (state: StateType) => state.searchQueries.searchQueries.country
  );
  const season = useSelector(
    (state: StateType) => state.searchQueries.searchQueries.season
  );
  const ht = useSelector(
    (state: StateType) => state.searchQueries.searchQueries.ht
  );
  const at = useSelector(
    (state: StateType) => state.searchQueries.searchQueries.at
  );

  const btIcon = () => {
    if (acc) {
      return <AiOutlineArrowUp />;
    } else {
      return <AiOutlineArrowDown />;
    }
  };
  const handleApplyFilter = (s: string) => {
    // Provide given search query object
    let a = false;
    if (acc) {
      a = false;
    } else {
      a = true;
    }

    updateSearchQueries({
      type: "UPDATE_SEARCH_DATA",
      payload: {
        league: league,
        country: country,
        season: season,
        ht: ht,
        at: at,
        sort: s,
        acc: a,
      },
    });
  };

  const [value, setValue] = useState("date");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let val = event.target.value;
    if (event.target.value == "") {
      val = "date";
    }
    setValue(val);
  };

  return (
    <Box
      fontSize="xl"
      color={accent}
      textAlign={"center"}
      bg={color}
      borderRadius="lg"
      h={"40px"}
    >
      {" "}
      <Center>
        <IconButton
          bg={color}
          color={accent}
          aria-label="Go page back"
          float={"left"}
          icon={<AiOutlineArrowLeft />}
          onClick={() => func(page - 1)}
        />
        <Box w="100%">
          Page: {page + 1} of {Math.ceil(lastpage / pageSize)}
        </Box>
        <Center w="100%">
          <Select value={value} onChange={handleChange} placeholder="Sort by:">
            <option value="date">Date</option>
            <option value="country">Country</option>
            <option value="league">League</option>
          </Select>
          <IconButton
            bg={color}
            color={accent}
            aria-label="Accending"
            icon={btIcon()}
            onClick={() => handleApplyFilter(value)}
          />
        </Center>
        <IconButton
          bg={color}
          color={accent}
          aria-label="Go page front"
          float={"right"}
          icon={<AiOutlineArrowRight />}
          onClick={() => func(page + 1)}
        />
      </Center>
    </Box>
  );
};

export default PageChanger;
