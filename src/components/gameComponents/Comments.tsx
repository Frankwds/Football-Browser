import { ChevronRightIcon } from "@chakra-ui/icons";

import {
  InputGroup,
  InputRightElement,
  Button,
  Input,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useState } from "react";

export const COMMENTONGAME = gql`
  mutation Mutation($gameId: String!, $comment: String!) {
    commentOnGame(gameID: $gameId, comment: $comment) {
      id_odsp
      comments
    }
  }
`;

type Props = {
  id: string;
  comments: string[];
  callbackFunc: (comments: string[]) => void;
};

/**
 * Comments - Presents activity feed
 *
 * @param isAdmin
 *
 * @returns {React.FC}
 *
 * Enables users to see and add new activities. Extends the properties of admin-users to also be able to edit and delete activities.
 * Gives possibilites to sort activities on date, maxParticipants and lexicographic order.
 *
 * Handles persistence and retrieves data through ../api/firebase.ts
 */

const Comments: React.FC<Props> = (props) => {
  const [comments, setComments] = useState(props.comments);

  const [messageInput, setMessageInput] = useState("");

  const externalMutation = (data: any) => {
    props.callbackFunc(data.data.commentOnGame.comments);
  };

  const [mutateFunction, { data, loading, error }] = useMutation(
    COMMENTONGAME,
    {
      onCompleted: (data) => {
        externalMutation({ data });
      },
    }
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>StupidFrankError :(</p>;

  const handleSendMessage = () => {
    console.log("Yo sendin a message");
    if (messageInput === "") return;
    setComments([...comments, messageInput]);

    mutateFunction({ variables: { gameId: props.id, comment: messageInput } });

    setMessageInput("");
  };

  return (
    <div id="commentComponent" key={comments.length}>
      <InputGroup size="md">
        <Input
          testid="comment-input-field"
          border="1px solid black"
          marginRight="5px"
          placeholder="Skriv en melding"
          //value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        ></Input>
        <InputRightElement width="6.5rem">
          <Button
          testid = "commentButton"
            backgroundColor="teal"
            h="2rem"
            size="sm"
            onClick={handleSendMessage}
            rightIcon={<ChevronRightIcon fontSize="24px" />}
          >
            Comment
          </Button>
        </InputRightElement>
      </InputGroup>
      {comments.map((comment, index) => {
        return (
          <Flex key={comment+index}>
            <Text padding="10px" borderRadius="10px" fontWeight="bold">
              {comment}
            </Text>
          </Flex>
        );
      })}
    </div>
  );
};
export default Comments;
