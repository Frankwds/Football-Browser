import Rating from "./Rating";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import GameModal from "./GameModal";
import {
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";

const GETUSERDATA = gql`
  mutation GetUserDataByGameIDMutation($gameId: String!) {
    GetUserDataByGameID(gameID: $gameId) {
      ratings
      id_odsp
      comments
    }
  }
`;

type Props = {
  id: string;
  country: string;
  series: string;
  homeTeam: string;
  awayTeam: string;
};

/**
 * Game - Functional component representing football match
 *
 * @param props
 *
 * @returns {React.FC}
 *
 * Retrieves data about football matches through the GraphQL query @constant GETUSERDATA through the @function useQuery in the @link @apollo/client library.
 * Utilises multiple hooks to keep track of rating, reviews and comments on a match.
 *
 */

const Game: React.FC<Props> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rating, setRating] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const [comments, setComments] = useState([""]);

  //Calculating mean rating of a match
  const calcMeanRating = (ratingArray: [number]) => {
    let sumRating = 0;
    let numRatings = ratingArray.length;
    for (let index in ratingArray) {
      sumRating += ratingArray[index];
    }
    return sumRating / numRatings;
  };

  //Initialising user data
  const setInitialUserData = (callbackData: any) => {
    let ratingsArray = callbackData.data.GetUserDataByGameID.ratings;
    let meanRating = calcMeanRating(ratingsArray);
    setRating(meanRating);
    setNumReviews(ratingsArray.length);
    setComments(callbackData.data.GetUserDataByGameID.comments);
  };

  //Hook handling rating of match
  const callbackOnRate = (callbackData: any) => {
    let ratingsArray = callbackData.data.rateGame.ratings;
    let meanRating = calcMeanRating(ratingsArray);
    setRating(meanRating);
    setNumReviews(ratingsArray.length);
  };

  //Hook handling comments on match
  const callbackOnComment = (comments: string[]) => {
    setComments(comments);
  };
  const [mutateFunction, { loading, error, data }] = useMutation(GETUSERDATA, {
    variables: {
      gameId: props.id,
    },
    onCompleted: (data) => {
      setInitialUserData({ data });
    },
  });
  if (loading) return <p>Loading Ratings...</p>;
  if (error) return <p>StupidFrankRatingError :(</p>;

    return (
    <Box
      d="flex"
      flexDirection="column"
      bg="lightGray"
      borderRadius="lg" // Rounded corners
      p={4}
      color="black"
      onClick={() => onOpen()}
      onKeyPress={(key) => {
        if (key.key == "Enter" && !isOpen) {
          onOpen();
        }
      }}
      margin={"10px"}
      tabIndex={0}
    >
      <Box>
        <p>
          {props.country} {props.series}
        </p>
        <p>
          {props.homeTeam} - vs - {props.awayTeam}
        </p>
      </Box>

      <Rating
        id={props.id}
        rating={rating}
        numReviews={numReviews}
        callbackOnRate={callbackOnRate}
      ></Rating>

      <Modal
        scrollBehavior="inside"
        isOpen={isOpen}
        size="xl"
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {props.homeTeam} vs {props.awayTeam}{" "}
          </ModalHeader>
          <ModalCloseButton />
          {isOpen && (
            <GameModal
              id={props.id}
              country={props.country}
              series={props.series}
              homeTeam={props.homeTeam}
              awayTeam={props.awayTeam}
              callbackOnRate={callbackOnRate}
              callbackOnComment={callbackOnComment}
              rating={rating}
              numReviews={numReviews}
              comments={comments}
            />
          )}
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Game;
