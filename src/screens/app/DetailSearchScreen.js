import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Image as RNImage,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../assets/theme/colors';
import globalStyles from '../../assets/theme/globalStyles';
import Background from '../../components/Background';
import IconTextInput from '../../components/IconTextInput';
import LargeCard from '../../components/LargeCard';
import Spacer from '../../components/Spacer';
import { postsSnapshot } from '../../firebase/cloudFirestore';
import { alphaHexColor, formatTextToSearch } from '../../utils';
import SearchItem from './components/SearchItem';

const DetailSearchScreen = ({ route: { params }, navigation }) => {
  const [posts, setPosts] = useState([]);

  const resultList = useMemo(() => {
    return posts.filter((post) =>
      formatTextToSearch(post?.address).includes(
        formatTextToSearch(params?.searchText),
      ),
    );
  }, [posts]);

  useEffect(() => {
    const unsubscribe = postsSnapshot((documentSnapshot) => {
      const tempPosts = [];
      documentSnapshot.forEach((doc) => {
        tempPosts.push({ ...doc.data(), id: doc.id });
      });
      setPosts(tempPosts);
    });

    return () => unsubscribe();
  }, []);

  const HeaderItems = useCallback(
    () => (
      <>
        <Spacer h={16} />
        <Text style={styles.listTitle}>Kết quả liên quan</Text>
      </>
    ),
    [],
  );

  const renderItem = useCallback(({ item }) => {
    return <SearchItem item={item} />;
  }, []);

  return (
    <Background topDecorHeight={0.2} style={globalStyles.flexFill}>
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
        data={resultList}
        renderItem={renderItem}
        ListHeaderComponent={HeaderItems}
        ItemSeparatorComponent={<Spacer h={12} />}
        contentContainerStyle={{ paddingBottom: 12 }}
        keyExtractor={(item, index) => item?.id || index}
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

export default DetailSearchScreen;
