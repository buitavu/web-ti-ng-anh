"use client";
import BarChart from '@/app/component/chart/BarChart';
import styles from './Overview.module.css'
import { useEffect, useState } from 'react';
import axiosInstance from '@/app/utils/axiosInstance';
import Review from '@/app/component/reviews/Review';
import { Alert, Snackbar } from '@mui/material';

const Overview = () => {

  const [buttonReview,setButtonReview] = useState(true);
  const [dataPoints, setDataPoints] = useState([]);
  const [isReviewing, setIsReviewing] = useState(false);
  const [vocabList, setVocabList] = useState([]);
  const [finish, setOnFinish] = useState(false);
  const [open,setOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() =>{
    const idUser = localStorage.getItem("iduser");
    const data = async () =>{
      try {
        const response = await axiosInstance.get(
          'api/site/vocab/learn',
          {
            params:{
              iduser: idUser,
            }
          }
        );

        console.log(response);

        if(response.data.status === 200){
          const dataChart = response.data.result.map(item => item.dataVocab.length);
          setDataPoints(dataChart);
        }
      } catch (error) {
        console.error(error);
      }
    };

    data();
  },[]);

  useEffect(() =>{
    loadDataIsReview();
  },[]);


 
    const idUser = localStorage.getItem("iduser");
    const loadDataIsReview = async () =>{
      try {
        const response = await axiosInstance.get(
          'api/site/vocab/review',
          {
            params:{
              iduser: idUser,
              state:'ontap'
            }
          }
        );

        if(response.data.status === 200){
          
          setVocabList(response.data.result);
          if(response.data.result.length > 0){
            setButtonReview(false);
          }else{
            setButtonReview(true);
          }
        }

      } catch (error) {
        
      }
    };

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
  };

  const handleStartReview = () =>{
    setIsReviewing(true);
  }

  const handleFinishReview = () =>{
    setIsReviewing(false);
    loadDataIsReview();
    setOpen(true);
    setMessage("Ôn tập thành công.");
  }

  const handleCancelReview = () =>{
    setIsReviewing(false);
    loadDataIsReview();
    setOpen(true);
    setMessage("Vui lòng ôn tập hết bài học");
  }

  return (
    <div className={styles.mainOverview}>
    <div className={styles.mainContent}>
      
      {!isReviewing && (
          <>
            <h3>Ôn tập</h3>
            <div className={styles.chart}>
              <BarChart dataPoints={dataPoints} />
            </div>
            <button disabled={buttonReview} className={styles.reviewButton} onClick={handleStartReview}>
              Ôn tập ngay
            </button>
          </>
        )}
        {isReviewing && (
          <Review vocabList={vocabList} onFinish={handleFinishReview} oncancel={handleCancelReview}/>
        )}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              variant="filled"
              sx={{ width: '100%' }}
            >
              {message}
            </Alert>
        </Snackbar>
    </div>
    </div>
  );
};

export default Overview;
