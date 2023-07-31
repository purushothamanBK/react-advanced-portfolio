import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Spinner } from '@chakra-ui/react'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const LandingSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen, onClose } = useAlertContext();

  const optionValues = ["hireMe", "openSource","other"]
  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      typeEnquiry: "",
      comment: ""
    },
    onSubmit: async (value) => {
      await submit("http://someur.com", value)

      if (response == null) {
        onOpen("error", "Something went wrong, please try again later!")
      } else {
        onOpen(response.type, response.message)
      }
      // await wait(1000);
      // onClose()
    },


    validationSchema: Yup.object({
      firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      typeEnquiry: Yup.string().oneOf(optionValues, 'Please select a type').required("Required"),
      comment: Yup.string().min(25, 'Must be at least 25 characters').max(100, 'Too Long!').required('Required'),
    }),
  });

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack maxWidth="600px" p={2} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box zIndex="0" p={6} rounded="md" w="100%" >
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl isInvalid={formik.touched.firstName && formik.errors.firstName ? true : false}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.touched.email && formik.errors.email ? true : false}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>       
              <FormControl isInvalid={formik.touched.typeEnquiry && formik.errors.typeEnquiry ? true : false}>                
                <FormLabel htmlFor="typeEnquiry">Type of enquiry</FormLabel>
                <Select id="typeEnquiry" name="typeEnquiry" onChange={formik.handleChange} style={{ color: "black" }}
                  onBlur={formik.handleBlur}
                  value={formik.values.typeEnquiry}>
                  <option value="">Select Enquiry type</option>
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">Open source consultancy session</option>
                  <option value="other">Other</option>
                </Select>
                <FormErrorMessage>{formik.errors.typeEnquiry}</FormErrorMessage>
              </FormControl>
             
              <FormControl isInvalid={formik.touched.comment && formik.errors.comment ? true : false}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.comment}
                />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>
                {isLoading ? <a><Spinner /></a> : <Button type="submit" colorScheme="purple" width="full" >
                Submit
              </Button>}
            </VStack>
          </form>
      
        </Box>
      </VStack>


    </FullScreenSection>
  );
};

export default LandingSection;
