import { ref, uploadBytes } from 'firebase/storage';
import { firebaseStorage } from '.';

export const uploadImage = async (userId, uri) => {
  const extensionFile = uri.split('.').reverse()[0] || 'jpg';
  const response = await fetch(uri);
  const blobFile = await response.blob();
  const path = `${userId}/${+new Date()}.${extensionFile}`;
  const reference = ref(firebaseStorage, path);
  await uploadBytes(reference, blobFile);
  return path;
}
