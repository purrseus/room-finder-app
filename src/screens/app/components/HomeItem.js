import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../../assets/theme/colors';
import Image from '../../../components/Image';
import Spacer from '../../../components/Spacer';
import { alphaHexColor, shadowGenerator } from '../../../utils';

const HomeItem = () => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => null}
      style={styles.container}
    >
      <Image
        style={styles.image}
        source={{ uri: 'https://picsum.photos/500/500' }}
      />
      <Spacer w={14} />
      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.name} numberOfLines={1}>
            Phòng trọ tự quản, có nóng lạnh
          </Text>
          <Text style={styles.address}>Lương Ngọc Quyến, Thái Nguyên</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>800.000đ</Text>
            <Text style={styles.perMonth}> / tháng</Text>
          </View>
        </View>

        <View style={styles.statusWrapper}>
          <View style={[styles.dot, { backgroundColor: colors.primary }]} />
          <Spacer w={6} />
          <Text style={styles.statusText}>Còn phòng</Text>
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
    flexShrink: 1,
  },
  address: {
    marginVertical: 8,
    fontSize: 10,
    color: alphaHexColor(colors.black, 0.6),
    flexShrink: 1,
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

export default HomeItem;
