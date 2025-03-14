
import { useState, useEffect, PropsWithChildren } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import Tag from '@/components/Tag';
import Article from '@/components/Article';
import { ResArticle } from '@/store/types';
import { ThemedView } from '@/components/ThemedView';
import requests from '@/services/requests';
import styles from '@/assets/css/styles';


export default function Post() {
  const [tagValues, setTagValues] =  useState<string[]>([]);

  function tagChanged(tag: any) {
    requests.get('/articles?tag=' + tag, (err:Body, res:Body) => {
      if (err) {
        console.log(err);
      } else {
        let posts: ResArticle = JSON.parse(JSON.stringify(res.body));
        setArticles(posts)
      }
    })

    
  }
  const [articles, setArticles] = useState<ResArticle>();

    useEffect(() => {
      requests.get('/articles', (err:Body, res:Body) => {
        if (err) {
          console.log(err);
        } else {
          let posts: ResArticle = JSON.parse(JSON.stringify(res.body));
          setArticles(posts)
        }
      })
  
      return () => {
       // console.log('...')
      };
    }, []);
  

  return (
    <>
    <ThemedView style={styles.container}>
    <Tag tagValue={tagValues} setTagValue={setTagValues} onTagChanged={tagChanged}   />
    </ThemedView>
    <ThemedView style={styles.container}>
      <Article articles={articles} />
    </ThemedView>
    </>
  );

}


