import { Stack } from 'expo-router';

export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false, animation: 'none' }} />
            <Stack.Screen name='signin' options={{ headerShown: false, animation: 'none' }} />
            <Stack.Screen name='signup' options={{ headerShown: false, animation: 'none' }} />
        </Stack>
    )
}