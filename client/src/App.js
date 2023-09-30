import React from "react";
import { Public, Home, Login, Forgotpassword, Signup, Topic, Quiz, Alphabet, ChatBot} from "./containers/public";
import { Animal, Nature, Emotion, Color, Family, Basic,} from "./components";
import { Library, Private, Contact } from "./containers/private";
import { Routes, Route, useParams } from "react-router-dom";
import path from "./utils/path";
import Video from "./components/Video";
 
const topicList = ["Animal", "Nature", "Emotion", "Color", "Family", "Basic", ];
function getTopicComponent(topicName) {
  const topics = { Animal, Nature, Emotion, Color, Family, Basic, };
    if (topicName in topics) {
      return topics[topicName];
    }
    throw new Error(`Unsupported topic: ${topicName}`);
}

export default function App() {
  return (
    <>
      <div className="">
        <Routes>
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.HOME} element={<Home isLoggedIn={false}/>} />
            <Route path={path.TOPIC} element={<Topic />} />
            <Route path={path.CHATBOT} element={<ChatBot/>} />
            <Route path={path.QUIZ} element={<Quiz />} />
            <Route path={path.ALPHABET} element={<Alphabet />}> 
            </Route>
            //... get topic
            {topicList.map((selectedTopic, index) => {
              const TopicComponent = getTopicComponent(selectedTopic);
              return (
                <Route key={index} path={`${path.TOPIC}/${selectedTopic}`} element={<TopicComponent />}/>
              );
            })}

            //... get details
            {topicList.map((selectedTopic) => {
              return (
                <Route path={`${path.TOPIC}/${selectedTopic}/:item`} element={<Video />} />
              );
            })}

          </Route>
          <Route path={path.LOGIN} element={<Login/>} /> 
          <Route path={path.FORGOTPW} element={<Forgotpassword/>} />
          <Route path={path.SIGNUP} element={<Signup/>} />
          <Route path={path.PRIVATE} element={<Private/>}>
          //... get topic
            {topicList.map((selectedTopic, index) => {
              const TopicComponent = getTopicComponent(selectedTopic);
              return (
                <Route key={index} path={`${path.TOPIC}/${selectedTopic}`} element={<TopicComponent />}/>
              );
            })}

            //... get details
            {topicList.map((selectedTopic) => {
              return (
                <Route path={`${path.TOPIC}/${selectedTopic}/:item`} element={<Video />} />
              );
            })}
            <Route path={path.HOME} element={<Home isLoggedIn/>} />
            <Route path={path.TOPIC} element={<Topic isLoggedIn/>} />
            <Route path={path.CHATBOT} element={<ChatBot/>} />
            <Route path={path.ALPHABET} element={<Alphabet />} />
            <Route path={path.QUIZ} element={<Quiz />} />
            <Route path={path.LIBRARY} element={<Library />} />
            <Route path={path.CONTACT} element={<Contact />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}