import { Link, useRouter } from "expo-router";
import { Pressable, Text, TextInput } from "react-native";
import { useState, useContext } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stylesheet from '@/components/stylesheet';
import { AuthContext } from '../authContext';

export default function Index() {
  const router = useRouter();
  const styles = stylesheet();
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const handleSignin = () => {
    setShowLoader(true);

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
    .then((res) => {
      setShowLoader(false);
      console.log(res);
      if (res.ok) {
        console.log('data token: ', res.token, ' ; data id: ', res.data._id);
        login(res.token, res.data._id);
        console.log('logged in');
      } else {
        alert('Erreur: ' + res.message);
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

      {showLoader ? (

      <Text style={styles.loading}>Chargement...</Text>

      ) : null}

      <Link href='/signup' asChild>
        <Pressable onPress={() => router.replace('/(auth)/signup')}>
          <Text style={styles.text}>Pas encore de compte ? </Text><Text style={styles.link}>S'inscrire</Text>
        </Pressable>
      </Link>
    </SafeAreaView>
  );
}