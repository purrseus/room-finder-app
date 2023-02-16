import React, { useCallback } from 'react';
import {
  FlatList,
  Image as RNImage,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../../assets/theme/colors';
import Background from '../../components/Background';
import IconTextInput from '../../components/IconTextInput';
import LargeCard from '../../components/LargeCard';
import Spacer from '../../components/Spacer';
import { alphaHexColor } from '../../utils';
import SearchItem from './components/SearchItem';

const DetailSearch = ({ route: { params }, navigation }) => {
  const { top, bottom } = useSafeAreaInsets();

  const HeaderItems = useCallback(
    () => (
      <>
        <Spacer h={16} />
        <Text style={styles.listTitle}>Kết quả liên quan</Text>
      </>
    ),
    [],
  );

  const renderItem = useCallback(({ item, index }) => {
    return <SearchItem />;
  }, []);

  return (
    <Background topDecorHeight={0.2}>
      <View style={styles.row}>
        <TouchableOpacity
          activeOpacity={1}
          hitSlop={12}
          onPress={navigation.goBack}
          style={styles.back}
        >
          <RNImage
            source={require('../../assets/icons/arrow-left/arrow-left.png')}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết tìm kiếm</Text>
        <TouchableOpacity
          activeOpacity={1}
          hitSlop={12}
          disabled
          onPress={navigation.goBack}
          style={[styles.back, { opacity: 0 }]}
        >
          <RNImage
            source={require('../../assets/icons/arrow-left/arrow-left.png')}
          />
        </TouchableOpacity>
      </View>

      <Spacer h={18} />
      <LargeCard>
        <Text style={styles.cardTitle}>Tìm phòng trọ theo địa chỉ</Text>
        <IconTextInput
          iconLeft={require('../../assets/icons/map-marker/map-marker.png')}
          placeholder="Nhập địa chỉ, vùng hoặc thành phố"
          style={styles.input}
          readonly
          value={params.searchText}
        />
      </LargeCard>

      <FlatList
        data={Array.from({ length: 60 }, (_, i) => i)}
        renderItem={renderItem}
        ListHeaderComponent={HeaderItems}
        ListFooterComponent={() => <Spacer h={460} />}
      />
    </Background>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
  },
  back: {},
  cardTitle: {
    fontWeight: 'bold',
    color: colors.primaryText,
    marginBottom: 16,
  },
  input: {
    marginVertical: 4,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: alphaHexColor(colors.black, 0.6),
    marginHorizontal: 30,
    marginVertical: 12,
  },
  button: {
    paddingVertical: 12,
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 42,
    marginHorizontal: 30,
  },
});

export default DetailSearch;
