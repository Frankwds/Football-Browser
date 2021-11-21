import React from 'react';
import { gql, useQuery, useMutation} from '@apollo/client';

// Make sure that both the query and the component are exported
export const GET_DOG_QUERY = gql`
  query GetDog($name: String) {
    dog(name: $name) {
      id
      name
      breed
    }
  }
`;

export const DELETE_DOG_MUTATION = gql`
  mutation deleteDog($name: String!) {
    deleteDog(name: $name) {
      id
      name
      breed
    }
  }
`;

export function Dog({ name } : any) {
  const { loading, error, data } = useQuery(
    GET_DOG_QUERY,
    { variables: { name } }
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <p>
      {data.dog.name} is a {data.dog.breed}
    </p>
  );
}

export function DeleteButton() {
    const [mutate, { loading, error, data }] = useMutation(DELETE_DOG_MUTATION, {
        onCompleted: (data) => {console.log(data)}
    });
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;
    if (data) return <p>Deleted!</p>;
  
    return (
      <button onClick={() => mutate({ variables: { name: 'Buck' } })}>
        Click to Delete Buck
      </button>
    );
  }