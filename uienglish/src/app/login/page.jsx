"use client";
import { useState } from "react";
import "./login.css";
import { useRouter } from "next/navigation";
import axiosInstance from "../utils/axiosInstance";
import RegisterDialog from "../register/page";
import 'boxicons'





const Login = ({ onLogin }) => {
  const [open, setOpen] = useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState('');
  const router = useRouter();

  localStorage.removeItem("token");
  localStorage.removeItem("check");
  localStorage.removeItem("iduser");
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        "/api/users/auth/login",
        {
          username,
          password,
        }
      );

      if(response.data.status === 200){
        router.push("/overview");
        localStorage.setItem("token",response.data.result.token);
        localStorage.setItem("check",true);
        localStorage.setItem("iduser",response.data.result.id);
      }else{
        setError('Tên đăng nhập hoặc mật khẩu không đúng');
      }

     
      console.log(response);
    } catch (error) {
      
      console.error(error);
    }
  };

  const handleRegister = () => {
    router.push('register')
  };

  const closeRegisterDialog = () => {
    setShowRegisterDialog(false);
  };



  return (
    // <div className="wrapper">
    //   <form action="">
    //     <h1>Login</h1>
    //     <div className="input-box">
    //       <input type="text" placeholder="Username"  required/>
    //     </div>
    //     <div className="input-box">
    //       <input type="password" placeholder="password"  required/>
    //       <i class='bx bxs-lock-alt'></i>
    //     </div>
    //     <div className="remember-forgot">
    //       <label> <input type="checkbox"/>Remember me</label>
    //       <a href="#">Forgot password?</a>
    //     </div>
    //     <button type="submit" className="btn">login</button>
    //     <div className="register-link">
    //       <p>Don't have an account 
    //       <a href="#">Register</a>
    //       </p> 
    //     </div>
    //   </form>

    // </div>
    <div className="login">
      <form action="">
        <h3>LOGIN</h3>
        <label htmlFor="username">Login</label>
        <div className="input-box">
        <input type="text" placeholder="Tên đăng nhập" id="username" onChange={(e) => setUsername(e.target.value)}
        required/>
        <div className="icon">
       <box-icon  type='solid' name='user'></box-icon>
       </div>
         </div>
        <label htmlFor="password">Password</label>
        <div className="input-box">
        <input type="password" placeholder="Mật khẩu" id="password" 
        onChange={(e)=> setPassword(e.target.value)}  required/>
        <div className="icon">
        <box-icon  type='solid' name='lock-alt'></box-icon>
        </div>
        {error && <p style={{color:'red'}}>{error}</p>}
        </div>
        <div className="remember-forgot">
           <label> <input type="checkbox"/>Remember me</label>
          <a href="#">Forgot password?</a>
        </div>
        <button onClick={handleSubmit} type="submit">
          Login
        </button>
        <div className="register-link">
           <p>Don't have an account 
           <span onClick={handleRegister}>Register</span>
          </p> 
        </div>
       
      </form>
    
      
    </div>
  );
};

export default Login;
