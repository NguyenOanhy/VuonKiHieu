import React, { useEffect, useRef } from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";

const Messages = ({ messages }) => {
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  return (
    <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3" sx={{ '::-webkit-scrollbar': { display: 'none' } }}>
      {messages.map((item, index) => {
        if (item.from === "me") {
          return (
            <Flex key={index} w="100%" justify="flex-end">
              <Flex
                bg="#F8EAEE"
                color="black"
                minW="100px"
                maxW="350px"
                my="1"
                p="3"
                borderRadius="10px"
              >
                <Text>{item.text}</Text>
              </Flex>
            </Flex>
          );
        } else {
          return (
            <Flex key={index} w="100%">
              <Avatar
                name="Computer"
                src="/asset/ChatBot.png" 
                bg="transparent"
              ></Avatar>
              <Flex
                bg="#D15A7E"
                color="white"
                minW="100px"
                maxW="350px"
                my="1"
                p="3"
                borderRadius="10px"
              >
                <Text>{item.text}</Text>
              </Flex>
            </Flex>
          );
        }
      })}
      <AlwaysScrollToBottom />
    </Flex>
  );
};

export default Messages;
