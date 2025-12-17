import { Link, useRouter } from "expo-router";
import { Pressable, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import stylesheet from '@/components/stylesheet';

export default function Index() {
    const router = useRouter();
    const styles = stylesheet();
    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('@/assets/images/menu.jpg')} style={{ width: 400, height: 350, marginTop: 64 }} />

            <Link href='/signin' style={styles.button} asChild>
                <Pressable onPress={() => router.navigate('/(auth)/signin')}>
                    <Text style={styles.buttonText}>Se connecter</Text>
                </Pressable>
            </Link>
            <Link href='/signup' style={styles.button} asChild>
                <Pressable onPress={() => router.navigate('/(auth)/signup')}>
                    <Text style={styles.buttonText}>S'inscrire</Text>
                </Pressable>
            </Link>
        </SafeAreaView>
    )
}