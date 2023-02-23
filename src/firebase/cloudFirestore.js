import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { firebaseCloudFirestore } from '.';
import { uploadImage } from './storage';

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
      address: null,
      phoneNumber: null,
      avatar: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    });
  }
};

export const updateUser = async (
  id,
  { email, address, phoneNumber, avatar },
) => {
  const user = await getDoc(doc(firebaseCloudFirestore, 'users', id));
  if (user.exists()) {
    await setDoc(
      doc(firebaseCloudFirestore, 'users', id),
      {
        address,
        phoneNumber,
        avatar,
        email: email.toLowerCase(),
        updatedAt: new Date().toISOString(),
      },
      { merge: true },
    );
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
  if (!!user.data() && !!user.data().deletedAt)
    throw 'Tài khoản này đã bị xóa!';
};

export const userSnapshot = (id, cb) => {
  return onSnapshot(doc(firebaseCloudFirestore, 'users', id), cb);
};

export const createPost = async (value) => {
  if (value?.userId && value?.photo) {
    value.photo = await uploadImage(value?.userId, value?.photo);
  }

  await setDoc(doc(firebaseCloudFirestore, 'posts', `${+new Date()}`), {
    ...value,
    ...(!!value?.roomRate && { roomRate: +value?.roomRate }),
    ...(!!value?.area && { area: +value?.area }),
    approved: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
  });
};

export const updatePost = async (postId, value) => {
  if (value?.userId && value?.photo && value.photo.startsWith('file')) {
    value.photo = await uploadImage(value?.userId, value?.photo);
  }

  await setDoc(
    doc(firebaseCloudFirestore, 'posts', postId),
    {
      ...value,
      ...(!!value?.roomRate && { roomRate: +value?.roomRate }),
      ...(!!value?.area && { area: +value?.area }),
      updatedAt: new Date().toISOString(),
    },
    { merge: true },
  );
};

export const myPostsSnapshot = (userId, cb) => {
  const q = query(
    collection(firebaseCloudFirestore, 'posts'),
    where('deletedAt', '==', null),
    where('userId', '==', userId),
    orderBy('updatedAt', 'desc'),
  );
  return onSnapshot(q, cb);
};

export const postsSnapshot = (cb) => {
  const q = query(
    collection(firebaseCloudFirestore, 'posts'),
    where('deletedAt', '==', null),
    where('approved', '==', true),
    orderBy('updatedAt', 'desc'),
  );
  return onSnapshot(q, cb);
};

export const postSnapshot = (postId, cb) => {
  return onSnapshot(doc(firebaseCloudFirestore, 'posts', postId), cb);
};

// FIXME
export const searchPostsSnapshot = (queryText, cb) => {
  const q = query(
    collection(firebaseCloudFirestore, 'posts'),
    where('deletedAt', '==', null),
    where('approved', '==', true),
    where('address', '>=', queryText),
    where('address', '<=', queryText + '\uf8ff'),
    orderBy('address'),
    orderBy('updatedAt', 'desc'),
  );
  return onSnapshot(q, cb);
};
