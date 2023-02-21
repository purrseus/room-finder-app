import { getDownloadURL, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { Image as RNImage, LayoutAnimation } from 'react-native';
import colors from '../assets/theme/colors';
import { firebaseStorage } from '../firebase';
import { showTopToast } from './ToastNotification';

const Image = ({ style, source, ...props }) => {
  const [image, setImage] = useState(source);

  useEffect(() => {
    if (typeof source === 'object' && 'imageStorage' in source) {
      (async () => {
        try {
          const url = await getDownloadURL(
            ref(firebaseStorage, source.imageStorage),
          );
          LayoutAnimation.easeInEaseOut();
          setImage({ uri: url });
        } catch (error) {
          showTopToast(error);
        }
      })();
    }
  }, [source]);

  return (
    <RNImage
      {...props}
      source={image}
      progressiveRenderingEnabled
      style={[{ backgroundColor: colors.white }, style]}
    />
  );
};

export default Image;
