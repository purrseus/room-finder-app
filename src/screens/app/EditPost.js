import PostForm from '../../layout/PostForm';

const EditPost = ({ ...props }) => {
  return <PostForm {...props} title="Chỉnh sửa bài đăng" />;
};

export default EditPost;
