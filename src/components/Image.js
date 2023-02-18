import { Image as RNImage } from 'react-native';
import colors from '../assets/theme/colors';
import { alphaHexColor } from '../utils';

const Image = ({ style, ...props }) => {
  return (
    <RNImage {...props} style={[{ backgroundColor: alphaHexColor(colors.primary, 0.1) }, style]} />
  );
};

export default Image;
