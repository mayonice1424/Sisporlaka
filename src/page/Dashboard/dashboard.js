import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import Login from "../login";


const HomeComp = (props) => {
  const data = props.data;

  return (
    <>
     {data.role === "dinas-perhubungan" ? (
        Navigate("/dishub")
      ) : data.role === "polisi" ? (
        Navigate ("/polisi")
      ) : data.role === "jasa-raharja" ? (
        Navigate ("/pt-jasa-raharja")
      ) : data.role === "dinas-kesehatan" ? (
        Navigate ("/dinkes")
      ) : data.role === "rumah-sakit" ? (
        Navigate ("/rs"))
      : ( <Flex>
        <Text color={"red"}>Halaman Role {data.role}</Text>
      </Flex>
      )}

    </>
  );
}
  export default HomeComp;