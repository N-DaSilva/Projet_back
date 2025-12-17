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
  const [message, setMessage] = useState({ message : '', color: 'white' });

  const styles = stylesheet();

  const handleSignup = () => {
    setMessage({ message: '', color: 'white' });
    setShowLoader(true);
    
    if (password == '' || username == '') {
      setMessage({ message: "Le nom d'utilisateur et le mot de passe sont requis", color: 'red' });
      return;
    }

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
        if (res.code == 'USERNAME_TAKEN') {
          setMessage({ message: "Ce nom d'utilisateur est déjà pris", color: 'red' });
        } else {
          setMessage({ message: "Erreur lors de la connexion", color: 'red' });
        }
      }
    })
  }

  return (
    <SafeAreaView style={styles.containerCenter}>
      <Text style={styles.title}>Inscription</Text>

      <TextInput style={[styles.input, { borderColor: message.color }]} onChangeText={newUsrText => setUsername(newUsrText)} placeholder="Nom d'utilisateur" />
      <TextInput style={[styles.input, { borderColor: message.color }]} onChangeText={newPwdText => setPassword(newPwdText)} placeholder="Mot de passe" secureTextEntry />

      <Text style={{ color: 'red', marginBottom: 10 }}>{message.message}</Text>

      <Pressable style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </Pressable>

      {showLoader ? (

      <Text style={styles.loading}>Chargement...</Text>

      ) : null}

      <Link style={styles.containerH} href='/signin' asChild>
        <Pressable onPress={() => router.replace('/(auth)/signin')}>
          <Text style={styles.text}>Déjà un compte ? </Text><Text style={styles.link}>Se connecter</Text>
        </Pressable>
      </Link>
    </SafeAreaView>
  );
}