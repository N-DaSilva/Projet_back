import { Pressable, Text, Image, Animated } from 'react-native';
import { useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import stylesheet from '@/components/stylesheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

export default function Homepage() {
    const styles = stylesheet();

    const buttonClickAnim = useRef(new Animated.Value(1)).current;

    const shrinkButton = () => {
        Animated.spring(buttonClickAnim, {
            toValue: 0.90,
            useNativeDriver: true,
            speed: 50
        }).start();
    }

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

    const updateScoreOnServer = async (points: number) => {
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
            <Text style={styles.title}>Star Clicker</Text>
            <Text style={styles.big}>{points} pts</Text>
            <Pressable onPress={handlePress} onPressIn={shrinkButton} onPressOut={() => {
                Animated.spring(buttonClickAnim, {
                    toValue: 1,
                    useNativeDriver: true,
                    speed: 50
                }).start();
            }}>
                <Animated.View style={[{ transform: [{ scale: buttonClickAnim }] }]}>
                    <Image
                    style={styles.clickerButton}
                    source={require('@/assets/images/splash-icon.png')}
                />
                </Animated.View>
            </Pressable>

            <Image style={{width: 400, height: 220}} source={require('@/assets/images/home-illus.png')}/>
        </SafeAreaView>
    )
}