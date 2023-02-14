import React from 'react';
import {
  Keyboard,
  StyleSheet, TouchableOpacity, useWindowDimensions,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../assets/theme/colors';

const Background = ({
  children,
  topDecorHeight = 0.3,
  canHideKeyboard = false,
  ...props
}) => {
  const { top } = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <View style={[styles.topDecor, { height: height * topDecorHeight }]} />
      <TouchableOpacity
        activeOpacity={1}
        onPress={canHideKeyboard ? Keyboard.dismiss : undefined}
        style={StyleSheet.absoluteFill}
      >
        <View style={{ height: top }} />
        <View {...props}>{children}</View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topDecor: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});

export default Background;
