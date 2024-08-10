import styles from './VocabularyList.module.css';
import VocabularyItem from './VocabularyItem';

const VocabularyList = () => {
    const words = [
      { word: 'below', phonetic: '/bɪˈloʊ/', type: '(adverb)', meaning: 'Ở bên dưới' },
      { word: 'beat', phonetic: '/biːt/', type: '(adjective)', meaning: 'Rất mệt mỏi, kiệt sức' },
      { word: 'battery', phonetic: '/ˈbætəri/', type: '(noun)', meaning: 'Một chuỗi, một loạt' },
      { word: 'basis', phonetic: '/ˈbeɪsɪs/', type: '(noun)', meaning: 'Cơ sở' },
      { word: 'badly', phonetic: '/ˈbædli/', type: '(adverb)', meaning: 'Một cách nặng, trầm trọng' },
      { word: 'backwards', phonetic: '/ˈbækwərdz/', type: '(adverb)', meaning: 'Về phía sau (có thể dùng bỏ s)' },
      { word: 'available', phonetic: '/əˈveɪləbl/', type: '(adj)', meaning: 'Rảnh, có thời gian' }
    ];
  
    return (
      <div className={styles.list}>
        {words.map((word, index) => (
          <VocabularyItem key={index} {...word} />
        ))}
      </div>
    );
  };
  
  export default VocabularyList;