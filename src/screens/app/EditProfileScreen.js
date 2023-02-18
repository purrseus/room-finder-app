import { useRef } from 'react';
import { Image as RNImage, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../../assets/theme/colors';
import globalStyles from '../../assets/theme/globalStyles';
import Background from '../../components/Background';
import Button from '../../components/Button';
import KeyboardAwareScrollView from '../../components/KeyboardAwareScrollView';
import LargeCard from '../../components/LargeCard';
import OutlinedTextInput from '../../components/OutlinedTextInput';

const EditProfileScreen = ({ navigation }) => {
  const addressInputRef = useRef(null);
  const phoneNumberInputRef = useRef(null);
  const { bottom, top } = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const focusAddress = () => addressInputRef.current?.focus();

  const focusPhoneNumber = () => phoneNumberInputRef.current?.focus();

  const blurPhoneNumber = () => phoneNumberInputRef.current?.blur();

  const onSave = () => null;

  return (
    <Background topDecorHeight={0.15} style={globalStyles.flexFill}>
      <View style={styles.row}>
        <TouchableOpacity
          activeOpacity={1}
          hitSlop={12}
          onPress={navigation.goBack}
          style={styles.back}
        >
          <RNImage
            source={require('../../assets/icons/arrow-left/arrow-left.png')}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chỉnh sửa thông tin hồ sơ</Text>
        <TouchableOpacity
          activeOpacity={1}
          hitSlop={12}
          disabled
          onPress={navigation.goBack}
          style={[styles.back, { opacity: 0 }]}
        >
          <RNImage
            source={require('../../assets/icons/arrow-left/arrow-left.png')}
          />
        </TouchableOpacity>
      </View>

      <KeyboardAwareScrollView
        style={[styles.body, { marginTop: height * 0.15 - top }]}
      >
        <LargeCard style={{ marginTop: 16, marginBottom: bottom || 32 }}>
          <OutlinedTextInput
            label="Email Address"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={focusAddress}
            errorMessage="Định dạng sai!"
          />

          <OutlinedTextInput
            ref={addressInputRef}
            label="Địa chỉ"
            returnKeyType="next"
            onSubmitEditing={focusPhoneNumber}
            errorMessage="Định dạng sai!"
          />

          <OutlinedTextInput
            ref={phoneNumberInputRef}
            label="Số điện thoại"
            returnKeyType="done"
            onSubmitEditing={blurPhoneNumber}
            errorMessage="Định dạng sai!"
          />

          <Button title="Lưu thông tin" onPress={onSave} style={styles.button} />
        </LargeCard>
      </KeyboardAwareScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
  },
  back: {},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 16,
    marginHorizontal: 30,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  body: {
    flex: 1,
  },
  button: {
    paddingVertical: 12,
    marginVertical: 8,
    marginHorizontal: 34,
  },
});

export default EditProfileScreen;
