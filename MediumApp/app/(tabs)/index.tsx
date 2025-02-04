import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@/components/ui/drawer"
import { Heading } from "@/components/ui/heading"
import { Text } from "@/components/ui/text"
import { Button, ButtonText } from "@/components/ui/button"
import SideDrawer from "@/components/SideDrawer"

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch('http://localhost:3000/api/articles');
      const data = await response.json();
      setPosts(data.articles);
    }

    async function fetchTags() {
      const response = await fetch('http://localhost:3000/api/tags');
      const data = await response.json();
      console.log(data.tags)
      setPosts(data);
    }
    fetchPosts();
    fetchTags();
  }, []);

  return (
    <>
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
      >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Home Feed</ThemedText>
      </ThemedView>
      <Button
        onPress={() => {
          setShowDrawer(true)
        }}
      >
        <ButtonText>Open Side Panel</ButtonText>
      </Button>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.slug}
        renderItem={({ item }) => (
          <ThemedView style={styles.postContainer}>
            <ThemedText type="subtitle">{item.title}</ThemedText>
            <ThemedText>{item.body}</ThemedText>
          </ThemedView>
        )}
        contentContainerStyle={styles.listContent}
      />
    </ParallaxScrollView>
    <SideDrawer showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
    </>
  );
}
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  postContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listContent: {
    padding: 16,
  },
});