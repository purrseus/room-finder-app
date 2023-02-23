import { useScrollToTop } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../assets/theme/colors';
import globalStyles from '../../assets/theme/globalStyles';
import Background from '../../components/Background';
import Button from '../../components/Button';
import IconTextInput from '../../components/IconTextInput';
import LargeCard from '../../components/LargeCard';
import LargeTitle from '../../components/LargeTitle';
import Spacer from '../../components/Spacer';
import { postsSnapshot } from '../../firebase/cloudFirestore';
import { alphaHexColor } from '../../utils';
import SearchItem from './components/SearchItem';

const utilityTitle = (text) => {
  return (
    {
      hasAirCondition: 'Điều hòa',
      hasFridge: 'Tủ lạnh',
      hasParking: 'Chỗ để xe',
      hasTV: 'Tivi',
      hasWaterHeater: 'Nóng lạnh',
      hasWifi: 'Wifi',
    }[text] || ''
  );
};

const SearchScreen = () => {
  const scrollRef = useRef(null);
  const [posts, setPosts] = useState([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [utilities, setUtilities] = useState({
    hasWaterHeater: false,
    hasAirCondition: false,
    hasWifi: false,
    hasParking: false,
    hasFridge: false,
    hasTV: false,
  });

  const changeUtilitiesState = (key) => (value) =>
    setPostInfo((prevState) => ({ ...prevState, [key]: value }));

  useScrollToTop(scrollRef);

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

  const openModal = () => setModalOpened(true);
  const closeModal = () => setModalOpened(false);

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

  const renderItem = useCallback(({ item }) => {
    return <SearchItem item={item} />;
  }, []);

  return (
    <Background topDecorHeight={0.25} style={globalStyles.flexFill}>
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
        <TouchableOpacity activeOpacity={1} onPress={openModal}>
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
        data={posts}
        renderItem={renderItem}
        ListHeaderComponent={HeaderItems}
        ItemSeparatorComponent={<Spacer h={12} />}
        contentContainerStyle={{ paddingBottom: 12 }}
        keyExtractor={(item, index) => item?.id || index}
      />

      <Modal visible={modalOpened} transparent>
        <TouchableOpacity
          activeOpacity={1}
          onPress={closeModal}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.modalContainer}>
          {Object.keys(utilities).map((title, index) => (
            <View key={index}>
              <Text>{utilityTitle(title)}</Text>
            </View>
          ))}
        </View>
      </Modal>
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
  modalContainer: {},
});

export default SearchScreen;
