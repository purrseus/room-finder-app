import { showOverlayLoading } from '../../components/OverlayLoading';
import { showTopToast } from '../../components/ToastNotification';
import { createPost } from '../../firebase/cloudFirestore';
import PostForm from '../../layout/PostForm';

const CreatePostScreen = ({ ...props }) => {
  const onCreate = async (value) => {
    showOverlayLoading(true);

    try {
      await createPost(value);
      showTopToast('Tạo bài đăng thành công!', true);
      props.navigation.goBack();
    } catch (error) {
      showTopToast(error);
    } finally {
      showOverlayLoading(false);
    }
  }

  return <PostForm {...props} title="Tạo bài đăng" handleButtonPress={onCreate} />;
};

export default CreatePostScreen;
