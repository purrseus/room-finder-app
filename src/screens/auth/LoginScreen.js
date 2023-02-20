import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
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
import Spacer from '../../components/Spacer';
import { showTopToast } from '../../components/ToastNotification';
import { emailValidator, passwordValidator } from '../../constants';
import { firebaseSignIn } from '../../firebase';
import { alphaHexColor, focusInput } from '../../utils';

const LoginScreen = ({ navigation }) => {
  const passwordInputRef = useRef(null);
  const { bottom } = useSafeAreaInsets();
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit } = useForm(
    useMemo(
      () => ({
        resolver: yupResolver(
          yup.object().shape({
            email: emailValidator,
            password: passwordValidator,
          }),
        ),
      }),
      [],
    ),
  );

  const changeShowPasswordState = () => setShowPassword(!showPassword);

  const blurPassword = () => passwordInputRef.current?.blur();

  const goToRegister = () => navigation.navigate('Register');

  const onLogin = async ({ email, password }) => {
    if (!email || !password) return;

    try {
      await firebaseSignIn(email, password);
    } catch (error) {
      showTopToast(error);
    }
  };

  const forgotPassword = () => null;

  return (
    <Background keyboardScrollView style={globalStyles.flexFill}>
      <Spacer h={64} />
      <LargeTitle>Tìm Phòng Trọ</LargeTitle>

      <Spacer h={32} />
      <LargeCard style={{ marginBottom: bottom || 32 }}>
        <Text style={styles.formTitle}>Đăng nhập để tiếp tục</Text>
        <Spacer h={16} />
        <Controller
          control={control}
          name="email"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <OutlinedTextInput
              {...{ onChangeText: onChange, onBlur, value }}
              label="Email Address"
              keyboardType="email-address"
              returnKeyType="next"
              maxLength={255}
              onSubmitEditing={focusInput(passwordInputRef)}
              errorMessage={error?.message}
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
              ref={passwordInputRef}
              label="Password"
              returnKeyType="done"
              maxLength={16}
              onSubmitEditing={blurPassword}
              secureTextEntry={!showPassword}
              errorMessage={error?.message}
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

        <Button
          title="Đăng nhập"
          onPress={handleSubmit(onLogin)}
          style={styles.button}
        />

        <View style={styles.bottomButton}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.bottomButtonText, styles.newMemberText]}>
              New member?{' '}
            </Text>
            <Text
              onPress={goToRegister}
              style={[styles.bottomButtonText, styles.signUpText]}
            >
              Sign up here
            </Text>
          </View>
          <Text
            onPress={forgotPassword}
            style={[styles.bottomButtonText, styles.forgotPassText]}
          >
            Quên mật khẩu
          </Text>
        </View>
      </LargeCard>
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
    justifyContent: 'space-between',
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
});

export default LoginScreen;
