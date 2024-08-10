"use client";
import { useState } from "react";
import styles from './registerDialog.module.css';
import axiosInstance from "@/app/utils/axiosInstance";
import { Alert, Snackbar } from "@mui/material";
import { useRouter } from "next/navigation";
import 'boxicons'

const RegisterDialog = ({onClose}) =>{
    const [openDialog,setOpenDialog] = useState(false);
    const [username,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmpassword] = useState("");
    const [email,setEmail] = useState("");
    const [fullname,setFullname] = useState("");
    const [error,setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(password === confirmPassword){
          try {
            const response = await axiosInstance.post("/api/users/auth/signup", {
              username,
              fullname,
              email,
              password,
            });
      
            if(response.data.status === 200){
              setOpenDialog(true);
            }

            setTimeout(()=>{
              router.push('login');
            },2000);
      
          } catch (error) {
            setError('Đăng ký thất bại');
            console.error(error);
          }
        }else{
          setError("Mật khẩu không khùng khớp");
        }
    };

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenDialog(false);
    };

    return (
      <div className={styles.form_container}>
          
          <form onSubmit={handleSubmit} className={styles.registration_form}>
              <h2>Sign up for an account</h2>
              <div className={styles.form_group}>
                  <label>Account name:</label>
                  <input 
                      type="text" 
                      placeholder="Điền tên của bạn..."
                      value={username} 
                      onChange={(e) => setUserName(e.target.value)} 
                      required 
                  />
                  <box-icon name='user'></box-icon>
              </div>
              
              <div className={styles.form_group}>
                  <label>Email:</label>
                  <input 
                      type="email" 
                      placeholder="Điền email..."
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                  />
                  <box-icon type='logo' name='gmail'></box-icon>
              </div>
              <div className={styles.form_group}>
                  <label>Full name:</label>
                  <input 
                      type="text" 
                      placeholder="Điền tên đầy đủ..."
                      value={fullname} 
                      onChange={(e) => setFullname(e.target.value)} 
                      required 
                  />
                  <box-icon type='solid' name='user'></box-icon>
              </div>
              <div className={styles.form_group}>
                  <label>Password:</label>
                  <input 
                      type="password" 
                      placeholder="Điền mật khẩu..."
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required 
                  />
                  <box-icon type='solid' name='lock-alt'></box-icon>
              </div>
              <div className={styles.form_group}>
                  <label>Confirm password:</label>
                  <input 
                      type="password" 
                      placeholder="Xác nhận mật khẩu..."
                      value={confirmPassword} 
                      onChange={(e) => setConfirmpassword(e.target.value)} 
                      required 
                  />
                  <box-icon type='solid' name='lock-open-alt'></box-icon>
                  {error && <p style={{color:'red'}}>{error}</p>}
              </div>
              <button type="submit" className={styles.submit_button}>Register</button>
          </form>

          <div>
            <Snackbar open={openDialog} autoHideDuration={5000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
              >
                Đăng ký thành công, vui lòng đăng nhập để tiếp tục
              </Alert>
            </Snackbar>
          </div>
      </div>
  );
}

export default RegisterDialog;