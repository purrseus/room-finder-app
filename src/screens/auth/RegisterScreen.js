import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as yup from 'yup';
import colors from '../../assets/theme/colors';
import fonts from '../../assets/theme/fonts';
import globalStyles from '../../assets/theme/globalStyles';
import Background from '../../components/Background';
import Button from '../../components/Button';
import LargeCard from '../../components/LargeCard';
import LargeTitle from '../../components/LargeTitle';
import OutlinedTextInput from '../../components/OutlinedTextInput';
import { showOverlayLoading } from '../../components/OverlayLoading';
import Spacer from '../../components/Spacer';
import { showTopToast } from '../../components/ToastNotification';
import {
  confirmPasswordValidator,
  emailValidator,
  nameValidator,
  passwordValidator,
} from '../../constants';
import { firebaseSignUp } from '../../firebase/auth';
import { alphaHexColor, focusInput } from '../../utils';

const RegisterScreen = ({ navigation }) => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  const { bottom } = useSafeAreaInsets();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { control, handleSubmit } = useForm(
    useMemo(
      () => ({
        resolver: yupResolver(
          yup.object().shape({
            name: nameValidator,
            email: emailValidator,
            password: passwordValidator,
            confirmPassword: confirmPasswordValidator,
          }),
        ),
      }),
      [],
    ),
  );

  const changeShowPasswordState = () => setShowPassword(!showPassword);

  const changeShowConfirmPasswordState = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const blurConfirmPassword = () => confirmPasswordInputRef.current?.blur();

  const goToLogin = () => navigation.navigate('Login');

  const onCreateAccount = async ({
    name,
    email,
    password,
    confirmPassword,
  }) => {
    if (!name || !email || !password || password !== confirmPassword) return;

    showOverlayLoading(true);
    try {
      await firebaseSignUp(name, email.toLowerCase(), password);
    } catch (error) {
      showTopToast(error);
    } finally {
      showOverlayLoading(false);
    }
  };

  return (
    <Background keyboardScrollView style={globalStyles.flexFill}>
      <Spacer h={64} />
      <LargeTitle>Tìm Phòng Trọ</LargeTitle>

      <Spacer h={32} />
      <LargeCard style={{ marginBottom: bottom || 32 }}>
        <Text style={styles.formTitle}>Tạo tài khoản</Text>
        <Spacer h={16} />
        <Controller
          control={control}
          name="name"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <OutlinedTextInput
              {...{ onChangeText: onChange, onBlur, value }}
              label="Full Name"
              returnKeyType="next"
              onSubmitEditing={focusInput(emailInputRef)}
              errorMessage={error?.message}
              CustomView={
                !error?.message && !!value?.length ? (
                  <Image
                    source={require('../../assets/icons/valid-circle/valid-circle.png')}
                    style={{ position: 'absolute', right: 20 }}
                  />
                ) : null
              }
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <OutlinedTextInput
              {...{ onChangeText: onChange, onBlur, value }}
              ref={emailInputRef}
              label="Email Address"
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={focusInput(passwordInputRef)}
              errorMessage={error?.message}
              CustomView={
                !error?.message && !!value?.length ? (
                  <Image
                    source={require('../../assets/icons/valid-circle/valid-circle.png')}
                    style={{ position: 'absolute', right: 20 }}
                  />
                ) : null
              }
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <OutlinedTextInput
              {...{ onChangeText: onChange, onBlur, value }}
              errorMessage={error?.message}
              ref={passwordInputRef}
              label="Password"
              returnKeyType="next"
              textContentType="oneTimeCode"
              maxLength={16}
              onSubmitEditing={focusInput(confirmPasswordInputRef)}
              secureTextEntry={!showPassword}
              right={
                <TextInput.Icon
                  icon={
                    showPassword
                      ? require('../../assets/icons/eye/eye.png')
                      : require('../../assets/icons/eye-hidden/eye-hidden.png')
                  }
                  forceTextInputFocus={false}
                  style={styles.eye}
                  onPress={changeShowPasswordState}
                />
              }
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <OutlinedTextInput
              {...{ onChangeText: onChange, onBlur, value }}
              errorMessage={error?.message}
              ref={confirmPasswordInputRef}
              label="Confirm Password"
              maxLength={16}
              onSubmitEditing={blurConfirmPassword}
              returnKeyType="done"
              secureTextEntry={!showConfirmPassword}
              right={
                <TextInput.Icon
                  icon={
                    showPassword
                      ? require('../../assets/icons/eye/eye.png')
                      : require('../../assets/icons/eye-hidden/eye-hidden.png')
                  }
                  forceTextInputFocus={false}
                  style={styles.eye}
                  onPress={changeShowConfirmPasswordState}
                />
              }
            />
          )}
        />

        <Button
          title="Tạo Tài Khoản"
          onPress={handleSubmit(onCreateAccount)}
          style={styles.button}
        />
      </LargeCard>
      <View style={styles.bottomButton}>
        <Text style={[styles.bottomButtonText, styles.newMemberText]}>
          Have an account?{' '}
        </Text>
        <Text
          onPress={goToLogin}
          style={[styles.bottomButtonText, styles.signUpText]}
        >
          Sign in here
        </Text>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  formTitle: {
    fontSize: 16,
    fontFamily: fonts.balloBhainaExtraBold,
    color: colors.primaryText,
    textAlign: 'center',
  },
  eye: {
    transform: [{ scale: 0.8 }],
  },
  button: {
    paddingVertical: 12,
    marginVertical: 8,
  },
  bottomButton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomButtonText: {
    fontSize: 12,
  },
  newMemberText: {
    color: colors.black,
  },
  signUpText: {
    color: colors.primary,
  },
  forgotPassText: {
    color: alphaHexColor(colors.black, 0.5),
  },
  validFieldIcon: {
    tintColor: undefined,
  },
});

export default RegisterScreen;
