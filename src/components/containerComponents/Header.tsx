import React from "react";
import { Heading } from "@chakra-ui/react"
import football from "./../../resources/football.jpg";

const acc = "rgb(0,128,128)";
/**
 * React class component displaying the header of the application
 * 
 * @returns {React.Component}
 */
class Header extends React.Component {
  render() {
    return (
      <div id={"header"}>
        <Heading bg={acc} color={"white"} textAlign="center">WebDev Project3 - Football browser</Heading>
        <img className={"imgR"} src={football} alt="football icon" />
        
      </div>
    );
  }
}

export default Header;
