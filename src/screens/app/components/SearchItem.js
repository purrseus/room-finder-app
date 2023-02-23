import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image as RNImage,
  TouchableOpacity,
} from 'react-native';
import colors from '../../../assets/theme/colors';
import Image from '../../../components/Image';
import Spacer from '../../../components/Spacer';
import { alphaHexColor, formatCurrency, shadowGenerator, utilityTitle } from '../../../utils';

const SearchItem = ({ item }) => {
  const navigation = useNavigation();

  const goToDetail = () => {
    navigation.navigate('DetailPost', { id: item?.id });
  };

  const availableUtilities = useMemo(() => {
    if (!item) return '';
    return Object.entries(item)
      .filter(([key, value]) => !!key.startsWith('has') && !!value)
      .map(([text]) => utilityTitle(text))
      .join(', ');
  }, [item]);

  return (
    <TouchableOpacity
      onPress={goToDetail}
      activeOpacity={1}
      style={styles.container}
    >
      <Image source={{ imageStorage: item?.photo }} style={styles.image} />
      <Spacer h={16} />
      <View style={styles.contentContainer}>
        <View style={styles.leftContentContainer}>
          <Text style={styles.address} numberOfLines={2}>
            {item?.address}
          </Text>
          <Text style={styles.title} numberOfLines={2}>
            {item?.title}
          </Text>
          <View style={styles.utilitiesWrapper}>
            <RNImage
              source={require('../../../assets/icons/utilities/utilities.png')}
            />
            {!!availableUtilities.length && (
              <Text style={styles.utilitiesText} numberOfLines={2}>
                {availableUtilities}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.rightContentContainer}>
          <View style={styles.roomRateWrapper}>
            <Text style={styles.roomRate} numberOfLines={1}>
              {formatCurrency(item?.roomRate)}
            </Text>
            <Text style={styles.perMonth} numberOfLines={1}>
              {' '}
              / tháng
            </Text>
          </View>
          <Spacer h={8} />
          <View style={styles.statusWrapper}>
            <View style={[styles.dot, { backgroundColor: item?.isOutOfRoom ? colors.orange : colors.primary }]} />
            <Spacer w={6} />
            <Text style={styles.statusText}>{item?.isOutOfRoom ? 'Hết phòng' : 'Còn phòng'}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    borderRadius: 8,
    ...shadowGenerator(8, alphaHexColor(colors.black, 0.4)),
    backgroundColor: colors.white,
    padding: 12,
    paddingBottom: 20,
  },
  image: {
    flex: 1,
    aspectRatio: 290 / 110,
    borderRadius: 8,
  },
  contentContainer: {
    flexDirection: 'row',
  },
  leftContentContainer: {
    flex: 6,
    paddingHorizontal: 8,
  },
  rightContentContainer: {
    flex: 4,
    paddingHorizontal: 8,
  },
  address: {
    fontSize: 10,
    color: alphaHexColor(colors.black, 0.4),
    flexShrink: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: alphaHexColor(colors.black, 0.6),
    marginVertical: 4,
    flexShrink: 1,
  },
  utilitiesWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  utilitiesText: {
    fontSize: 8,
    color: alphaHexColor(colors.black, 0.6),
    marginLeft: 8,
    flexShrink: 1,
  },
  roomRateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  roomRate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
  perMonth: {
    fontSize: 11,
    color: alphaHexColor(colors.black, 0.6),
    flexShrink: 1,
  },
  statusWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 18,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 10,
    color: alphaHexColor(colors.black, 0.6),
  },
});

export default SearchItem;
