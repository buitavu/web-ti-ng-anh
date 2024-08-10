"use client";
import axiosInstance from '@/app/utils/axiosInstance';
import styles from './VocabularyItem.module.css'
import { CiCirclePlus } from "react-icons/ci";
import { useEffect, useState } from 'react';

const VocabularyItem = ({ namevocab, examplevocab}) => {

  const iduser = localStorage.getItem('iduser');
  const [statusButton,setStatusButton] = useState('Thêm từ này');

  const [plusSucces,setPlusSucces] = useState(false);

    useEffect(() =>{
      const data = async () =>{
        try {
          const response = await axiosInstance.get(
            'api/site/vocab/islearn',
            {
              params:{
                iduser:iduser,
                namevocab:namevocab
              }
            }
          );

          if(response.data.status === 200){
              const listData = response.data.result;
              const someData = listData.some(el => el.namevocab === namevocab);
              if(someData){
                setStatusButton("Đã thêm");
                setPlusSucces(true);
              }
              
          }
        } catch (error) {
          console.log(error);
        }
      };

      data();

    },[]);

    const handlePlusVocab = async()=>{
      try{
        const response = await axiosInstance.post(
          'api/site/vocab',
          {
            namevocab:namevocab,
            examplevocab:examplevocab,
            iduser:iduser,
          }
        );

        console.log(response.data);

        if(response.data.status === 200){
            console.log(response.data.result);
            setPlusSucces(true);
            setStatusButton("Đã thêm");
        }
      }catch(error){
        console.log(error);
      }


    }

    return (
      <div className={styles.item}>
        <div className={styles.word}>
          <span>{namevocab}</span>
          {/* <span className={styles.phonetic}>{phonetic}</span> */}
        </div>
        <div className={styles.details}>
          {/* <span className={styles.type}>{type}</span> */}
          <span className={styles.meaning}>{examplevocab}</span>
        </div>
        <div>
          <button className={styles.plus_button} onClick={handlePlusVocab} disabled={plusSucces}>{statusButton}</button>
        </div>
      </div>
    );
  };

  export default VocabularyItem;