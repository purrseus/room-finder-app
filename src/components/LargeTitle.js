import React from 'react';
import { Text } from 'react-native';
import colors from '../assets/theme/colors';
import fonts from '../assets/theme/fonts';

const LargeTitle = ({ ...props }) => {
  return (
    <Text
      style={{ fontSize: 24, fontFamily: fonts.balloBhainaExtraBold, color: colors.white, textAlign: 'center' }}
      {...props}
    />
  );
};

export default LargeTitle;
