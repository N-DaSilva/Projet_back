import { Link, useRouter } from "expo-router";
import { Text, Pressable, TextInput } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import stylesheet from '@/components/stylesheet';

export default function Index() {
  const router = useRouter();
  const styles = stylesheet();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Inscription</Text>

      <TextInput style={styles.input} placeholder="Username" />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry />

            <Pressable style={styles.button} onPress={() => router.navigate('/(app)')}>
              <Text style={styles.buttonText}>S'inscrire</Text>
            </Pressable>

      <Link href='/signin' asChild>
        <Pressable onPress={() => router.replace('/(auth)/signin')}>
          <Text style={styles.text}>Déjà un compte ? </Text><Text style={styles.link}>Se connecter</Text>
        </Pressable>
      </Link>
    </SafeAreaView>
  );
}