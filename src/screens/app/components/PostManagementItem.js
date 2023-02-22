import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../../assets/theme/colors';
import Image from '../../../components/Image';
import Spacer from '../../../components/Spacer';
import { alphaHexColor, formatCurrency, shadowGenerator } from '../../../utils';

const PostManagementItem = ({ item }) => {
  const navigation = useNavigation();

  const onEditPost = () => {
    navigation.navigate('EditPost', { defaultValues: item });
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onEditPost}
      style={styles.container}
    >
      <Image
        style={styles.image}
        source={{ imageStorage: item?.photo }}
      />
      <Spacer w={14} />
      <View style={styles.contentContainer}>
        <View>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>{formatCurrency(item?.price)}</Text>
          </View>
          <Text style={styles.name} numberOfLines={1}>
            {item?.title}
          </Text>
          <Text style={styles.address}>{item?.address}</Text>
        </View>

        <View style={styles.statusWrapper}>
          <View style={[styles.dot, { backgroundColor: !item?.approved ? colors.orange : colors.primary }]} />
          <Spacer w={6} />
          <Text style={styles.statusText}>{item?.approved ? 'Đã đăng' : 'Chưa duyệt'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 14,
    marginHorizontal: 30,
    borderRadius: 8,
    ...shadowGenerator(8, alphaHexColor(colors.black, 0.4)),
    backgroundColor: colors.white,
    padding: 12,
    flexDirection: 'row',
  },
  image: {
    width: 86,
    height: 86,
    borderRadius: 8,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 13,
    color: alphaHexColor(colors.black, 0.6),
    fontWeight: 'bold',
    marginVertical: 4,
    flexShrink: 1,
  },
  address: {
    fontSize: 10,
    color: alphaHexColor(colors.black, 0.6),
    flexShrink: 1,
  },
  priceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  price: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.white,
  },
  statusWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
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

export default PostManagementItem;
