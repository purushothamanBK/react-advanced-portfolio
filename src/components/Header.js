import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack, position } from "@chakra-ui/react";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto: hello@example.com",
  },
  {
    icon: faGithub,
    url: "https://github.com",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com",
  },
  {
    icon: faMedium,
    url: "https://medium.com",
  },
  {
    icon: faStackOverflow,
    url: "https://stackoverflow.com",
  },
];

const Header = () => {

  const ref = useRef()

  const handleScroll=()=>{
    console.log("scrolling")

    if(scrollUp){
      ref.current.translateY(-200)
    } else{
      ref.current.translateY(0)
    }
  }
  let oldScrollY = 0;


  const controlDirection = () => {
      if(window.scrollY > oldScrollY) {
        ref.current.style.transform = "translateY(-200px)"       
      } else {
        ref.current.style.transform = "translateY(0)"
      }
      oldScrollY = window.scrollY;
  }
  
  useEffect(() => {
      window.addEventListener('scroll', controlDirection);
      return () => {
          window.removeEventListener('scroll', controlDirection);
      };
  },[]);
  const handleClick = (e) => {
      e.preventDefault();
    const anchor = e.target.name
    console.log("clicked")
   
    const id = `${anchor}-section`;
    console.log(id)
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <Box

    zIndex="2"
      position="fixed"
      top={0}
      left={0}
      right={0}
      translateY={0}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"   
      ref={ref}
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            <HStack spacing={2}>
            {socials.map(item=>{
              return <a href={item.url} key={item.url}><FontAwesomeIcon icon={item.icon} size="2x" /> </a>
            })}
            </HStack>
                      
          </nav>
          <nav>
            <HStack spacing={8}>
             <a onClick={handleClick} name="projects" href="/#Projects" >Projects</a>
             <a onClick={handleClick} name="contactme" href="/#contact-me" >Contact Me</a>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};
export default Header;
