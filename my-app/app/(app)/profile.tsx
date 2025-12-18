import { Pressable, Text, TextInput, View, Image } from 'react-native';
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
    const [userData, setUserData] = useState({ username: '', createdAt: '', score: 0 });
    const [newUsername, setNewUsername] = useState(userData.username);
    const [usernameUpdated, setUsernameUpdated] = useState({ state: false, reason: '' });
    const [displayModify, setDisplayModify] = useState({ state: false, color: 'white' });

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
                    setUsernameUpdated({ state: true, reason: 'Pseudo mis à jour avec succès' });
                    setUserData({ ...userData, username: newUsername });
                    return;
                } else {
                    if (res.message == 'Username already taken') {
                        setUsernameUpdated({ state: false, reason: 'Ce pseudo est déjà pris' });
                    } else {
                        setUsernameUpdated({ state: false, reason: 'Erreur lors de la mise à jour du pseudo' });
                    }
                    return;
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
        setDisplayModify({ state: !displayModify.state, color: displayModify.color == 'white' ? '#00C4D6' : 'white' });
    }

    useFocusEffect(
        useCallback(() => {
            getUserData();
            setUsernameUpdated({ state: false, reason: '' });
            setDisplayModify({ state: false, color: 'white' });
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Profil</Text>
            <Pressable style={styles.disconnectButton} onPress={disconnect}>
                <Ionicons name="exit-outline" size={32} color="white" />
            </Pressable>


            {showLoader ? (

                <Text style={styles.loading}>Chargement...</Text>

            ) : (
                <>

                    <Image style={styles.profilePicture} source={require('@/assets/images/profile-picture.png')} />
                    <View style={styles.containerH}>
                        <Text style={styles.profileUsername}>{userData.username}</Text>
                        <Pressable onPress={handleDisplayModify}>
                            <FontAwesome name="pencil-square-o" size={20} color={displayModify.color} />
                        </Pressable>
                    </View>

                    {displayModify.state ? (
                        <>
                            <View style={styles.profileContainer}>
                                <TextInput style={styles.profileInput} onChangeText={newUsrText => setNewUsername(newUsrText)} placeholder="Nouveau pseudo" />
                                <Pressable style={styles.profileButton} onPress={handleUsernameUpdate}>
                                    <Ionicons name="send" size={24} color="#12072E" />
                                </Pressable>
                            </View>
                            {usernameUpdated.reason !== '' && (
                                <Text style={styles.text}>{usernameUpdated.reason}</Text>
                            )}
                        </>
                    ) : null}


                    <View style={[styles.marginTop, { width: '100%', paddingHorizontal: 48 }]}>
                        <Text style={[styles.text, styles.marginTop]}>A rejoint le : {userData.createdAt.split("T")[0]}</Text>
                        <Text style={[styles.text, styles.marginTop]}>Score : {userData.score} pts</Text>
                    </View>
                </>

            )}
        </SafeAreaView>
    )
}