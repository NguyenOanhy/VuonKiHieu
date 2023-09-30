import React from "react";
import { Flex, Input, Button } from "@chakra-ui/react";

const Footer = ({ inputMessage, setInputMessage, handleSendMessage }) => {
  return (
    <Flex w="100%" mt="5">
      <Input
        placeholder="Nhập văn bản..."
        border="none"
        borderRadius="20px"
        _focus={{
          border: "1px solid black",
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <Button
        bg="#D15A7E"
        color="white"
        borderRadius="10px"
        _hover={{
          bg: "white",
          color: "#D15A7E",
          border: "1px solid #D15A7E",
          
        }}
        disabled={inputMessage.trim().length <= 0}
        onClick={handleSendMessage}
      >
        Gửi
      </Button>
    </Flex>
  );
};

export default Footer;
