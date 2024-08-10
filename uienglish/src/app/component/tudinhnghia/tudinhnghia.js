import { useState } from 'react';
import styles from './tudinhnghia.module.css';
import { Alert, Snackbar } from '@mui/material';
import axiosInstance from '@/app/utils/axiosInstance';

const TuDinhNghia = () =>{

    const [open,setOpen] = useState(false);
    const [namevocab, setNamevocab] = useState('');
    const [vietnamesetranlate, setVietnamesetranlate] = useState('');
    const [examplevocab, setExamplevocab] = useState('');
    const [errors, setErrors] = useState({});

    const iduser = localStorage.getItem('iduser');

    const handleSnackbar = () =>{
        setOpen(true);
    }

    const validate = () => {
        let tempErrors = {};
        if (!namevocab) tempErrors.namevocab = "Không được để trống";
        if (!vietnamesetranlate) tempErrors.vietnamesetranlate = "Không được để trống";
        if (!examplevocab) tempErrors.examplevocab = "Không được để trống";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
      };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    const handlePlusVocab = async(e) =>{
        e.preventDefault();
       if(validate()){
        try {
            const reponse = await axiosInstance.post(
                'api/site/vocab',
                {
                    namevocab:namevocab,
                    examplevocab:examplevocab,
                    vietnamesetranlate:vietnamesetranlate,
                    iduser:iduser
                }
            );

            console.log(reponse);

            if(reponse.data.status === 200){
                handleSnackbar();
                setExamplevocab('');
                setNamevocab('');
                setVietnamesetranlate('');
            }

        } catch (error) {
            console.log(error);
        }
       }
    }


      


    return(
        <div className={styles.tudinhnghia_container}>
            <div className={styles.tudinhnghia_form}>
                <h3>Thêm từ mới</h3>
                <label>Nhập từ tiếng anh</label>
                <input type="text" value={namevocab} onChange={(e) => setNamevocab(e.target.value)}/>
                {errors.namevocab && <p style={{ color: "red" }}>{errors.namevocab}</p>}

                <label>Nhập định nghĩa</label>
                <input type="text" value={vietnamesetranlate} onChange={(e) => setVietnamesetranlate(e.target.value)}/>
                {errors.vietnamesetranlate && <p style={{ color: "red" }}>{errors.vietnamesetranlate}</p>}

                <label>Ví dụ về tiếng anh</label>
                <input type="text" value={examplevocab} onChange={(e) => setExamplevocab(e.target.value)}/>
                {errors.examplevocab && <p style={{ color: "red" }}>{errors.examplevocab}</p>}
                <button onClick={handlePlusVocab}>Thêm từ mới</button>
            </div>
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}>
                     <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Thêm từ mới thành công
                    </Alert>
            </Snackbar>
            
        </div>
    );

};

export default TuDinhNghia;