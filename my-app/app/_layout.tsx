import { Stack } from 'expo-router';
import { useContext } from 'react';
import { AuthContext } from './authContext';
import AuthProvider from './authContext';

function RootStack() {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <Stack>
            <Stack.Protected guard={!isLoggedIn}>
                <Stack.Screen name='(auth)' options={{ headerShown: false, animation: 'none' }} />
            </Stack.Protected>
            <Stack.Protected guard={!!isLoggedIn}>
                <Stack.Screen name='(app)' options={{ headerShown: false, animation: 'none' }} />
            </Stack.Protected>
        </Stack>
    )
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <RootStack />
        </AuthProvider>
    )
}