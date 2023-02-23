import { useScrollToTop } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../../assets/theme/colors';
import globalStyles from '../../assets/theme/globalStyles';
import Background from '../../components/Background';
import { myPostsSnapshot } from '../../firebase/cloudFirestore';
import useFirebaseAuthState from '../../hooks/useFirebaseAuthState';
import { alphaHexColor, shadowGenerator } from '../../utils';
import PostManagementItem from './components/PostManagementItem';

const PostManagementScreen = ({ navigation }) => {
  const { height } = useWindowDimensions();
  const { top } = useSafeAreaInsets();
  const user = useFirebaseAuthState();
  const [posts, setPosts] = useState([]);

  const scrollRef = useRef(null);

  useScrollToTop(scrollRef);

  useEffect(() => {
    let unsubscribe;
    if (user?.id) {
      unsubscribe = myPostsSnapshot(user.id, (documentSnapshot) => {
        const tempPosts = [];
        documentSnapshot.forEach((doc) => {
          tempPosts.push({ ...doc.data(), id: doc.id });
        });
        setPosts(tempPosts);
      });
    }

    return () => unsubscribe?.();
  }, [user]);

  const onCreatePost = () => navigation.navigate('CreatePost');

  const renderItem = useCallback(({ item }) => {
    return <PostManagementItem item={item} />;
  }, []);

  return (
    <Background topDecorHeight={0.15} style={globalStyles.flexFill}>
      <Text style={styles.headerTitle}>Quản Lý Bài Đăng</Text>

      <View style={[styles.body, { marginTop: height * 0.15 - top }]}>
        <View style={styles.row}>
          <View style={styles.totalPostWrapper}>
            <Text style={styles.totalPostText}>Bài đăng ({posts.length})</Text>
          </View>

          <TouchableOpacity
            onPress={onCreatePost}
            activeOpacity={1}
            style={styles.createPostButton}
          >
            <Image source={require('../../assets/icons/edit/edit.png')} />
          </TouchableOpacity>
        </View>

        <FlatList ref={scrollRef} data={posts} renderItem={renderItem} keyExtractor={(item, index) => item?.id || index} />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    top: 20,
    left: 0,
    right: 0,
    position: 'absolute',
  },
  body: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 30,
    paddingVertical: 12,
  },
  totalPostWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: alphaHexColor(colors.primary, 0.1),
    borderRadius: 8,
  },
  totalPostText: {
    fontSize: 12,
    color: colors.primary,
  },
  createPostButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadowGenerator(8, alphaHexColor(colors.black, 0.5)),
  },
});

export default PostManagementScreen;
