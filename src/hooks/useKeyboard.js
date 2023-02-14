import { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';

const useKeyboard = () => {
  const [keyboardShown, setKeyboardShown] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const handleKeyboardWillShow = (event) => {
    if (Platform.OS === 'ios') setKeyboardHeight(event.endCoordinates.height);
  };

  const handleKeyboardDidShow = (event) => {
    setKeyboardShown(true);
    if (Platform.OS === 'android') setKeyboardHeight(event.endCoordinates.height);
  };

  const handleKeyboardWillHide = () => {
    if (Platform.OS === 'ios') setKeyboardHeight(0);
  };

  const handleKeyboardDidHide = () => {
    setKeyboardShown(false);
    if (Platform.OS === 'android') setKeyboardHeight(0);
  };

  useEffect(() => {
    const subscriptions = [
      Keyboard.addListener('keyboardWillShow', handleKeyboardWillShow),
      Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow),
      Keyboard.addListener('keyboardWillHide', handleKeyboardWillHide),
      Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide),
    ];

    return () => {
      subscriptions.forEach((subscription) => subscription.remove());
    };
  }, []);

  return { keyboardShown, keyboardHeight };
};

export default useKeyboard;
