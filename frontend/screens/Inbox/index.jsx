import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { StompSessionProvider, useSubscription } from "react-stomp-hooks";

function Inbox() {
  // const token = localStorage.getItem("token");
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbGlAZ21haWwuY29tIiwiaWF0IjoxNzA1MjM3OTE4LCJleHAiOjE3MDUyNDE1MTh9.9_fnOFc-M2VQuCH4Bvp8CpPScZopMVv7y5Xs8pQ9lMU";
  return (
    <StompSessionProvider
      brokerURL="ws://localhost:8005/ws"
      connectHeaders={{
        Authorization: "Bearer " + token,
      }}
    >
      <ChatComponent />
    </StompSessionProvider>
  );
}

function ChatComponent() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    console.log(messages);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </SafeAreaView>
  );
}

export default Inbox;
