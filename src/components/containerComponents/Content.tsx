import React from "react";
import FilterBox from "../sortingComponents/FilterBox";
import PageChanger from "../sortingComponents/PageChanger";
import GamesList from "./../queryComponents/GamesList";
import { useState } from "react";
import { useProps } from "@chakra-ui/system";
import { Grid } from "@chakra-ui/react";
import { gql } from "apollo-server";

type Props = {
  color: string;
  accent: string;
};

/**
 * Content - Presents football matches
 *
 * @param props
 *
 * @returns {React.FC}
 *
 * Returns the component displaying the football matches. In order to facilitate responsiveness and
 * ease of use only a few matches are displayed at the time. The component contains a page changer
 * which utilizes a callback-function to change which matches are displayed.
 *
 * HandleCallback logic: When clicking on the PageChanger the value of
 * the callback-function changes, thus changing the value of the state variable "page". The "page" variable
 * passed to GamesList decides which matches to be displayed thorugh a GraphQL query.
 */

const Content: React.FC<Props> = (props) => {
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const pagesize = 3;

  const pageChanger = (nextPage: number) => {
    if (nextPage < 0 || nextPage >= Math.ceil(lastPage / pagesize)){}
    else
      setPage(nextPage);
  };



  return (
    <div className={"Content"}>
      <Grid templateColumns="repeat(2, 1fr)" gap={10}>
        <FilterBox color={props.color} accent={props.accent} />
        <div className={"Result"}>
          <PageChanger
            page={page}
            lastpage={lastPage}
            pageSize={pagesize}
            func={pageChanger}
            color={props.color}
            accent={props.accent}
          />
          <GamesList
            page={page}
            pageSize={pagesize}
            setLastPageFunc={setLastPage}
            color={props.color}
            accent={props.accent}
          />
        </div>
      </Grid>
    </div>
  );
};

export default Content;
