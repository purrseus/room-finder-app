import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../assets/theme/colors';
import fonts from '../assets/theme/fonts';

const Button = ({ title, style, ...props }) => {
  return (
    <TouchableOpacity {...props} activeOpacity={1} style={[styles.container, style]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 12,
  }
})

export default Button;
