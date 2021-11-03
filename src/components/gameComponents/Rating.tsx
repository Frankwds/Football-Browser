import { gql, useMutation } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

// Define type of input properties in the Rating method
interface RatingProps {
  id: string;
  rating: number;
  numReviews: number;
  callbackOnRate: (callbackData: any) => void;
}

//Mutation query for adding comment to game
const RATEGAME = gql`
  mutation Mutation($gameId: String!, $rating: Int!) {
    rateGame(gameID: $gameId, rating: $rating) {
      id_odsp
      ratings
    }
  }
`;

/**
 * Rating - Functional component representing rating of football match
 *
 * @param id
 * @param rating
 * @param numReviews
 * @param callbackOnRate
 *
 * @returns {RatingProps}
 *
 * Posts comment about football matches through the GraphQL query @constant COMMENTONGAME
 * through the @function useQuery in the @link @apollo/client library.
 *
 */

const Rating = ({ id, rating, numReviews, callbackOnRate }: RatingProps) => {
  //Callback function to handle that rating has been changed
  const externalMutation = (data: any) => {
    callbackOnRate(data);
    //console.log(data);
  };

  //Function creating mutation query with data
  const [mutateFunction, { data, loading, error }] = useMutation(RATEGAME, {
    onCompleted: (data) => {
      externalMutation({ data });
    },
  });
  if (loading) return <p>Loading Ratings...</p>;
  if (error) return <p>StupidFrankRatingError :(</p>;

  //Rendering 5 star array where stars will be filled accoriding to their numeric rating
  return (
    <Box d="flex" flexDirection="row" alignItems="center">
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: "1" }}
                color={i < rating ? "teal.500" : "gray.300"}
                onClick={() => {
                  mutateFunction({ variables: { gameId: id, rating: i + 1 } });
                }}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return (
              <BsStarHalf
                key={i}
                style={{ marginLeft: "1" }}
                onClick={() => {
                  mutateFunction({ variables: { gameId: id, rating: i + 1 } });
                }}
              />
            );
          }
          return (
            <BsStar
              key={i}
              style={{ marginLeft: "1" }}
              onClick={() => {
                mutateFunction({ variables: { gameId: id, rating: i + 1 } });
              }}
            />
          );
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} review{numReviews > 1 && "s"}
      </Box>
    </Box>
  );
};

export default Rating;
