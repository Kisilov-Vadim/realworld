import React from 'react';
import {ScrollView, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const GlobalPosts = () => (
  <SafeAreaView style={{flex: 1}}>
    <ScrollView>
      <Text>Global Posts</Text>
    </ScrollView>
  </SafeAreaView>
);

export default GlobalPosts;
