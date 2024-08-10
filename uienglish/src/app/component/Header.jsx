"use client";
import { useEffect, useState } from 'react';
import styles from './Header.module.css';
import { useRouter } from 'next/navigation';

const Header = () =>{

    const [isLoggin,setIslogin] = useState(false);

    useEffect(() =>{
        const token = localStorage.getItem("check");
        if(token){
            setIslogin(true);
        }
    },[]);

    return(
        <>
        {isLoggin && <Content/>}
        </>
        
    );
}

const Content = () =>{

    const router = useRouter();

    const handleLogout = () =>{
        router.push('login');
        localStorage.removeItem("token");
        localStorage.removeItem("iduser");
        localStorage.removeItem("check");
    }


    return(
        <header className={styles.header}>
            <div className={styles.logo}>
                <h1>ENGLISH</h1>
                <img src="https://learn.mochidemy.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhas_no_word.c83bad5f.webp&w=256&q=75" alt="hinhanh1" />
            </div>
            <nav className={styles.nav}>
                <ul>
                    <li><a href="/overview">Ôn tập</a></li>
                    <li><a href="/new-word">Học từ mới</a></li>
                    <li><a href="/vocabulary">Sổ tay</a></li>
                </ul>
            </nav>
            <div className={styles.user}>
                <span onClick={handleLogout}>Log out</span>
            </div>
        </header>
    );
}

export default Header;