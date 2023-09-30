import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { getDataFromFirestoreById } from "../../firebase";


const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [Quiz, setQuiz] = useState([]);

  useEffect(() => {
    getQuizz()
  }, [])

  function getQuizz() {
    const QuizRef = collection(db, 'Quiz')
    getDocs(QuizRef)
      .then(Response => {
        const Quizz = Response.docs.map(doc => ({
          data: doc.data(),
          id: doc.id,
        }))
        // console.log(Quizz)
        setQuiz(Quizz) 
        console.log(Quiz)
      })
      .catch(error => console.log(error.message))
  }

  const handleAnswerButtonClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < Quiz.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
  };

  return (
    <div className='mt-40'>
      {Quiz.length > 0 && (
        <div className='text-white my-10 mx-20 rounded-lg px-20 py-10 shadow-xl flex bg-gradient-to-tr from-yellow-400 to-pink-500'>
          {showScore ? (
            <div>
              <div className='flex text-2xl items-center'>
                You scored {score} out of {Quiz.length}
              </div>
              <button
                className='text-lg text-white bg-gradient-to-t from-orange-400 to-pink-500 border border-red-500 rounded-lg flex p-2 items-center justify-center cursor-pointer'
                onClick={handleRestart}
              >
                Restart
              </button>
            </div>
          ) : (
            <>
              <div className='w-full relative'>
                <div className='mb-10'>
                  <span className='text-4xl font-bold'>
                    Question {currentQuestion + 1}/{Quiz.length}
                  </span>
                </div>
                    <video id="videoPlayer" width="320" height="240" controls>
                      <source src={Quiz[currentQuestion]?.questionUrl} type="video/mp4" />
                    </video>
              </div>

              <div className='w-full flex flex-col justify-between gap-2'>
                {Quiz[currentQuestion]?.data?.answerOptions?.map((answerOption, index) => (
                  <button
                    key={index}
                    className='w-full text-lg text-white bg-gradient-to-t from-orange-400 to-pink-500 border border-red-500 rounded-lg flex p-2 items-center justify-center cursor-pointer'
                    onClick={() => handleAnswerButtonClick(answerOption.isCorrect)}
                  >
                    <span>{answerOption.answerText}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      ) 
      }
    </div>
  );
};

export default Quiz;
