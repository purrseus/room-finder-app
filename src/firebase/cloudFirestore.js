import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { firebaseCloudFirestore } from '.';
import { UserStatus } from '../constants';

export const checkUserExistWithEmail = async (email) => {
  const users = await getDocs(
    query(
      collection(firebaseCloudFirestore, 'users'),
      where('email', '==', email),
    ),
  );
  return !!users.size;
};

export const createUser = async ({ id, name, email }) => {
  const user = await getDoc(doc(firebaseCloudFirestore, 'users', id));
  if (!user.exists()) {
    await setDoc(doc(firebaseCloudFirestore, 'users', id), {
      name,
      email: email.toLowerCase(),
      status: UserStatus.Active,
      address: null,
      phoneNumber: null,
      avatar: null,
    });
  }
};

export const updateUser = async (id, { email, address, phoneNumber, avatar }) => {
  const user = await getDoc(doc(firebaseCloudFirestore, 'users', id));
  if (user.exists()) {
    await setDoc(doc(firebaseCloudFirestore, 'users', id), {
      address,
      phoneNumber,
      avatar,
      email: email.toLowerCase(),
    }, { merge: true });
  }
};

export const checkUserStatusWithEmail = async (email) => {
  const users = await getDocs(
    query(
      collection(firebaseCloudFirestore, 'users'),
      where('email', '==', email),
    ),
  );
  const [user] = users.docs;
  if (user.data() && user.data().status === UserStatus.Inactive)
    throw 'Tài khoản này đã bị xóa!';
};

export const userSnapshot = (id, cb) => {
  return onSnapshot(doc(firebaseCloudFirestore, 'users', id), cb);
};
