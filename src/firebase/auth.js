import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
} from 'firebase/auth/react-native';
import { firebaseAuth } from '.';
import { showTopToast } from '../components/ToastNotification';
import {
  checkUserExistWithEmail,
  checkUserStatusWithEmail,
  createUser,
  updateUser,
} from './cloudFirestore';
import { uploadImage } from './storage';

export const firebaseAuthStateChanged = (nextOrObserver) =>
  onAuthStateChanged(firebaseAuth, nextOrObserver);

export const firebaseSignIn = async (email, password) => {
  const userExisted = await checkUserExistWithEmail(email);
  if (!userExisted) throw 'Email này chưa được đăng ký!';
  await checkUserStatusWithEmail(email);
  await signInWithEmailAndPassword(firebaseAuth, email, password);
  showTopToast('Đăng nhập thành công!', true);
};

export const firebaseSignUp = async (name, email, password) => {
  const userExisted = await checkUserExistWithEmail(email);
  if (userExisted) throw 'Email này đã được sử dụng!\nVui lòng đăng nhập!';

  const userCredential = await createUserWithEmailAndPassword(
    firebaseAuth,
    email,
    password,
  );
  if (userCredential.user) {
    await createUser({ id: userCredential.user.uid, name, email });
    showTopToast('Đăng ký thành công!', true);
  }
};

export const firebaseSignOut = () => signOut(firebaseAuth);

export const firebaseUpdateUser = async (id, { email, address, phoneNumber, avatar }) => {
  const currentUser = getAuth().currentUser;
  if (currentUser.email !== email) {
    await updateEmail(currentUser, email);
  }

  await updateUser(id, { email, address, phoneNumber, avatar });
  showTopToast('Cập nhật thông tin thành công!', true);
};

export const updateAvatar = async (user, uri) => {
  const path = await uploadImage(user?.id, uri);
  await firebaseUpdateUser(user?.id, { ...user, avatar: path });
};
