import { showOverlayLoading } from '../../components/OverlayLoading';
import { showTopToast } from '../../components/ToastNotification';
import { updatePost } from '../../firebase/cloudFirestore';
import PostForm from '../../layout/PostForm';

const EditPostScreen = ({ ...props }) => {
  const onEdit = async (value) => {
    const id = props?.route?.params?.defaultValues?.id;
    if (!id) return;

    showOverlayLoading(true);

    try {
      await updatePost(id, value);
      showTopToast('Chỉnh sửa bài đăng thành công!', true);
      props.navigation.goBack();
    } catch (error) {
      showTopToast(error);
    } finally {
      showOverlayLoading(false);
    }
  };

  return (
    <PostForm
      {...props}
      defaultValues={props?.route?.params?.defaultValues}
      title="Chỉnh sửa bài đăng"
      handleButtonPress={onEdit}
    />
  );
};

export default EditPostScreen;
