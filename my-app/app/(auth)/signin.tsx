import { Link, useRouter } from "expo-router";
import { Pressable, Text, TextInput } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import stylesheet from '@/components/stylesheet';

export default function Index() {
  const router = useRouter();
  const styles = stylesheet();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Connexion</Text>

      <TextInput style={styles.input} placeholder="Username" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />

      <Pressable style={styles.button} onPress={() => router.navigate('/(app)')}>
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