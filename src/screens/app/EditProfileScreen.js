import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Image as RNImage,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as yup from 'yup';
import colors from '../../assets/theme/colors';
import globalStyles from '../../assets/theme/globalStyles';
import Background from '../../components/Background';
import Button from '../../components/Button';
import KeyboardAwareScrollView from '../../components/KeyboardAwareScrollView';
import LargeCard from '../../components/LargeCard';
import OutlinedTextInput from '../../components/OutlinedTextInput';
import {
  addressValidator,
  emailValidator,
  phoneNumberValidator,
} from '../../constants';
import { focusInput } from '../../utils';
import useFirebaseAuthState from '../../hooks/useFirebaseAuthState';
import { firebaseUpdateUser } from '../../firebase/auth';
import { showTopToast } from '../../components/ToastNotification';
import { showOverlayLoading } from '../../components/OverlayLoading';

const EditProfileScreen = ({ navigation }) => {
  const addressInputRef = useRef(null);
  const phoneNumberInputRef = useRef(null);
  const { bottom, top } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const user = useFirebaseAuthState();

  const { control, handleSubmit } = useForm(
    useMemo(
      () => ({
        values: {
          email: user?.email ?? '',
          address: user?.address ?? '',
          phoneNumber: user?.phoneNumber ?? '',
        },
        resolver: yupResolver(
          yup.object().shape({
            email: emailValidator,
            address: addressValidator,
            phoneNumber: phoneNumberValidator,
          }),
        ),
      }),
      [user],
    ),
  );

  const blurPhoneNumber = () => phoneNumberInputRef.current?.blur();

  const onSave = async ({ email, address, phoneNumber }) => {
    showOverlayLoading(true);

    try {
      await firebaseUpdateUser(user?.id, {
        ...user,
        email: email.toLowerCase(),
        address,
        phoneNumber,
      });
      navigation.goBack();
    } catch (error) {
      showTopToast(error);
    } finally {
      showOverlayLoading(false);
    }
  };

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
          <Controller
            control={control}
            name="email"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <OutlinedTextInput
                {...{ onChangeText: onChange, onBlur, value }}
                errorMessage={error?.message}
                label="Email Address"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={focusInput(addressInputRef)}
                editable={false}
              />
            )}
          />

          <Controller
            control={control}
            name="address"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <OutlinedTextInput
                {...{ onChangeText: onChange, onBlur, value }}
                errorMessage={error?.message}
                ref={addressInputRef}
                label="Địa chỉ"
                returnKeyType="next"
                onSubmitEditing={focusInput(phoneNumberInputRef)}
              />
            )}
          />

          <Controller
            control={control}
            name="phoneNumber"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <OutlinedTextInput
                {...{ onChangeText: onChange, onBlur, value }}
                errorMessage={error?.message}
                ref={phoneNumberInputRef}
                label="Số điện thoại"
                keyboardType="number-pad"
                returnKeyType="done"
                onSubmitEditing={blurPhoneNumber}
              />
            )}
          />

          <Button
            title="Lưu thông tin"
            onPress={handleSubmit(onSave)}
            style={styles.button}
          />
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
