import { Link, useRouter } from "expo-router";
import { Pressable, Text, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import stylesheet from '@/components/stylesheet';

export default function Index() {
  const router = useRouter();
  const styles = stylesheet();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = () => {
    fetch('http://192.168.43.74:3000/user/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.ok) {
        
        // Redirect to app
        router.replace('/(app)');
      } else {
        alert('Erreur: ' + data.message);
      }
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Connexion</Text>

      <TextInput style={styles.input} onChangeText={newUsrText => setUsername(newUsrText)} placeholder="Username" />
      <TextInput style={styles.input} onChangeText={newPwdText => setPassword(newPwdText)} placeholder="Password" secureTextEntry />

      <Pressable style={styles.button} onPress={handleSignin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </Pressable>

      <Link href='/signup' asChild>
        <Pressable onPress={() => router.replace('/(auth)/signup')}>
          <Text style={styles.text}>Pas encore de compte ? </Text><Text style={styles.link}>S'inscrire</Text>
        </Pressable>
      </Link>
    </SafeAreaView>
  );
}