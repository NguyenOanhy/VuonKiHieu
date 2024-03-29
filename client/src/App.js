import React from "react";
import { Public, Home, Login, Forgotpassword, Signup, Topic, Quiz, Alphabet, ChatBot} from "./containers/public";
import { Animal, Nature, Emotion, Color, Family, Basic,} from "./components";
import { Library, Private, Contact, Detection } from "./containers/private";
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
           
            {topicList.map((selectedTopic, index) => {
              const TopicComponent = getTopicComponent(selectedTopic);
              return (
                <Route key={index} path={`${path.TOPIC}/${selectedTopic}`} element={<TopicComponent/>}/>
              );
            })}

          
            {topicList.map((selectedTopic) => {
              return (
                <Route key={selectedTopic} path={`${path.TOPIC}/${selectedTopic}/:item`} element={<Video topic={selectedTopic}/>} />
              );
            })}

          </Route>
          <Route path={path.LOGIN} element={<Login/>} /> 
          <Route path={path.FORGOTPW} element={<Forgotpassword/>} />
          <Route path={path.SIGNUP} element={<Signup/>} />
          <Route path={path.PRIVATE} element={<Private/>}>
          
            {topicList.map((selectedTopic, index) => {
              const TopicComponent = getTopicComponent(selectedTopic);
              return (
                <Route key={index} path={`${path.TOPIC}/${selectedTopic}`} element={<TopicComponent isLoggedIn/>}/>
              );
            })}

          
            {topicList.map((selectedTopic, index) => {
              return (
                <Route key={index} path={`${path.TOPIC}/${selectedTopic}/:item`} element={<Video topic={selectedTopic}/>} />
              );
            })}
            <Route path={path.HOME} element={<Home isLoggedIn/>} />
            <Route path={path.TOPIC} element={<Topic isLoggedIn/>} />
            <Route path={path.CHATBOT} element={<ChatBot/>} />
            <Route path={path.ALPHABET} element={<Alphabet />} />
            <Route path={path.QUIZ} element={<Quiz />} />
            <Route path={path.LIBRARY} element={<Library />} />
            <Route path={path.CONTACT} element={<Contact />} />
            {/* <Route path={path.DETECTION} element={<Detection />} /> */}
          </Route>
        </Routes>
      </div>
    </>
  );
}