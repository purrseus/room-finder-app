import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../assets/theme/colors';
import globalStyles from '../assets/theme/globalStyles';
import AccountScreen from '../screens/app/AccountScreen';
import HomeScreen from '../screens/app/HomeScreen';
import PostManagementScreen from '../screens/app/PostManagementScreen';
import SearchScreen from '../screens/app/SearchScreen';
import { shadowGenerator } from '../utils';

const bottomTabData = {
  Home: { icon: require('../assets/icons/home/home.png'), label: 'Trang Chủ' },
  Search: {
    icon: require('../assets/icons/search/search.png'),
    label: 'Tìm Kiếm',
  },
  PostManagement: {
    icon: require('../assets/icons/options/options.png'),
    label: 'Quản Lý Bài Đăng',
  },
  Account: {
    icon: require('../assets/icons/account/account.png'),
    label: 'Tài Khoản',
  },
};

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const { bottom } = useSafeAreaInsets();
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: colors.white }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => (
          <Image
            source={bottomTabData[route.name].icon}
            style={{ tintColor: color, width: 24, height: 24 }}
          />
        ),
        tabBarLabel: ({ color }) => (
          <Text style={[{ color }, styles.tabBarLabel]}>
            {bottomTabData[route.name].label}
          </Text>
        ),
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabInactive,
        headerShown: false,
        tabBarItemStyle: globalStyles.flexFillCenter,
        tabBarIconStyle: { flex: 0, height: 32 },
        tabBarStyle: {
          height: 64 + bottom,
          paddingBottom: bottom,
          ...shadowGenerator(12),
        },
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="PostManagement" component={PostManagementScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarItem: {
    borderWidth: 1,
  },
  tabBarLabel: {
    fontSize: 11,
  },
});

export default BottomTab;
