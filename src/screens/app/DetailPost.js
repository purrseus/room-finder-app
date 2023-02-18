import {
  StyleSheet,
  Image as RNImage,
  useWindowDimensions,
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  Platform,
} from 'react-native';
import open from 'react-native-open-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../../assets/theme/colors';
import fonts from '../../assets/theme/fonts';
import globalStyles from '../../assets/theme/globalStyles';
import Button from '../../components/Button';
import Image from '../../components/Image';
import Spacer from '../../components/Spacer';
import { alphaHexColor } from '../../utils';

const CheckItem = ({ title }) => {
  return (
    <View style={[styles.row, { width: '50%' }]}>
      <RNImage
        source={require('../../assets/icons/check/check.png')}
        style={styles.checkIcon}
      />
      <Text style={styles.statusText}>{title}</Text>
    </View>
  );
};

const DetailPost = ({ navigation }) => {
  const { top, bottom } = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const goToMaps = async () => {
    try {
      open({ provider: Platform.OS === 'ios' ? 'apple' : 'google', query: 'Việt Yên, Bắc Giang' });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={globalStyles.flexFill}>
      <TouchableOpacity
        activeOpacity={1}
        hitSlop={12}
        onPress={navigation.goBack}
        style={[styles.back, { top: top + 12 }]}
      >
        <RNImage
          source={require('../../assets/icons/arrow-left/arrow-left.png')}
        />
      </TouchableOpacity>
      <Image
        source={{ uri: 'https://picsum.photos/300/300' }}
        style={{ width, height: height * 0.48 }}
      />
      <View style={[styles.sheet, { height: height * 0.52 + 30 }]}>
        <ScrollView
          contentContainerStyle={{ paddingTop: 30, paddingHorizontal: 30 }}
        >
          <Text numberOfLines={2} style={styles.title}>
            Phòng trọ tự quản, có nóng lạnh
          </Text>
          <View style={styles.rowBetween}>
            <View style={styles.priceWrapper}>
              <Text style={styles.price}>800.000đ</Text>
              <Text style={styles.perMonth}> / tháng</Text>
            </View>
            <Text style={styles.createdAt}>Ngày đăng: 14/11/2022</Text>
          </View>

          <View style={styles.twoSideContainer}>
            <View style={styles.leftContentContainer}>
              <View style={styles.row}>
                <View style={styles.iconWrapper}>
                  <RNImage
                    source={require('../../assets/icons/size/size.png')}
                    style={styles.sizeIcon}
                  />
                </View>
                <Text style={styles.info} numberOfLines={1}>
                  Diện tích: 30m2
                </Text>
              </View>
              <Spacer h={8} />
              <View style={styles.row}>
                <View style={styles.iconWrapper}>
                  <RNImage
                    source={require('../../assets/icons/map-marker/map-marker.png')}
                    style={styles.locationIcon}
                  />
                </View>
                <Text style={styles.info} numberOfLines={2}>
                  16a , Ngõ 603, Phan Lương Ngọc Quyến, Thái Nguyên
                </Text>
              </View>
              <Spacer h={8} />
              <View style={styles.row}>
                <View style={styles.iconWrapper}>
                  <RNImage
                    source={require('../../assets/icons/call/call.png')}
                    style={styles.callIcon}
                  />
                </View>
                <Text style={styles.info} numberOfLines={2}>
                  0931529903
                </Text>
              </View>
            </View>
            <Spacer w={16} />
            <View style={styles.rightContentContainer}>
              <View style={styles.row}>
                <View
                  style={[styles.dot, { backgroundColor: colors.primary }]}
                />
                <Text style={styles.statusText}>Còn phòng</Text>
              </View>
              <Spacer h={8} />
              <Text style={styles.owner}>Chủ trọ: Trần Tuấn Vũ</Text>
              <Spacer h={8} />
              <Text onPress={goToMaps} style={styles.hyperLink}>
                Xem trên Google Map
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.subTitle}>Miêu tả</Text>
          <Text style={styles.description}>
            Phòng trọ tự quản của chúng tôi có tất cả những tiện ích cần thiết
            để cung cấp cho khách hàng một môi trường nghỉ ngơi tốt nhất. Đặc
            biệt, phòng có điều hoà nóng lạnh tự động đảm bảo cho khách hàng một
            nền môi trường sạch và thoáng mát mọi lúc. Hãy đến với chúng tôi để
            tận hưởng một kỳ nghỉ tuyệt vời!
          </Text>

          <Text style={styles.subTitle}>Tiện ích</Text>

          <View style={styles.checkContainer}>
            {['Nóng lạnh', 'Chỗ để xe', 'Điều hoà', 'Wifi'].map((text) => (
              <CheckItem key={text} title={text} />
            ))}
          </View>
        </ScrollView>
        <Button
          title="Liên hệ"
          style={[styles.button, { marginBottom: bottom || 16 }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sheet: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.white,
    ...StyleSheet.absoluteFillObject,
    top: undefined,
  },
  back: {
    position: 'absolute',
    zIndex: 10,
    left: 30,
  },
  title: {
    fontSize: 20,
    color: alphaHexColor(colors.black, 0.6),
    fontFamily: fonts.balloBhainaExtraBold,
    flexShrink: 1,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
  perMonth: {
    fontSize: 11,
    color: alphaHexColor(colors.black, 0.6),
  },
  createdAt: {
    fontSize: 10,
    color: alphaHexColor(colors.black, 0.6),
  },
  leftContentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  rightContentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  twoSideContainer: {
    flexDirection: 'row',
    marginTop: 26,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeIcon: {
    width: 14,
    height: 14,
  },
  locationIcon: {
    width: 10,
    height: 13,
  },
  info: {
    flexShrink: 1,
    fontSize: 12,
    marginLeft: 10,
    color: alphaHexColor(colors.black, 0.6),
  },
  callIcon: {
    width: 14,
    height: 14,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusText: {
    fontSize: 12,
    marginLeft: 10,
    color: alphaHexColor(colors.black, 0.6),
  },
  owner: {
    fontSize: 10,
    color: alphaHexColor(colors.black, 0.6),
  },
  hyperLink: {
    fontSize: 10,
    color: alphaHexColor(colors.black, 0.8),
    textDecorationLine: 'underline',
  },
  divider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.primary,
    marginVertical: 26,
  },
  subTitle: {
    fontSize: 12,
    color: alphaHexColor(colors.black, 0.8),
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 10,
    color: alphaHexColor(colors.black, 0.6),
    marginBottom: 18,
  },
  checkIcon: {
    width: 12,
    height: 12,
  },
  checkContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 30,
  },
  button: {
    paddingVertical: 12,
    marginTop: 16,
    marginHorizontal: 30,
  },
});

export default DetailPost;
