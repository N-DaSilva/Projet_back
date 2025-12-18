import { Link, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import stylesheet from '@/components/stylesheet';

export default function NotFoundScreen() {
  const styles = stylesheet();
  return (
    <>
      <Stack.Screen options={{ title: "Oops! This screen doesn't exist." }} />
      <SafeAreaView style={styles.containerCenter}>
        <Link style={styles.link} href="/">Go to home screen</Link>
      </SafeAreaView>
    </>
  );
}