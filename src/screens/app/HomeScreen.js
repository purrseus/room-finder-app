import { useScrollToTop } from '@react-navigation/native';
import React, { useCallback, useMemo, useRef } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../../assets/theme/colors';
import Background from '../../components/Background';
import Button from '../../components/Button';
import IconTextInput from '../../components/IconTextInput';
import LargeCard from '../../components/LargeCard';
import LargeTitle from '../../components/LargeTitle';
import Spacer from '../../components/Spacer';
import { alphaHexColor } from '../../utils';
import HomeItem from './components/HomeItem';

const HomeScreen = () => {
  const scrollRef = useRef(null);
  const { bottom } = useSafeAreaInsets();

  useScrollToTop(scrollRef);

  const onSearch = () => console.log('onSearch');

  const HeaderItems = useCallback(
    () => (
      <>
        <Spacer h={18} />
        <LargeCard style={{ marginHorizontal: 16 }}>
          <Text style={styles.cardTitle}>Tìm phòng trọ theo địa chỉ</Text>
          <IconTextInput
            iconLeft={require('../../assets/icons/map-marker/map-marker.png')}
            placeholder="Nhập địa chỉ, vùng hoặc thành phố"
            style={styles.input}
          />
          <Button title="Tìm kiếm" onPress={onSearch} style={styles.button} />
        </LargeCard>
        <View style={styles.titleListContainer}>
          <Text style={styles.titleList}>Danh sách phòng thêm mới</Text>
          <Text style={styles.countItem}>{100} kết quả</Text>
        </View>
      </>
    ),
    [],
  );

  const renderItem = useCallback(({ item, index }) => {
    return <HomeItem />;
  }, []);

  return (
    <Background>
      <LargeTitle style={styles.headerTitle}>Tìm Phòng Trọ</LargeTitle>
      <FlatList
        ref={scrollRef}
        data={Array.from({ length: 60 }, (_, i) => i)}
        renderItem={renderItem}
        ListHeaderComponent={HeaderItems}
        ListFooterComponent={() => <Spacer h={140} />}
      />
    </Background>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    marginVertical: 18,
  },
  cardTitle: {
    fontWeight: 'bold',
    color: colors.primaryText,
    marginBottom: 16,
  },
  input: {
    marginVertical: 4,
  },
  button: {
    paddingVertical: 12,
    marginVertical: 4,
  },
  titleListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 4,
    marginTop: 20,
    marginHorizontal: 30,
  },
  titleList: {
    fontSize: 14,
    fontWeight: 'bold',
    color: alphaHexColor(colors.black, 0.6),
  },
  countItem: {
    fontSize: 8,
    color: alphaHexColor(colors.black, 0.6),
  },
});

export default HomeScreen;
