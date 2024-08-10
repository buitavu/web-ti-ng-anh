"use client";
import { use, useEffect, useState } from "react";
import styles from "./StartStudy.module.css";
import { GiSpeaker } from "react-icons/gi";import axiosInstance from "@/app/utils/axiosInstance";
;

const CardItem = ({currentword}) =>{

    const[onSpin,setOnSpin] = useState(false);

    const handleSpin = () =>{
        if(onSpin === true){
            setOnSpin(false);
        }else{
            setOnSpin(true);
        }
    }

    const handleTTS = () =>{
        // responsiveVoice.speak("Hello", "UK English Male");
    }

    return(
        <div className={styles.card_container1} onClick={handleSpin}>
           {onSpin ? (<div className={styles.card_container}>
                <p>{currentword.vietnamesetranslate}</p>
           </div>):(
             <div className={styles.card_container}>
                <h2>{currentword.namevocab}</h2>
                <p>{currentword.examplevocab}</p>
                <button onClick={handleTTS}><GiSpeaker/></button>
            </div>
           )}
        </div>
    );
}

const StartStudy = ({listvocabs,onFinish}) =>{
    const [currentIndex, setCurrentIndex] = useState(0);
    const [incorrectWords, setIncorrectWords] = useState([]);
    const [inputAnswer, setInputAnswer] = useState('');
    const [currentWord, setCurrentWord] = useState(listvocabs[currentIndex]||null);
    const [checkAnswerError, setCheckAnswerError] = useState(false);
    const [reviewIncorrectWords, setReviewIncorrectWords] = useState(false);
    const [checkContinue, setCheckContinue] = useState(false);

    useEffect(()=>{
        if(reviewIncorrectWords){
            setCurrentWord(incorrectWords[0]);
        }else{
            setCurrentWord(listvocabs[currentIndex] || null);
        }
    },[currentIndex,listvocabs,incorrectWords,reviewIncorrectWords]);

    const handleContinue = () =>{
        setCheckContinue(true);
    }
    const iduser = localStorage.getItem('iduser');
    const handleCheckAnswer = async() =>{
        if (inputAnswer.trim().toLowerCase() === currentWord.namevocab.trim().toLowerCase()) {
            try {
                const reponse = await axiosInstance.post(
                    'api/site/vocab',
                    {
                        namevocab:currentWord.namevocab,
                        examplevocab:currentWord.examplevocab,
                        vietnamesetranlate:currentWord.vietnamesetranlate,
                        iduser:iduser
                    }
                );

                if(reponse.data.status === 200){
                    if (reviewIncorrectWords) {
                        const updatedIncorrectWords = incorrectWords.filter(word => word !== currentWord);
                        setIncorrectWords(updatedIncorrectWords);
                        if (updatedIncorrectWords.length === 0) {
                          onFinish();
                        } else {
                          setCurrentWord(updatedIncorrectWords[0]);
                        }
                      }  else {
                        if (currentIndex < listvocabs.length - 1) {
                          setCurrentIndex(currentIndex + 1);
                          setCheckContinue(false);
                        } else {
                          setReviewIncorrectWords(true);
                          onFinish();
                        }
                    }
                    
                    setInputAnswer('');
                }

            }catch(error){
                console.log(error);
            }
            
         
        }else{
            setCheckAnswerError(true);
            if (!incorrectWords.includes(currentWord)) {
                setIncorrectWords([...incorrectWords, currentWord]);
            }
        }
    }

    const handleChangeAnswer = (e) =>{
        setInputAnswer(e.target.value);
    }

    const handleContinueClick = () => {
        setCheckAnswerError(false);
        if (reviewIncorrectWords) {
          const updatedIncorrectWords = incorrectWords.slice(1);
          setIncorrectWords(updatedIncorrectWords);
          if (updatedIncorrectWords.length === 0) {
            onFinish();
          } else {
            setCurrentWord(updatedIncorrectWords[0]);
          }
        } else {
          if (currentIndex < listvocabs.length - 1) {
            setCurrentIndex(currentIndex + 1);
          } else {
            setReviewIncorrectWords(true);
          }
        }
        setInputAnswer('');
      };
    

    console.log(currentWord);

    return(
        <div>
            {checkContinue ?(
               
            <div className={styles.form_answer}>
                
                <h3>Điền đáp án vào chỗ trống</h3>
                
                <div className={styles.question}>
                {currentWord ? (
                    <p>{currentWord.examplevocab.replace(currentWord.namevocab, '_____')}</p>
                ) : (
                    <p></p>
                )}
                <div className={styles.inputAnswer}>
                    <input className={styles.inputAn} type="text" value={inputAnswer} onChange={handleChangeAnswer} />
                    </div>
                    <div className={styles.Layoutbuttons}>
                    <button className={styles.reviewButton} onClick={handleCheckAnswer}>
                        Kiểm tra
                     </button>
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
            </div>)
            :(
                <div  className={styles.card_item}>
                    <CardItem currentword={currentWord}/>
                    <div className={styles.card_item_button}>
                    <button onClick={handleContinue}>Tiếp tục</button>
                    </div>
                </div>
            )}
                
        </div>
        
    );
}

export default StartStudy;