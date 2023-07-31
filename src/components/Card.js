import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  
  return <VStack> 
    <img src={imageSrc} alt="image"/>
    <h2> {title}</h2>
    <p>{description} </p>
    <HStack><a>See More</a> <FontAwesomeIcon icon={faArrowRight} size="1x" /></HStack>
  </VStack>;
};

export default Card;
