import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setLocalToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push('../(tabs)');
    }
  }, [token]);


  const handleSignIn = async () => {
    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        user: {
          email : email,
          password: password
        }
       }),
    });
    const data = await response.json();
    if (response.ok) {
      setLocalToken(data.user.token);
      setToken(data.user.token);
    } else {
      console.log('Sign in error:', response);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Sign In</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign In" onPress={handleSignIn} />
      <Button title="Sign Up" onPress={() =>
        router.push({
          pathname: '/(screens)/SignUpScreen', 
          params: { setToken: setToken } 
        })
      } />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});