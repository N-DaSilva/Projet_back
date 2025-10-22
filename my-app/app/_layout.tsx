import { Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function RootLayout() {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    useEffect(() => {
        AsyncStorage.getItem('token').then((res)=>{
            setIsLoggedIn(res !== null);
        })
    }, []);

    return (
        <Stack>
            <Stack.Protected guard={!isLoggedIn}>
                <Stack.Screen name='(auth)' options={{ headerShown: false }} />
            </Stack.Protected>
            <Stack.Protected guard={!!isLoggedIn}>
                <Stack.Screen name='(app)' options={{ headerShown: false }} />
            </Stack.Protected>
        </Stack>
    )
}