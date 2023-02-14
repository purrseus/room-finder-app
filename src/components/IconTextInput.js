import React from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import colors from '../assets/theme/colors';
import { alphaHexColor } from '../utils';
import Spacer from './Spacer';

const IconTextInput = ({
  iconLeft,
  iconLeftStyle,
  iconRightStyle,
  textInputStyle,
  iconRight,
  style,
  editable,
  ...props
}) => {
  return (
    <View style={[styles.container, style]}>
      {!!iconLeft && (
        <View style={styles.iconWrapper}>
          <Image source={iconLeft} style={[styles.icon, iconLeftStyle]} />
        </View>
      )}
      <Spacer w={8} />
      {editable === false ? (
        <Text style={[styles.input, { height: undefined, color: alphaHexColor(colors.black, 0.3) }, textInputStyle]}>
          {props.placeholder}
        </Text>
      ) : (
        <TextInput
          {...props}
          selectionColor={colors.primary}
          style={[styles.input, textInputStyle]}
        />
      )}
      {!!iconRight && (
        <View style={styles.iconWrapper}>
          <Image source={iconRight} style={[styles.icon, iconRightStyle]} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.input,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  iconWrapper: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {},
  input: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    margin: 0,
    fontSize: 12,
    height: 20,
    flex: 1,
  },
});

export default IconTextInput;
