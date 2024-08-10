import styles from './index.module.css';
import VocabularyList from '@/app/component/Vocabulary/VocabularyList';
export default function Home(){
    return(
    
      <main className={styles.main}>
        <h1 className={styles.title}>Gõ vào đây từ bạn muốn tìm</h1>
        <input type="text" className={styles.search} placeholder="Search" />
        <button className={styles.button}>Search</button>
        <VocabularyList />
      </main>
    );
}