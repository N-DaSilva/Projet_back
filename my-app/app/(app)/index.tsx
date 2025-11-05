import { Pressable, Text } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import stylesheet from '@/components/stylesheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

export default function Homepage() {
    const styles = stylesheet();
    const [points, setPoints] = useState(0);

    const setInitialScore = async () => {
        const userID = await AsyncStorage.getItem("userId");

        fetch('http://192.168.43.74:3000/user/find/' + userID, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((res) => {
                if (res.ok) {
                    setPoints(res.data.score);
                } else {
                    alert('Erreur: ' + res.message);
                }
            })
    }

    useEffect(() => {
        setInitialScore();
    }, [])

    const updateScoreOnServer = async (points : number) => {
        const userID = await AsyncStorage.getItem("userId");

        fetch('http://192.168.43.74:3000/user/' + userID + '/score', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                score: points
            }),
        }).then((response) => response.json())
            .then((res) => {
                if (res.ok) {
                    return;
                } else {
                    alert('Erreur: ' + res.message);
                }
            })
    }

    const handlePress = () => {
        setPoints(prev => {
            const newPoints = prev + 1;
            updateScoreOnServer(newPoints);
            return newPoints;
        });

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