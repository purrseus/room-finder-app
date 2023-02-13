import React from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import Background from '../../components/Background';
import useAuthStore from '../../stores/useAuthStore';

const LoginScreen = () => {
  const handleLogin = useAuthStore(state => state.handleLogin);

  return (
    <Background style={styles.container}>
      <Text>LoginScreen</Text>
      <Button title="login" onPress={handleLogin} />
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
