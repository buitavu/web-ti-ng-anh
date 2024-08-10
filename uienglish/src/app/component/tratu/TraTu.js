import { CiSearch } from "react-icons/ci";

import styles from './tratu.module.css'
import axiosInstance from "@/app/utils/axiosInstance";
import { useState } from "react";
import VocabularyItem from "../Vocabulary/VocabularyItem";

const TraTu = () =>{
    const [inputSearch, setInputSearch] = useState('');
    const [haveOrNot, setHaveOrNot] = useState(false);
    const [listVocab, setListVocab] = useState([]);

    const handleSearchVocab = async(e) =>{
        e.preventDefault();

        try{
            const reponse = await axiosInstance.get(
                'api/library',
                {
                    params:{
                        search:inputSearch,
                    }
                }
            );

            console.log(reponse.data.status);
            if(reponse.data.status === 200){
                const results = reponse.data.result;
                setListVocab(results);
                setHaveOrNot(results.length > 0);
                console.log(results);
            }
        }catch(error){

        }
    };

    const handleInputSearch = (e) =>{
        setInputSearch(e.target.value);
    }



    return(
        <div className={styles.self_container}>
            <div className={styles.self_content}>
                    <h1>Nhập vào đây từ bạn muốn tìm</h1>
                    <div className={styles.self_form_input}>
                        <input type="text" value={inputSearch} onChange={handleInputSearch} /> 
                                          
                             <button onClick={handleSearchVocab}>Search</button>                      
                    </div>
                    {haveOrNot ? (
                        <div>
                        {listVocab.map((namevocab,index) =>(
                            <VocabularyItem key={index} {...namevocab} />
                        ))}

                    </div>
                    ):(<div >
                        <form>
                            
                        </form>
                    </div>)}
                </div>
        </div>
    );
}

export default TraTu;