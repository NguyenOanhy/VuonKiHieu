import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [quizData, setQuizData] = useState([]);

  
  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    try {
      const quizRef = collection(db, 'Quiz');
      const response = await getDocs(quizRef);
      const quizArray = response.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }));
      setQuizData(quizArray);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleAnswerButtonClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
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
      {quizData.length > 0 && (
        <div className='text-white my-10 mx-20 rounded-lg px-20 py-10 shadow-xl flex bg-gradient-to-tr from-yellow-400 to-pink-500'>
          {showScore ? (
            <div className='flex flex-col'>
              <div className='flex text-2xl pb-2'>
                Điểm của bạn là {score}/{quizData.length}
              </div>
              <button
                className='text-lg text-white bg-gradient-to-t from-orange-400 to-pink-500 border border-red-500 rounded-lg flex p-2 items-center justify-center cursor-pointer'
                onClick={handleRestart}
              >
                Bắt đầu lại
              </button>
            </div>
          ) : (
            <>
              <div className='w-full relative'>
                <div className='mb-10'>
                  <span className='text-4xl font-bold'>
                    Câu hỏi {currentQuestion + 1}/{quizData.length}
                  </span>
                </div>
                <img
                  src={quizData[currentQuestion]?.data?.questionUrl}
                  alt='Question'
                  width='70%'
                />
              </div>

              <div className='w-full flex flex-col gap-4 items-center justify-center'>
                {quizData[currentQuestion]?.data?.answerOptions?.map(
                  (answerOption, index) => (
                    <button
                      key={index}
                      className='w-full text-lg text-white bg-gradient-to-t from-orange-400 to-pink-500 border border-red-500 rounded-lg flex p-2 items-center justify-center cursor-pointer'
                      onClick={() =>
                        handleAnswerButtonClick(answerOption.isCorrect)
                      }
                    >
                      <span>{answerOption.answerText}</span>
                    </button>
                  )
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
