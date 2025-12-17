import { ScrollView, Text } from 'react-native';
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

                    // leaderboard.map((user) => <Text style={leaderboard.findIndex((u) => u._id === user._id) === 0 ? styles.first : styles.leaderboard} key={user._id}>{leaderboard.findIndex((u) => u._id === user._id) + 1}. {user.username} - {user.score} pts</Text>)

                    leaderboard.map((user, index) => {
                        let style = styles.leaderboard;
                        if (index === 0) style = styles.first;
                        else if (index === 1) style = styles.second;
                        else if (index === 2) style = styles.third;
                        return <Text style={style} key={user._id}>{index + 1}. {user.username} - {user.score} pts</Text>;
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
}