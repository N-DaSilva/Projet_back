import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import stylesheet from '@/components/stylesheet';

export default function Leaderboard() {
    const styles = stylesheet();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Leaderboard</Text>
            <Text style={styles.text}>1. JaneDoe - 1500 points</Text>
            <Text style={styles.text}>2. JohnSmith - 1200 points</Text>
            <Text style={styles.text}>3. AliceW - 1100 points</Text>
            <Text style={styles.text}>4. BobK - 900 points</Text>
            <Text style={styles.text}>5. CharlieM - 850 points</Text>
        </SafeAreaView>
    )
}