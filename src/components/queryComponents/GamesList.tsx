import { useQuery, gql } from "@apollo/client";
import Game from "./../gameComponents/Game";
import { useSelector } from "react-redux";
import { StateType } from "../../redux/StateType";
const GETGAMEDATA = gql`
  query Query(
    $league: String
    $country: String
    $season: String
    $ht: String
    $at: String
    $page: Int
    $pageSize: Int
    $param: String
    $accending: Boolean
  ) {
    GetGamesFilterList(
      league: $league
      country: $country
      season: $season
      ht: $ht
      at: $at
      page: $page
      pageSize: $pageSize
      param: $param
      accending: $accending
    ) {
      num
      games {
        id_odsp
        league
        country
        ht
        at
      }
    }
  }
`;
type Props = {
  func: any;
  page: number;
  pageSize: number;
  color: string;
  accent: string;
};

/**
 * GameData - Displaying football matches
 *
 * @param page
 * @param pageSize
 * @param color
 * @param accent
 * @param func
 *
 * @returns {React.FC}
 *
 * Data is retrieved by means of the GraphQL query @constant GETGAMEDATA through
 * the @function useQuery in the @link @apollo/client library.
 *
 */

const GameData: React.FC<Props> = ({ page, pageSize, func }) => {
  //Uses a hook on the values of the redux searchFilter store.
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
  const accending = useSelector(
    (state: StateType) => state.searchQueries.searchQueries.acc
  );
  const param = useSelector(
    (state: StateType) => state.searchQueries.searchQueries.sort
  );

  if (param) {
    console.log(param);
  } else {
    console.log("sort is undefined");
  }
  if (accending) {
    console.log(accending);
  } else {
    console.log("acc is undefined");
  }

  // Automatically queries again on initial render and change in the searchFilter store.
  const { loading, error, data } = useQuery(GETGAMEDATA, {
    variables: {
      league,
      country,
      season,
      ht,
      at,
      page,
      pageSize,
      accending,
      param,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>404: Data not found :(</p>;

  func(() => data?.GetGamesFilterList.num);

  return data?.GetGamesFilterList.games.map(
    ({ id_odsp, ht, at, country, league }: any) => (
      <Game
        key={id_odsp}
        id={id_odsp}
        country={country}
        series={league}
        homeTeam={ht}
        awayTeam={at}
      />
    )
  );
};
export default GameData;
