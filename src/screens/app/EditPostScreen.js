import PostForm from '../../layout/PostForm';

const EditPostScreen = ({ ...props }) => {
  return <PostForm {...props} title="Chỉnh sửa bài đăng" />;
};

export default EditPostScreen;
