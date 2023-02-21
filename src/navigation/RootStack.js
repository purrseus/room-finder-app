import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { ActivityIndicator, View } from 'react-native';
import colors from '../assets/theme/colors';
import globalStyles from '../assets/theme/globalStyles';
import useFirebaseAuthState from '../hooks/useFirebaseAuthState';
import CreatePostScreen from '../screens/app/CreatePostScreen';
import DetailPostScreen from '../screens/app/DetailPostScreen';
import DetailSearchScreen from '../screens/app/DetailSearchScreen';
import EditPostScreen from '../screens/app/EditPostScreen';
import EditProfileScreen from '../screens/app/EditProfileScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import BottomTab from './BottomTab';

const Stack = createNativeStackNavigator();

const UnprotectedScreens = (
  <Stack.Group>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Group>
);

const ProtectedScreens = (
  <Stack.Group>
    <Stack.Screen name="BottomTab" component={BottomTab} />

    <Stack.Screen name="DetailPost" component={DetailPostScreen} />
    <Stack.Screen name="DetailSearch" component={DetailSearchScreen} />

    <Stack.Screen name="CreatePost" component={CreatePostScreen} />
    <Stack.Screen name="EditPost" component={EditPostScreen} />

    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
  </Stack.Group>
);

const RootStack = () => {
  const user = useFirebaseAuthState();

  const [fontsLoaded] = useFonts({
    'BalooBhaina-Regular': require('../../assets/fonts/BalooBhaina2-Regular.ttf'),
    'BalooBhaina-Medium': require('../../assets/fonts/BalooBhaina2-Medium.ttf'),
    'BalooBhaina-SemiBold': require('../../assets/fonts/BalooBhaina2-SemiBold.ttf'),
    'BalooBhaina-Bold': require('../../assets/fonts/BalooBhaina2-Bold.ttf'),
    'BalooBhaina-ExtraBold': require('../../assets/fonts/BalooBhaina2-ExtraBold.ttf'),
  });

  if (user === undefined || !fontsLoaded) {
    return (
      <View style={globalStyles.flexFillCenter}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.white },
      }}
    >
      {user?.id ? ProtectedScreens : UnprotectedScreens}
    </Stack.Navigator>
  );
};

export default RootStack;
