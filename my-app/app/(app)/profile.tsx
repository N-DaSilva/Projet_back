import { Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stylesheet from '@/components/stylesheet';

export default function Profile() {
    const router = useRouter();
    const styles = stylesheet();

    const disconnect = () => {
        AsyncStorage.removeItem('token').then(() => {
            router.replace('/(auth)');
            console.log('logged out');
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Profil de JaneDoe</Text>
            <Text style={styles.text}>a rejoint clicker le : 23/09/2025</Text>
            <Text style={styles.text}>Nombre de points : 1500</Text>
            <Text style={styles.text}>Rang : 42ème</Text>

            <Pressable style={styles.button} onPress={disconnect}>
                <Text style={styles.buttonText}>Se déconnecter</Text>
            </Pressable>
        </SafeAreaView>
    )
}