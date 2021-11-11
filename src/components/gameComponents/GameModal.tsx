import Rating from "./Rating";

import Comments from "./Comments";
import { ModalBody } from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";

type Props = {
  id: string;
  country: string;
  series: string;
  homeTeam: string;
  awayTeam: string;
  callbackOnRate: (callbackData: any) => void;
  callbackOnComment: (comments: string[]) => void;
  rating: number;
  numReviews: number;
  comments: string[];
};

const GETSINGLEGAME = gql`
  query GetGameDetailsByID($gameID: String!) {
    GetGameByID(gameID: $gameID) {
      date
      season
      fthg
      ftag
    }
  }
`;

/**
 * GameModal - Modal presenting information about football match
 *
 * @param props
 *
 * @returns {React.FC}
 *
 * Gives detailed information about football match.
 * Data is retrieved by means of the GraphQL query @constant GETSINGLEGAME through
 * the @function useQuery in the @link @apollo/client library.
 */

const GameModal: React.FC<Props> = (props) => {
  const { loading, error, data } = useQuery(GETSINGLEGAME, {
    variables: {
      gameID: props.id,
    },
  });

  //Presents game score of match
  const score = () => {
    let wt = data.GetGameByID.fthg;
    let wtn = props.homeTeam;
    let lt = data.GetGameByID.ftag;

    if (lt > wt) {
      wt = lt;
      lt = data.GetGameByID.fthg;
      wtn = props.awayTeam;
    } else if (lt == wt) {
      return (
        <p>
          Final score: {wt} - {lt}
        </p>
      );
    }
    return (
      <p>
        Final score: {wt} - {lt} to {wtn}!
      </p>
    );
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>404: Could not find data!</div>;
  }

  return (
    <ModalBody>
      <p>The id of the game is: {props.id}</p>
      <ul>
        <li>League: {props.series}</li>
        <li>Country: {props.country} </li>
        <li>Season: {data.GetGameByID.season}</li>
        <li>Date: {data.GetGameByID.date}</li>
        <li>Home team: {props.homeTeam}</li>
        <li>Away team: {props.awayTeam}</li>
        <li>{score()}</li>
      </ul>
      <br />
      <Rating
        id={props.id}
        rating={props.rating}
        numReviews={props.numReviews}
        callbackOnRate={props.callbackOnRate}
      ></Rating>
      <br />
      <Comments
        id={props.id}
        comments={props.comments}
        callbackFunc={props.callbackOnComment}
      />
      <br />
    </ModalBody>
  );
};

export default GameModal;
