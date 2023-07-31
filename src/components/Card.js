import {Box, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  
  return (
    <Box backgroundColor="white" borderRadius="10">
      <VStack > 
    <Image src={imageSrc} alt="image"  borderRadius={10} />
    <article>
    <b> {title}</b>
    <p>{description} </p>
    <HStack backgroundColor="none" > <b>See More</b> <FontAwesomeIcon icon={faArrowRight} size="1x" /></HStack>
    </article>
   
  </VStack>
    </Box>
  );
};

export default Card;
