import React from 'react';
import { Button, Text } from 'react-native';
import Background from '../../components/Background';
import useAuthStore from '../../stores/useAuthStore';

const AccountScreen = () => {
  const handleLogout = useAuthStore(state => state.handleLogout);

  return (
    <Background>
      <Text>AccountScreen</Text>
      <Button title="logout" onPress={handleLogout} />
    </Background>
  );
};

export default AccountScreen;
