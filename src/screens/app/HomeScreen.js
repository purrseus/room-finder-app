import { useScrollToTop } from '@react-navigation/native';
import { useCallback, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import colors from '../../assets/theme/colors';
import globalStyles from '../../assets/theme/globalStyles';
import Background from '../../components/Background';
import Button from '../../components/Button';
import IconTextInput from '../../components/IconTextInput';
import LargeCard from '../../components/LargeCard';
import LargeTitle from '../../components/LargeTitle';
import Spacer from '../../components/Spacer';
import { alphaHexColor } from '../../utils';
import HomeItem from './components/HomeItem';

const HomeScreen = ({ navigation }) => {
  const scrollRef = useRef(null);
  const [searchText, setSearchText] = useState('');

  useScrollToTop(scrollRef);

  const onSearch = () => {
    if (searchText.trim().length)
      navigation.navigate('DetailSearch', { searchText: searchText.trim() });
  };

  const HeaderItems = useCallback(
    () => (
      <View style={styles.listTitleContainer}>
        <Text style={styles.listTitle}>Danh sách phòng thêm mới</Text>
        <Text style={styles.countItem}>{100} kết quả</Text>
      </View>
    ),
    [],
  );

  const renderItem = useCallback(({ item, index }) => {
    return <HomeItem />;
  }, []);

  return (
    <Background topDecorHeight={0.25}  style={globalStyles.flexFill}>
      <LargeTitle style={styles.headerTitle}>Tìm Phòng Trọ</LargeTitle>

      <Spacer h={18} />
      <LargeCard>
        <Text style={styles.cardTitle}>Tìm phòng trọ theo địa chỉ</Text>
        <IconTextInput
          iconLeft={require('../../assets/icons/map-marker/map-marker.png')}
          placeholder="Nhập địa chỉ, vùng hoặc thành phố"
          style={styles.input}
          value={searchText}
          onChangeText={setSearchText}
        />
        <Button title="Tìm kiếm" onPress={onSearch} style={styles.button} />
      </LargeCard>

      <FlatList
        ref={scrollRef}
        data={Array.from({ length: 60 }, (_, i) => i)}
        renderItem={renderItem}
        ListHeaderComponent={HeaderItems}
        ListFooterComponent={() => <Spacer h={360} />}
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
  listTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 4,
    marginTop: 20,
    marginHorizontal: 30,
  },
  listTitle: {
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
