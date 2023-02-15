import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../../assets/theme/colors';
import fonts from '../../assets/theme/fonts';
import Background from '../../components/Background';
import Button from '../../components/Button';
import LargeCard from '../../components/LargeCard';
import LargeTitle from '../../components/LargeTitle';
import Spacer from '../../components/Spacer';
import useAuthStore from '../../stores/useAuthStore';
import { alphaHexColor } from '../../utils';

const RegisterScreen = ({ navigation }) => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleLogin = useAuthStore((state) => state.handleLogin);

  const passwordIncorrect = true;

  const changeShowPasswordState = () => setShowPassword(!showPassword);

  const changeShowConfirmPasswordState = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const focusEmail = () => emailInputRef.current?.focus();

  const focusPassword = () => passwordInputRef.current?.focus();

  const focusConfirmPassword = () => confirmPasswordInputRef.current?.focus();

  const blurConfirmPassword = () => confirmPasswordInputRef.current?.blur();

  const goToLogin = () => navigation.navigate('Login');

  const onCreateAccount = () => handleLogin();

  return (
    <Background keyboardScrollView style={styles.container}>
      <Spacer h={64} />
      <LargeTitle>Tìm Phòng Trọ</LargeTitle>

      <Spacer h={32} />
      <LargeCard style={{ marginBottom: 18 }}>
        <Text style={styles.formTitle}>Tạo tài khoản</Text>
        <Spacer h={16} />
        <View style={{ justifyContent: 'center' }}>
          <TextInput
            mode="outlined"
            label="Full Name"
            outlineStyle={[
              styles.inputOutline,
              passwordIncorrect && { borderColor: colors.red },
            ]}
            activeOutlineColor={colors.primary}
            contentStyle={styles.contentInput}
            style={styles.input}
            returnKeyType="next"
            onSubmitEditing={focusEmail}
          />
          <Image
            source={require('../../assets/icons/valid-circle/valid-circle.png')}
            style={{ position: 'absolute', right: 20 }}
          />
        </View>

        {passwordIncorrect && (
          <Text style={styles.passwordIncorrect}>Định dạng sai!</Text>
        )}

        <View style={{ justifyContent: 'center' }}>
          <TextInput
            ref={emailInputRef}
            mode="outlined"
            label="Email Address"
            outlineStyle={[
              styles.inputOutline,
              passwordIncorrect && { borderColor: colors.red },
            ]}
            activeOutlineColor={colors.primary}
            contentStyle={styles.contentInput}
            style={styles.input}
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={focusPassword}
          />
          <Image
            source={require('../../assets/icons/valid-circle/valid-circle.png')}
            style={{ position: 'absolute', right: 20 }}
          />
        </View>

        {passwordIncorrect && (
          <Text style={styles.passwordIncorrect}>Định dạng sai!</Text>
        )}

        <TextInput
          ref={passwordInputRef}
          mode="outlined"
          label="Password"
          outlineStyle={[
            styles.inputOutline,
            passwordIncorrect && { borderColor: colors.red },
          ]}
          activeOutlineColor={colors.primary}
          contentStyle={styles.contentInput}
          style={styles.input}
          returnKeyType="next"
          textContentType="oneTimeCode"
          onSubmitEditing={focusConfirmPassword}
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
          secureTextEntry={!showPassword}
        />

        {passwordIncorrect && (
          <Text style={styles.passwordIncorrect}>Định dạng sai!</Text>
        )}

        <TextInput
          ref={confirmPasswordInputRef}
          mode="outlined"
          label="Confirm Password"
          outlineStyle={[
            styles.inputOutline,
            passwordIncorrect && { borderColor: colors.red },
          ]}
          activeOutlineColor={colors.primary}
          contentStyle={styles.contentInput}
          style={styles.input}
          onSubmitEditing={blurConfirmPassword}
          returnKeyType="done"
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
          secureTextEntry={!showConfirmPassword}
        />

        {passwordIncorrect && (
          <Text style={styles.passwordIncorrect}>Định dạng sai!</Text>
        )}

        <Button
          title="Tạo Tài Khoản"
          onPress={onCreateAccount}
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
  container: {
    flex: 1,
  },
  formTitle: {
    fontSize: 16,
    fontFamily: fonts.balloBhainaExtraBold,
    color: colors.primaryText,
    textAlign: 'center',
  },
  inputOutline: {
    borderWidth: 0.5,
    borderColor: alphaHexColor(colors.black, 0.3),
    backgroundColor: colors.white,
  },
  input: {
    fontSize: 12,
    marginBottom: 8,
    marginTop: 4,
  },
  eye: {
    transform: [{ scale: 0.8 }],
  },
  contentInput: {
    fontWeight: 'bold',
  },
  button: {
    paddingVertical: 12,
    marginVertical: 8,
  },
  bottomButton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  passwordIncorrect: {
    fontSize: 10,
    color: colors.red,
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
