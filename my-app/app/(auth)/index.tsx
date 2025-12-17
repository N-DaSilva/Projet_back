import { Link, useRouter } from "expo-router";
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import stylesheet from '@/components/stylesheet';

export default function Index() {
    const router = useRouter();
    const styles = stylesheet();
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.big}>Star Clicker</Text>

            <View style={styles.containerCenter}>
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
            </View>
        </SafeAreaView>
    )
}