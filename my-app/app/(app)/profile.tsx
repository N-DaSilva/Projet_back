import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stylesheet from '@/components/stylesheet';
import { useContext, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../authContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Profile() {
    const styles = stylesheet();
    const { logout } = useContext(AuthContext);
    const [showLoader, setShowLoader] = useState(false);
    const [userData, setUserData] = useState({ username: '', joined_the: '', score: 0 });
    const [newUsername, setNewUsername] = useState(userData.username);
    const [usernameUpdated, setUsernameUpdated] = useState({ state: false, reason: '' });
    const [displayModify, setDisplayModify] = useState(false);

    const disconnect = () => {
        logout();
        console.log('logged out');
    }

    const updateUsernameOnServer = async (username: string) => {
        const userID = await AsyncStorage.getItem("userId");

        fetch('http://192.168.43.74:3000/user/' + userID + '/username', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username
            }),
        }).then((response) => response.json())
            .then((res) => {
                if (res.ok) {
                    setUsernameUpdated({ state: true, reason: 'Username updated successfully' });
                    setUserData({ ...userData, username: newUsername });
                    return;
                } else {
                    setUsernameUpdated({ state: false, reason: 'Failed to update username' });
                    alert('Erreur: ' + res.message);
                }
            })
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

    const handleUsernameUpdate = () => {
        updateUsernameOnServer(newUsername);
    }

    const handleDisplayModify = () => {
        setDisplayModify(!displayModify);
    }

    useFocusEffect(
        useCallback(() => {
            getUserData();
            setUsernameUpdated({ state: false, reason: '' });
            setDisplayModify(false);
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            {showLoader ? (

                <Text style={styles.loading}>Chargement...</Text>

            ) : (
                <>
                    <View style={styles.containerH}>
                        <Text style={styles.title}>Profil de {userData.username}</Text>
                        <Pressable onPress={handleDisplayModify}>
                            <FontAwesome name="pencil-square-o" size={24} color="white" />
                        </Pressable>
                    </View>

                    {displayModify ? (
                        <>
                            <View style={styles.profileContainer}>
                                <TextInput style={styles.profileInput} onChangeText={newUsrText => setNewUsername(newUsrText)} placeholder="Changer votre pseudo" />
                                <Pressable style={styles.profileButton} onPress={handleUsernameUpdate}>
                                    <Ionicons name="send-sharp" size={24} color="#12072E" />
                                </Pressable>
                            </View>
                            {usernameUpdated.reason !== '' && (
                                <Text style={styles.text}>{usernameUpdated.reason}</Text>
                            )}
                        </>
                    ) : null }




                    <Text style={[styles.text, styles.marginTop]}>a rejoint clicker le : {userData.joined_the.split("T")[0]}</Text>
                    <Text style={[styles.text, styles.marginTop]}>Nombre de points : {userData.score}</Text>

                    <Pressable style={styles.disconnectButton} onPress={disconnect}>
                        <Text style={styles.buttonText}>Se déconnecter</Text>
                    </Pressable>
                </>

            )}
        </SafeAreaView>
    )
}