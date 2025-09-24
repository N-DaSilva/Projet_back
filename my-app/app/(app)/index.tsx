import { Pressable, Text } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import stylesheet from '@/components/stylesheet';

export default function Homepage() {
    const styles = stylesheet();
    const [points, setPoints] = useState(0);

    const handlePress = () => {
        setPoints(points + 1);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Clicker</Text>
            <Text style={styles.text}>{points} points</Text>
            <Pressable style={styles.clickerButton} onPress={handlePress}>
                <Text style={styles.buttonText}>click here</Text>
            </Pressable>
        </SafeAreaView>
    )
}