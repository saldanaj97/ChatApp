import React from "react";
import { Avatar, Box, Flex, Heading, IconButton, Text, Menu, Button, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"

const Bio = () => {
    return (
        <Flex direction='column' justifyContent='center' bg=''>
            <Flex justifyContent='center'><Avatar className='avatar' size='md' /></Flex>
            <Text textAlign='center' color='white' fontSize='16px'>Test Name</Text>
            <Flex m='5px 5px'><Text color='white' fontSize='13px'>This will be a test bio that will hold whatever the user wants to say. </Text></Flex>
        </Flex >
    )
}

export default Bio