import "./../style.css";

import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";

import React from "react";

type Props = {
  get: (childData: string) => void;
  color: string;
  type: string;
  testid: string;
};

/**
 * SearchBar - Input fields to be used as search parameters
 *
 * @param get
 * @param color
 * @param type
 *
 * @returns {React.FC}
 *
 * The @param get is a hook passed from @link {FilterBox.tsx}
 *
 */

const SearchBar: React.FC<Props> = ({ get, color, type, testid }) => {
  return (
    <InputGroup>
      <InputLeftAddon
        children={type}
        background={color}
        color={"white"}
        border={"none"}
      />
      <Input
        testid = {testid}
        onChange={(event) => get(event.currentTarget.value)}
        placeholder={"All"}
        background={"white"}
        focusBorderColor={color}
      />
    </InputGroup>
  );
};

export default SearchBar;
