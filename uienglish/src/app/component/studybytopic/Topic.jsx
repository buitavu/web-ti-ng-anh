"use client";

import { useEffect, useState } from "react";
import styles from "./Topic.module.css";
import axiosInstance from "@/app/utils/axiosInstance";
import StartStudy from "./StartStudy";
import { Box, CircularProgress } from "@mui/material";

const CourceCard = ({nametopic,description,total}) =>{
    


    return(
        <div>
            <div className={styles.topic_items}>
                <div>
                    <h3>{nametopic}</h3>
                    <p>{description}</p>
                    <p>Số lượng: {total}</p>
                </div>
            </div>
            
        </div>
    );
}

const Topic = () =>{

    const [listTopic, setListTopic] = useState([]);
    const [startStudy, setstartStudy] = useState(false);
    const [listvocabss, setlistvocabss] = useState([]);

    const loadData = async () =>{
        try {
            const reponse = await axiosInstance.get(
                'api/topic'
            );

            console.log(reponse.data);
            setListTopic(reponse.data.result);

        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(()=>{
       
        loadData();
    },[]);

    const handleChange = (topic) =>{
        setlistvocabss(topic.listvocabs);
        setstartStudy(true);
    }

    const handleFinish = () =>{
        loadData();
        
        setstartStudy(false);
    }


    return (
        <div className={styles.body}>
        <div className={styles.topic}>
            {startStudy ? (
                    <StartStudy listvocabs = {listvocabss}
                    onFinish={handleFinish}
                    />
                ):
                
                (
                    <div className={styles.topic_container}>
                <div className={styles.topic_content}>
                    <div className={styles.topic_header}>
                        <h2>DANH SÁCH CHỦ ĐỀ</h2>
                        <h3>Lộ trình gởi ý</h3>
                    </div>
                    <div>
                        {listTopic.length > 0 ?(
                            listTopic.map((topic, index) => (
                                <div key={index} onClick={()=> handleChange(topic)}>
                                    <CourceCard key={index} 
                                    nametopic = {topic.nametopic}
                                    description={topic.description}
                                    total={topic.total}
            
                                />
                                </div>
                            ))
                        ):(
                            <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                        )}
                    </div>
                
                </div>
               
            </div>
                )}
            
        </div>
        </div>
    );
}

export default Topic;