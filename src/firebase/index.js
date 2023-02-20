import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import {
  createUserWithEmailAndPassword,
  getReactNativePersistence,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth/react-native';
import { showTopToast } from '../components/ToastNotification';

const firebaseConfig = {
  apiKey: 'AIzaSyA51o4EVHE1UDYTYQ7nq8KMaqCN_H5Wx_o',
  authDomain: 'room-finder-app-3672b.firebaseapp.com',
  projectId: 'room-finder-app-3672b',
  storageBucket: 'room-finder-app-3672b.appspot.com',
  messagingSenderId: '91038105266',
  appId: '1:91038105266:web:9dad1d7cc7799b047113ab',
  measurementId: 'G-0ZDVCKX2MB',
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const firebaseAuthStateChanged = (nextOrObserver) =>
  onAuthStateChanged(firebaseAuth, nextOrObserver);

export const firebaseSignIn = async (email, password) => {
  await signInWithEmailAndPassword(firebaseAuth, email, password);
  showTopToast('Đăng nhập thành công!', true);
};

export const firebaseSignUp = async (name, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    firebaseAuth,
    email,
    password,
  );
  showTopToast('Đăng ký thành công!', true);
  if (userCredential.user) {
    await updateProfile(userCredential.user, { displayName: name });
  }
};

export const firebaseSignOut = () => signOut(firebaseAuth);
