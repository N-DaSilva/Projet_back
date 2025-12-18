import { Link, useRouter } from "expo-router";
import { Text, Pressable, TextInput } from "react-native";
import { useState, useContext } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import stylesheet from '@/components/stylesheet';
import { AuthContext } from "../authContext";
import api from "../../service/api";

export default function Index() {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [message, setMessage] = useState({ message: '', color: 'white' });

  const styles = stylesheet();

  const handleSignup = async () => {
    setMessage({ message: '', color: 'white' });
    setShowLoader(true);

    const signupUsername = await username;
    const signupPassword = await password;

    console.log(signupUsername, signupPassword);

    if (signupPassword == '' || signupUsername == '') {
      setMessage({ message: "Le nom d'utilisateur et le mot de passe sont requis", color: 'red' });
      setShowLoader(false);
      return;
    }

    const { ok, token, data } = await api.post('/user/signup', {
      username: signupUsername,
      password: signupPassword
    });

    if (ok) {
      setShowLoader(false);
      login(token, data._id);
      console.log('logged in');
    } else {
      setMessage({ message: "Erreur lors de l'inscription", color: 'red' });
    }
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