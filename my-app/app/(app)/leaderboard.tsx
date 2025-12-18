import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import stylesheet from '@/components/stylesheet';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import api from "../../service/api";


export default function Leaderboard() {
    const styles = stylesheet();
    const [showLoader, setShowLoader] = useState(false);
    const [leaderboard, setLeaderboard] = useState([{ _id: '', username: '', score: 0 }]);

    const getLeaderboard = async () => {
        const { data, ok } = await api.get('/user/leaderboard/');

        setShowLoader(true);

        if (ok) {
            setLeaderboard(data);
            setShowLoader(false);
            return;
        } else {
            alert('Erreur');
        }
    }

    useFocusEffect(
        useCallback(() => {
            getLeaderboard();
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Classement</Text>
            <ScrollView style={styles.scrollBox}>

                {showLoader ? (

                    <Text style={styles.loading}>Chargement...</Text>

                ) :
                    leaderboard.map((user, index) => {
                        if (index === 0) {
                            return <Text style={styles.first} key={user._id}>🥇 {user.username} - {user.score} pts</Text>;
                        }
                        else if (index === 1) {
                            return <Text style={styles.second} key={user._id}>🥈 {user.username} - {user.score} pts</Text>;
                        }
                        else if (index === 2) {
                            return (
                                <>
                                    <Text style={styles.third} key={user._id}>🥉 {user.username} - {user.score} pts</Text>
                                    <View style={{ width: '100%' , height: 1, backgroundColor: '#ccc' , marginBottom: 12}}></View>
                                </>
                            );
                        }
                        return <Text style={styles.leaderboard} key={user._id}>{index + 1}. {user.username} - {user.score} pts</Text>;
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
}