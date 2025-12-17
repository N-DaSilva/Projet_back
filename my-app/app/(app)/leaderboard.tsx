import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import stylesheet from '@/components/stylesheet';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';


export default function Leaderboard() {
    const styles = stylesheet();
    const [showLoader, setShowLoader] = useState(false);
    const [leaderboard, setLeaderboard] = useState([{ _id: '', username: '', score: 0 }]);

    const getLeaderboard = async () => {
        setShowLoader(true);

        fetch('http://192.168.43.74:3000/user/leaderboard/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((res) => {
                setShowLoader(false);
                if (res.ok) {
                    setLeaderboard(res.data)
                } else {
                    alert('Erreur: ' + res.message);
                }
            })
    }

    useFocusEffect(
        useCallback(() => {
            getLeaderboard();
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Leaderboard</Text>
            <ScrollView style={styles.scrollBox}>

                {showLoader ? (

                    <Text style={styles.loading}>Chargement...</Text>

                ) :
                    leaderboard.map((user, index) => {
                        if (index === 0) {
                            return <Text style={styles.first} key={index}>🥇 {user.username} - {user.score} pts</Text>;
                        }
                        else if (index === 1) {
                            return <Text style={styles.second} key={index}>🥈 {user.username} - {user.score} pts</Text>;
                        }
                        else if (index === 2) {
                            return (
                                <>
                                    <Text style={styles.third} key={index}>🥉 {user.username} - {user.score} pts</Text>
                                    <View style={{ width: '100%' , height: 1, backgroundColor: '#ccc' , marginBottom: 12}}></View>
                                </>
                            );
                        }
                        return <Text style={styles.leaderboard} key={index}>{index + 1}. {user.username} - {user.score} pts</Text>;
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
}