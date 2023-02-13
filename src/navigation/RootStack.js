import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import colors from '../assets/theme/colors';
import globalStyles from '../assets/theme/globalStyles';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import useAuthStore from '../stores/useAuthStore';
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
  </Stack.Group>
);

const RootStack = () => {
  const { logged, hasHydrated } = useAuthStore((state) => ({
    logged: state.logged,
    hasHydrated: state._hasHydrated,
  }));

  if (!hasHydrated) {
    <View style={globalStyles.flexFillCenter}>
      <ActivityIndicator color={colors.primary} />
    </View>;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.white },
      }}
    >
      {logged ? ProtectedScreens : UnprotectedScreens}
    </Stack.Navigator>
  );
};

export default RootStack;
