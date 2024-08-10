"use client";

import { TfiClose } from "react-icons/tfi";
import './Review.module.css'
import styles from './Review.module.css';
import axiosInstance from "@/app/utils/axiosInstance";
import 'boxicons'

const { useEffect, useState } = require("react");

const Review = ({ vocabList, onFinish,oncancel }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState([]);
  const [inputAnswer, setInputAnswer] = useState('');
  const [currentWord, setCurrentWord] = useState(vocabList[currentIndex] || null);
  const [checkAnswerError, setAnswerError] = useState(false);
  const [reviewIncorrectWords, setReviewIncorrectWords] = useState(false);

  useEffect(() => {
    if (reviewIncorrectWords) {
      setCurrentWord(incorrectWords[0]);
    } else {
      setCurrentWord(vocabList[currentIndex] || null);
    }
  }, [currentIndex, vocabList, incorrectWords, reviewIncorrectWords]);

  const handleChangeAnswer = (e) => {
    setInputAnswer(e.target.value);
  }

  const handleCheckAnswer2 = async () => {
    const iduser = localStorage.getItem('iduser');
    if (inputAnswer.trim().toLowerCase() === currentWord.namevocab.trim().toLowerCase()) {
      try {
        const response = await axiosInstance.post(
          "api/site/vocab/review",
          {
            idvocab: currentWord.id,
            answerVocab: inputAnswer,
            redo: false
          },
          {
            params: {
              iduser: iduser,
            }
          }
        );

        if (response.data.status === 200) {
          if (reviewIncorrectWords) {
            const updatedIncorrectWords = incorrectWords.filter(word => word !== currentWord);
            setIncorrectWords(updatedIncorrectWords);
            if (updatedIncorrectWords.length === 0) {
              onFinish();
            } else {
              setCurrentWord(updatedIncorrectWords[0]);
            }
          } else {
            if (currentIndex < vocabList.length - 1) {
              setCurrentIndex(currentIndex + 1);
            } else {
              setReviewIncorrectWords(true);
              onFinish();
            }
          }
          setInputAnswer('');
        }

        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      setAnswerError(true);
      if (!incorrectWords.includes(currentWord)) {
        setIncorrectWords([...incorrectWords, currentWord]);
      }
    }
  }

  const handleContinueClick = () => {
    setAnswerError(false);
    if (reviewIncorrectWords) {
      const updatedIncorrectWords = incorrectWords.slice(1);
      setIncorrectWords(updatedIncorrectWords);
      if (updatedIncorrectWords.length === 0) {
        onFinish();
      } else {
        setCurrentWord(updatedIncorrectWords[0]);
      }
    } else {
      if (currentIndex < vocabList.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setReviewIncorrectWords(true);
        onFinish();
      }
    }
    setInputAnswer('');
  };

  return (
    <div className={styles.reviewContainer}>
      <div className={styles.btnClose}>
        <button onClick={()=>oncancel()}> <TfiClose /> </button>
      </div >
      <div className={styles.formAnswer}>
        <h3>Điền đáp án vào chỗ trống</h3>
        <div className={styles.question}>
          {currentWord ? (
            <p>{currentWord.examlevocab.replace(currentWord.namevocab, '_____')}</p>
          ) : (
            <p>Không có từ vựng nào để ôn tập.</p>
          )}
        </div>
        <div className={styles.inputAnswer}>
          <input className={styles.inputAn} placeholder="Điền vào đây..." type="text" value={inputAnswer} onChange={handleChangeAnswer} required/>
        </div>
        <div className={styles.Layoutbuttons}>
          <button className={styles.reviewButton} onClick={handleCheckAnswer2}>
            Kiểm tra 
          </button>
          <div className="icon"><box-icon name='check'></box-icon> </div>
        
          <button className={styles.skipButton} onClick={onFinish}>
            Mình không nhớ từ này  
          </button>
          <div className="icon"><box-icon name='user-x'></box-icon></div>
           
        
        
        </div>
      </div>
      {checkAnswerError && (
        <div className={styles.incorrect}>
          <p>Sai rồi!</p>
          <p>{currentWord.namevocab}</p>
          <p>{currentWord.examlevocab}</p>
          <p>{currentWord.vietnamesetranslate}</p>
          <button onClick={handleContinueClick}>Tiếp tục</button>
        </div>
      )}
    </div>
  );
}

export default Review;
