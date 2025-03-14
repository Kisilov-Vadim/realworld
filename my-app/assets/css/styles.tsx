import { StyleSheet } from 'react-native';


const HEADER_HEIGHT = 250;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 320,
    gap: 16,
    overflow: 'hidden',
  },
});

export default styles
