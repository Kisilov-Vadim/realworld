import type { PropsWithChildren } from 'react';
import { Link } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ResArticle } from '@/store/types';
import { ScrollView, Text } from 'react-native';
import styles from '@/assets/css/styles';


type Props = PropsWithChildren<{
  articles: ResArticle;
}>;


export default function Article({ articles }: Props) {

  let listArticles = articles?.articles.map((article, index) => <>
    <Link push href={'/post?id=' + article.slug} style={{ fontSize: 20, fontWeight: 'bold' }}>{article.title}</Link>
    <Text style={{ fontSize: 16 }}>{article.body.substring(0,100) + '...' +  '\n'}</Text></>)


  return (
    <ThemedView style={styles.container}>
      <ScrollView>{listArticles}</ScrollView>
    </ThemedView>
  );

}



