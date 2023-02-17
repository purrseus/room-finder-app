import { useScrollToTop } from '@react-navigation/native';
import { useCallback, useRef } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../../assets/theme/colors';
import Background from '../../components/Background';
import Button from '../../components/Button';
import IconTextInput from '../../components/IconTextInput';
import LargeCard from '../../components/LargeCard';
import LargeTitle from '../../components/LargeTitle';
import Spacer from '../../components/Spacer';
import { alphaHexColor } from '../../utils';
import SearchItem from './components/SearchItem';

const SearchScreen = () => {
  const scrollRef = useRef(null);

  useScrollToTop(scrollRef);

  const openBottomSheet = () => console.log('open bottom sheet');

  const onSearch = () => console.log('onSearch');

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
    <Background topDecorHeight={0.25}>
      <LargeTitle style={styles.headerTitle}>Tìm Phòng Trọ</LargeTitle>

      <Spacer h={18} />
      <LargeCard>
        <Text style={styles.cardTitle}>Tìm phòng trọ theo địa chỉ</Text>
        <IconTextInput
          iconLeft={require('../../assets/icons/map-marker/map-marker.png')}
          placeholder="Nhập địa chỉ, thành phố hoặc khu vực"
          style={styles.input}
        />
        <IconTextInput
          iconLeft={require('../../assets/icons/cash/cash.png')}
          iconLeftStyle={{ width: 8, height: 12 }}
          placeholder="Nhập phạm vi giá"
          style={styles.input}
        />
        <TouchableOpacity activeOpacity={1} onPress={openBottomSheet}>
          <IconTextInput
            iconLeft={require('../../assets/icons/menu/menu.png')}
            iconRight={require('../../assets/icons/menu-down/menu-down.png')}
            placeholder="Nhập tiện ích mong muốn"
            style={styles.input}
            editable={false}
          />
        </TouchableOpacity>
        <Button title="Tìm kiếm" onPress={onSearch} style={styles.button} />
      </LargeCard>

      <FlatList
        ref={scrollRef}
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
});

export default SearchScreen;
