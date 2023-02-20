import {
  Image as RNImage,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../../assets/theme/colors';
import globalStyles from '../../assets/theme/globalStyles';
import Background from '../../components/Background';
import Image from '../../components/Image';
import LargeTitle from '../../components/LargeTitle';
import Spacer from '../../components/Spacer';
import { showTopToast } from '../../components/ToastNotification';
import { firebaseSignOut } from '../../firebase';
import { alphaHexColor, shadowGenerator } from '../../utils';

const AVATAR_SIZE = 100;
const BORDER_AVATAR_WIDTH = 4;

const AccountScreen = ({ navigation }) => {
  const { height } = useWindowDimensions();
  const { top } = useSafeAreaInsets();
  const headerHeight = height * 0.28 + AVATAR_SIZE / 2 - top;

  const avatar =
    Math.random() < 0.5
      ? { uri: 'https://picsum.photos/100/100' }
      : require('../../assets/images/default-avatar.jpg');

  const goToEditProfile = () => navigation.navigate('EditProfile');

  const onCallToPhoneNumber = () => Linking.openURL(`tel:${'0931529903'}`);

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      showTopToast(error);
    }
  };

  return (
    <Background topDecorHeight={0.28} style={globalStyles.flexFill}>
      <View style={[styles.headerContainer, { height: headerHeight }]}>
        <LargeTitle style={styles.largeTitle}>Tài Khoản</LargeTitle>
        <View>
          <Image source={avatar} style={styles.avatar} />

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => null}
            style={styles.editAvatarButton}
          >
            <RNImage source={require('../../assets/icons/plus/plus.png')} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
        <LargeTitle style={styles.username}>Nguyễn Văn A</LargeTitle>
        <Text style={styles.address}>Việt Yên, Bắc Giang</Text>
        <ScrollView>
          <TouchableOpacity
            style={styles.callButton}
            activeOpacity={1}
            onPress={onCallToPhoneNumber}
          >
            <RNImage source={require('../../assets/icons/call/call.png')} />
            <Text style={styles.callMeText}>Call me</Text>
          </TouchableOpacity>

          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.infoTitle}>Email</Text>
              <Text style={styles.infoContent} numberOfLines={1}>
                asdhenry11@gmail.com
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoItem}>
              <Text style={styles.infoTitle}>Địa chỉ</Text>
              <Text style={styles.infoContent} numberOfLines={1}>
                Việt Yên, Bắc Giang
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoItem}>
              <Text style={styles.infoTitle}>Số điện thoại</Text>
              <Text style={styles.infoContent} numberOfLines={1}>
                (+977) 9125331510
              </Text>
            </View>
          </View>

          <Spacer h={12} />

          <TouchableOpacity
            activeOpacity={1}
            onPress={goToEditProfile}
            style={styles.editProfileButton}
          >
            <RNImage
              source={require('../../assets/icons/small-user/small-user.png')}
            />
            <View style={styles.editProfileContent}>
              <Text style={styles.editProfileTitle}>Chỉnh sửa thông tin</Text>
              <Text style={styles.editProfileDescription}>
                Chỉnh sửa thông tin hồ sơ
              </Text>
            </View>
          </TouchableOpacity>

          <Spacer h={12} />

          <View style={styles.bottomInfoContainer}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => null}
              style={styles.bottomItemContainer}
            >
              <RNImage source={require('../../assets/icons/help/help.png')} />
              <Text style={styles.bottomItemTitle}>About us</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={handleLogout}
              style={styles.bottomItemContainer}
            >
              <RNImage
                source={require('../../assets/icons/logout/logout.png')}
              />
              <Text style={styles.bottomItemTitle}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  largeTitle: {
    marginTop: 28,
  },
  avatar: {
    width: AVATAR_SIZE + BORDER_AVATAR_WIDTH * 2,
    height: AVATAR_SIZE + BORDER_AVATAR_WIDTH * 2,
    borderRadius: AVATAR_SIZE / 2 + BORDER_AVATAR_WIDTH * 2,
    borderWidth: BORDER_AVATAR_WIDTH,
    borderColor: colors.primary,
  },
  editAvatarButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    ...shadowGenerator(4),
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  body: {
    flex: 1,
    marginTop: 12,
  },
  username: {
    color: colors.primaryText,
    fontSize: 16,
    marginBottom: -6,
  },
  address: {
    color: colors.imageBackground,
    fontSize: 10,
    textAlign: 'center',
  },
  callButton: {
    marginVertical: 18,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: colors.primary,
    backgroundColor: colors.white,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '33.3%',
    alignSelf: 'center',
  },
  callMeText: {
    color: colors.primary,
    fontSize: 10,
    marginLeft: 8,
  },
  infoContainer: {
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: colors.primary,
    marginHorizontal: 30,
    overflow: 'hidden',
  },
  divider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: alphaHexColor(colors.black, 0.2),
  },
  infoItem: {
    backgroundColor: colors.white,
    paddingVertical: 20,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: alphaHexColor(colors.black, 0.8),
    width: '30%',
  },
  infoContent: {
    fontSize: 11,
    color: alphaHexColor(colors.black, 0.4),
    flexShrink: 1,
  },
  editProfileButton: {
    borderRadius: 8,
    backgroundColor: alphaHexColor(colors.primary, 0.1),
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editProfileContent: {
    marginLeft: 14,
    flex: 1,
  },
  editProfileTitle: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: 'bold',
    flexShrink: 1,
    marginBottom: 4,
  },
  editProfileDescription: {
    fontSize: 10,
    color: alphaHexColor(colors.black, 0.4),
    flexShrink: 1,
  },
  bottomInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  bottomItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  bottomItemTitle: {
    fontSize: 10,
    color: alphaHexColor(colors.black, 0.8),
    marginLeft: 14,
  },
});

export default AccountScreen;
