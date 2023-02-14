import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootStack from './src/navigation/RootStack';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <RootStack />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
