import { Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import stylesheet from '@/components/stylesheet';

export default function Profile() {
    const styles = stylesheet();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Profil de JaneDoe</Text>
            <Text style={styles.text}>a rejoint clicker le : 23/09/2025</Text>
            <Text style={styles.text}>Nombre de points : 1500</Text>
            <Text style={styles.text}>Rang : 42ème</Text>

            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Se déconnecter</Text>
            </Pressable>
        </SafeAreaView>
    )
}