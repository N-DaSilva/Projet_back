import { Link, useRouter } from "expo-router";
import { Text, Pressable, TextInput } from "react-native";
import { useState, useContext } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import stylesheet from '@/components/stylesheet';
import { AuthContext } from "../authContext";

export default function Index() {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const styles = stylesheet();

  const handleSignup = () => {
    fetch('http://192.168.43.74:3000/user/signup', {
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
    <SafeAreaView style={styles.containerCenter}>
      <Text style={styles.title}>Inscription</Text>

      <TextInput style={styles.input} onChangeText={newUsrText => setUsername(newUsrText)} placeholder="Username" />
      <TextInput style={styles.input} onChangeText={newPwdText => setPassword(newPwdText)} placeholder="Password" secureTextEntry />

      <Pressable style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </Pressable>

      {showLoader ? (

      <Text style={styles.loading}>Chargement...</Text>

      ) : null}

      <Link href='/signin' asChild>
        <Pressable onPress={() => router.replace('/(auth)/signin')}>
          <Text style={styles.text}>Déjà un compte ? </Text><Text style={styles.link}>Se connecter</Text>
        </Pressable>
      </Link>
    </SafeAreaView>
  );
}