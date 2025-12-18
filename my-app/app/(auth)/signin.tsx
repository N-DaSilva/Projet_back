import { Link, useRouter } from "expo-router";
import { Pressable, Text, TextInput } from "react-native";
import { useState, useContext } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import stylesheet from '@/components/stylesheet';
import { AuthContext } from '../authContext';
import api from "../../service/api";


export default function Index() {
  const router = useRouter();
  const styles = stylesheet();
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [message, setMessage] = useState({ message: '', color: 'white' });


  const handleSignin = async () => {
    const loginUsername = await username;
    const loginPassword = await password;

    const { ok, token, data } = await api.post('/user/signin', {
      username: loginUsername,
      password: loginPassword,
    });

    setMessage({ message: '', color: 'white' });
    setShowLoader(true);

    if (ok) {
      setShowLoader(false);
      login(token, data._id);
      console.log('logged in');
    } else {
      setShowLoader(false);
      setMessage({ message: "Identifiants incorrects", color: 'red' });
    }
  }

  return (
    <SafeAreaView style={styles.containerCenter}>
      <Text style={styles.title}>Connexion</Text>

      <TextInput style={[styles.input, { borderColor: message.color }]} onChangeText={newUsrText => setUsername(newUsrText)} placeholder="Nom d'utilisateur" />
      <TextInput style={[styles.input, { borderColor: message.color }]} onChangeText={newPwdText => setPassword(newPwdText)} placeholder="Mot de passe" secureTextEntry />

      <Text style={{ color: 'red', marginBottom: 10 }}>{message.message}</Text>

      <Pressable style={styles.button} onPress={handleSignin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </Pressable>

      {showLoader ? (

        <Text style={styles.loading}>Chargement...</Text>

      ) : null}

      <Link style={styles.containerH} href='/signup' asChild>
        <Pressable onPress={() => router.replace('/(auth)/signup')}>
          <Text style={styles.text}>Pas encore de compte ? </Text><Text style={styles.link}>S'inscrire</Text>
        </Pressable>
      </Link>
    </SafeAreaView>
  );
}