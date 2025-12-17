import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function AppLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: '#00C4D6',  tabBarInactiveTintColor: "#fff", tabBarStyle: { backgroundColor: '#12072E', borderColor: 'transparent' } }}>
            <Tabs.Screen name = "index" options={{ headerShown: false , tabBarShowLabel: false, animation : 'none', tabBarIcon: ({color}) => <FontAwesome name='star' size={28} color={color} />}}/>
            <Tabs.Screen name = "leaderboard" options={{ headerShown: false , tabBarShowLabel: false, animation : 'none', tabBarIcon: ({color}) => <FontAwesome name='trophy' size={28} color={color} />}}/>
            <Tabs.Screen name = "profile" options={{ headerShown: false , tabBarShowLabel: false, animation : 'none', tabBarIcon: ({color}) => <FontAwesome name='user' size={28} color={color} />}}/>
        </Tabs>
    )
}