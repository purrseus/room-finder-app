import { Image as RNImage } from 'react-native';
import colors from '../assets/theme/colors';

const Image = ({ style, ...props }) => {
  return (
    <RNImage {...props} style={[{ backgroundColor: colors.imageBackground }, style]} />
  );
};

export default Image;
