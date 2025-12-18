import { Pressable, Text, Image, Animated } from 'react-native';
import { useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import stylesheet from '@/components/stylesheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import api from "../../service/api";

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

        const { ok, data } = await api.get('/user/find/' + userID);

        if (ok) {
            setPoints(data.score);
        } else {
            console.error('Erreur');
        }
    }

    useEffect(() => {
        setInitialScore();
    }, [])

    const updateScoreOnServer = async (points: number) => {
        const userID = await AsyncStorage.getItem("userId");

        const { ok } = await api.put('/user/' + userID + '/score', { score: points });

        if (ok) {
            return ok;
        } else {
            alert('Erreur');
        }
    }

    const handlePress = async () => {
        const newPoints = await points + 1;
        const updated = await updateScoreOnServer(newPoints);
            if (updated) {
                setPoints(newPoints);
            } else {
                console.log('Score not updated');
            }
            return;
    };

    return (
        <SafeAreaView style={styles.container}>
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

            <Image style={{ width: 400, height: 220 }} source={require('@/assets/images/home-illus.png')} />
        </SafeAreaView>
    )
}