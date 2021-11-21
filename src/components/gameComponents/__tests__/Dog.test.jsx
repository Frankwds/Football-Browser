import { InMemoryCache} from "@apollo/client";

import { MockedProvider} from '@apollo/client/testing';
import { GET_DOG_QUERY, Dog, DeleteButton,  DELETE_DOG_MUTATION  } from '../Dog';
import { act } from "react-dom/test-utils";
import TestRenderer from 'react-test-renderer';
import ReactDOM from "react-dom";
import waitForExpect from "wait-for-expect";
import { getByTestId, getByText, prettyDOM } from "@testing-library/react";
import e from "cors";


it('renders without error', async () => {
  const mocks = [
    {
      request: {
        query: GET_DOG_QUERY,
        variables: {
          name: 'Buck',
        },
      },
      result: {
        data: {
          dog: { id: '1', name: 'Buck', breed: 'bulldog' },
        },
      },
    },
  ];

  const container = document.createElement("div");

  // Render
  act(() => {
    ReactDOM.render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Dog name="Buck" />
      </MockedProvider>
      ,
      container);
    });

  expect(container).toHaveTextContent("Loading")

  await act( async () => {
    await new Promise(resolve => setTimeout(resolve, 100)); // wait for response
  });

  expect(container).toHaveTextContent("Buck");
});



it('should render loading state initially and then delete', async () => {
  const deleteDog = { name: 'Buck', breed: 'Poodle', id: 1 };
  const mocks = [
    {
      request: {
        query: DELETE_DOG_MUTATION,
        variables: { name: 'Buck' },
      },
      result: { data: { deleteDog } },
    },
  ];

  const container = document.createElement("div");

   act(() => {
     ReactDOM.render(
     <MockedProvider mocks={mocks} addTypename={false}>
       <DeleteButton />
     </MockedProvider>,
     container);
    });

      const button = getByText(container, "Click to Delete Buck");

      expect(container).toHaveTextContent("Click to Delete Buck")

      act(() => {
      // click the button
          button.dispatchEvent(new MouseEvent("click", {bubbles: true}));
      });

      expect(container).toHaveTextContent("Loading...")

      await act( async () => {
        await new Promise(resolve => setTimeout(resolve, 100)); // wait for response
      });

      expect(container).toHaveTextContent("Deleted!")
});

// const component = TestRenderer.create(

// <MockedProvider mocks={mocks} addTypename={false}>
//   <DeleteButton />
// </MockedProvider>,
// );

// // Locate rating button and prepare for click
// const button = component.root.findByType('button');
// button.props.onClick(); // fires the mutation

// // Wait for mutation to load
// await act( async () => {
//   await new Promise(resolve => setTimeout(resolve, 100)); // wait for response
// });

// const tree = component.toJSON();
// expect(tree.children).toContain('Deleted!')