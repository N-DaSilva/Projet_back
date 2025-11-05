import { Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stylesheet from '@/components/stylesheet';
import { useContext, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../authContext';

export default function Profile() {
    const styles = stylesheet();
    const { logout } = useContext(AuthContext);
    const [showLoader, setShowLoader] = useState(false);
    const [userData, setUserData] = useState({username: '', joined_the: '', score: 0});

    const disconnect = () => {
        logout();
        console.log('logged out');
    }

    const getUserData = async () => {
        setShowLoader(true);
        const userId = await AsyncStorage.getItem('userId');

        fetch('http://192.168.43.74:3000/user/find/' + userId, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((res) => {
                setShowLoader(false);
                if (res.ok) {
                    setUserData(res.data);
                } else {
                    alert('Erreur: ' + res.message);
                }
            })
    }

    useFocusEffect(
        useCallback(() => {
            getUserData();
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            {showLoader ? (

                <Text style={styles.loading}>Chargement...</Text>

            ) : (
                <>
                    <Text style={styles.title}>Profil de {userData.username}</Text>
                    <Text style={styles.text}>a rejoint clicker le : {userData.joined_the.split("T")[0]}</Text>
                    <Text style={styles.text}>Nombre de points : {userData.score}</Text>

                    <Pressable style={styles.button} onPress={disconnect}>
                        <Text style={styles.buttonText}>Se déconnecter</Text>
                    </Pressable>
                </>

            )}
        </SafeAreaView>
    )
}