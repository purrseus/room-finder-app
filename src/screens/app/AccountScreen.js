import { Button, Text } from 'react-native';
import globalStyles from '../../assets/theme/globalStyles';
import Background from '../../components/Background';
import useAuthStore from '../../stores/useAuthStore';

const AccountScreen = () => {
  const handleLogout = useAuthStore((state) => state.handleLogout);

  return (
    <Background style={globalStyles.flexFillCenter}>
      <Text>AccountScreen</Text>
      <Button title="logout" onPress={handleLogout} />
    </Background>
  );
};

export default AccountScreen;
