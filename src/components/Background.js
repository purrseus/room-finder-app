import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../assets/theme/colors';

const Background = ({ children, topDecorHeight = '30%', ...props }) => {
  const { top } = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.topDecor, { height: topDecorHeight }]} />
      <View style={StyleSheet.absoluteFill}>
        <View style={{ height: top }} />
        <View {...props}>{children}</View>
      </View>
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
