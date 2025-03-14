import { ThemedView } from '@/components/ThemedView';
import requests from '@/services/requests';
import { ArticleWrapper } from '@/store/types';
import {Text} from 'react-native';
import { useState, useEffect } from 'react';

import { useLocalSearchParams } from 'expo-router';

import styles from '@/assets/css/styles';


export default function PostDetail() {

    const [article, setArticle] = useState<ArticleWrapper>();

    const params = useLocalSearchParams<{ id: string }>();

    useEffect(() => {
        console.log(params.id)
        requests.get('/articles/' + params.id, (err:Body, res:Body) => {
          if (err) {
            console.log(err);
          } else {
            let post: ArticleWrapper = JSON.parse(JSON.stringify(res.body));
            setArticle(post)
          }
        })
    
        return () => {
        };
      }, [params.id]);


  return (
    <ThemedView style={styles.container}>
      <Text  style={{fontSize: 19, fontWeight: 'bold'}}>{article?.article.title + '\n'}</Text>
      <Text  style={{fontSize: 12}}>{article?.article.createdAt} by {article?.article.author.username + '\n'}</Text>
      <Text  style={{fontSize: 12}}>Tags: {article?.article.tagList + '\n'}</Text>
      <Text  style={{fontSize: 16}}>{article?.article.body + '\n'}</Text>
    </ThemedView>
    
  );

}


