import { useScrollToTop } from '@react-navigation/native';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import colors from '../../assets/theme/colors';
import globalStyles from '../../assets/theme/globalStyles';
import Background from '../../components/Background';
import Button from '../../components/Button';
import IconTextInput from '../../components/IconTextInput';
import LargeCard from '../../components/LargeCard';
import LargeTitle from '../../components/LargeTitle';
import { showOverlayLoading } from '../../components/OverlayLoading';
import Spacer from '../../components/Spacer';
import { postsSnapshot } from '../../firebase/cloudFirestore';
import {
  alphaHexColor,
  formatTextToSearch,
  shadowGenerator,
  utilityTitle,
} from '../../utils';
import SearchItem from './components/SearchItem';
import UtilitiesModal from './components/UtilitiesModal';

const SearchScreen = () => {
  const scrollRef = useRef(null);

  const [posts, setPosts] = useState([]);
  const [filterPosts, setFilterPosts] = useState([]);

  const [modalOpened, setModalOpened] = useState(false);

  const [addressSearch, setAddressSearch] = useState('');
  const [roomRateSearch, setRoomRateSearch] = useState('');
  const [utilities, setUtilities] = useState({
    hasWaterHeater: false,
    hasAirCondition: false,
    hasWifi: false,
    hasParking: false,
    hasFridge: false,
    hasTV: false,
  });

  const [searching, setSearching] = useState(false);
  const [isPending, startTransition] = useTransition();

  const changeUtilitiesState = (key) => (value) =>
    setUtilities((prevState) => ({ ...prevState, [key]: value }));

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

  const openModal = () => {
    setModalOpened(true);
  };
  const closeModal = () => {
    setModalOpened(false);
  };

  const onSearch = () => {
    Keyboard.dismiss();
    showOverlayLoading(true);

    const roomRateNumberSearch = +roomRateSearch.replace(/\D+/g, '');
    const utilitiesSearch = Object.entries(utilities)
      .filter(([, value]) => !!value)
      .map(([key]) => key);
    const noSearch =
      !addressSearch.length && !roomRateNumberSearch && !utilitiesSearch.length;

    setSearching(!noSearch);

    let resultPosts = [...posts];
    if (addressSearch.length) {
      resultPosts = resultPosts.filter((post) =>
        formatTextToSearch(post.address)?.includes(
          formatTextToSearch(addressSearch),
        ),
      );
    }

    if (roomRateNumberSearch) {
      resultPosts = resultPosts.filter(
        (post) => +post.roomRate <= roomRateNumberSearch,
      );
    }

    if (utilitiesSearch.length) {
      resultPosts = resultPosts.filter((post) =>
        utilitiesSearch.some((u) => !!post[u]),
      );
    }
    startTransition(() => {
      setFilterPosts(resultPosts);
    });
    showOverlayLoading(false);
  };

  const HeaderItems = useCallback(
    () => (
      <>
        <Spacer h={16} />
        {isPending && <ActivityIndicator color={colors.primary} />}
        <Text style={styles.listTitle}>Kết quả liên quan</Text>
      </>
    ),
    [isPending],
  );

  const availableUtilities = useMemo(() => {
    return Object.entries(utilities)
      .filter(([key, value]) => !!key.startsWith('has') && !!value)
      .map(([text]) => utilityTitle(text))
      .join(', ');
  }, [utilities]);

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
          value={addressSearch}
          onChangeText={setAddressSearch}
        />
        <IconTextInput
          iconLeft={require('../../assets/icons/cash/cash.png')}
          iconLeftStyle={{ width: 8, height: 12 }}
          placeholder="Nhập phạm vi giá"
          keyboardType="number-pad"
          style={styles.input}
          value={roomRateSearch}
          onChangeText={setRoomRateSearch}
        />
        <TouchableOpacity activeOpacity={1} onPress={openModal}>
          <IconTextInput
            iconLeft={require('../../assets/icons/menu/menu.png')}
            iconRight={require('../../assets/icons/menu-down/menu-down.png')}
            placeholder={
              availableUtilities.length
                ? availableUtilities
                : 'Nhập tiện ích mong muốn'
            }
            style={styles.input}
            editable={false}
            textInputStyle={
              availableUtilities.length ? { color: colors.black } : undefined
            }
          />
        </TouchableOpacity>
        <Button title="Tìm kiếm" onPress={onSearch} style={styles.button} />
      </LargeCard>

      <FlatList
        ref={scrollRef}
        data={!searching ? posts : filterPosts}
        renderItem={renderItem}
        ListHeaderComponent={HeaderItems}
        ItemSeparatorComponent={<Spacer h={12} />}
        contentContainerStyle={{ paddingBottom: 12 }}
        keyExtractor={(item, index) => item?.id || index}
      />

      <UtilitiesModal
        visible={modalOpened}
        data={utilities}
        onClose={closeModal}
        onPressItem={changeUtilitiesState}
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
  modalContainer: {
    backgroundColor: colors.white,
    marginHorizontal: 60,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: colors.primary,
    ...shadowGenerator(8),
    top: 306,
  },
  modalItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalItemLabel: {
    fontSize: 12,
    color: alphaHexColor(colors.black, 0.6),
    flexShrink: 1,
  },
});

export default SearchScreen;
