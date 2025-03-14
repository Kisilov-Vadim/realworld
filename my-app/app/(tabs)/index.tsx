import { StyleSheet, Image, Platform } from 'react-native';

import Post from '@/components/Post';


export default function MainScreen() {
  return (
            <Post/>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
