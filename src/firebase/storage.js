import { ref, uploadBytes } from 'firebase/storage';
import { firebaseStorage } from '.';
import { firebaseUpdateUser } from './auth';

export const updateAvatar = async (user, uri) => {
  const extensionFile = uri.split('.').reverse()[0] || 'jpg';
  const response = await fetch(uri);
  const blobFile = await response.blob();
  const path = `${user?.id}/${+new Date()}.${extensionFile}`;
  const reference = ref(firebaseStorage, path);
  await uploadBytes(reference, blobFile);
  await firebaseUpdateUser(user?.id, { ...user, avatar: path });
};
