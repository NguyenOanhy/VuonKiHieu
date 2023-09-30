import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import Divider from "./Divider";
import Footer from "./Footer";
import Messages from "./Messages";
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([
    { from: "computer", text: "Xin chào, tên tôi là Claude" },
    { from: "me", text: "Chào bạn" },
    { from: "me", text: "Chúng tôi là Winx Club" },
    {
      from: "computer",
      text:
        "Tôi là một trợ lý ảo được tạo ra để giúp bạn tìm kiếm thông tin"
    },
    { from: "me", text: "Rất vui được gặp bạn" },
    {
      from: "computer",
      text:
        "Bạn muốn hỏi gì nhỉ?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const fetchData = async (text) => {
    try {
      const response = await axios.post('http://localhost:3001/api/chatbot', { text: text });
      setMessages((old) => [...old, { from: "computer", text: response.data }]);
    } catch (error) {
      console.log(error);
    
      }
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const data = inputMessage;

    setMessages((old) => [...old, { from: "me", text: data }]);
    setInputMessage("");

    fetchData(data)
  };

  return (
    <Flex position="absolute" bottom="4" top="0" w="100%" h="100%" justify="center">
    <Flex w={["100%", "100%", "50%"]} flexDir="column">
      <Divider />
        <Messages messages={messages} />
      <Divider />
      <Footer
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSendMessage={handleSendMessage}
      />
    </Flex>
  </Flex>
  );
};

export default Chat;
