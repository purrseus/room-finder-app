import { useRef, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../../assets/theme/colors';
import fonts from '../../assets/theme/fonts';
import Background from '../../components/Background';
import Button from '../../components/Button';
import LargeCard from '../../components/LargeCard';
import LargeTitle from '../../components/LargeTitle';
import OutlinedTextInput from '../../components/OutlinedTextInput';
import Spacer from '../../components/Spacer';
import useAuthStore from '../../stores/useAuthStore';
import { alphaHexColor } from '../../utils';

const RegisterScreen = ({ navigation }) => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  const { bottom } = useSafeAreaInsets();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleLogin = useAuthStore((state) => state.handleLogin);

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
      <LargeCard style={{ marginBottom: bottom || 32 }}>
        <Text style={styles.formTitle}>Tạo tài khoản</Text>
        <Spacer h={16} />
        <OutlinedTextInput
          label="Full Name"
          returnKeyType="next"
          onSubmitEditing={focusEmail}
          errorMessage="Định dạng sai!"
          CustomView={
            <Image
              source={require('../../assets/icons/valid-circle/valid-circle.png')}
              style={{ position: 'absolute', right: 20 }}
            />
          }
        />

        <OutlinedTextInput
          ref={emailInputRef}
          label="Email Address"
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={focusPassword}
          errorMessage="Định dạng sai!"
          CustomView={
            <Image
              source={require('../../assets/icons/valid-circle/valid-circle.png')}
              style={{ position: 'absolute', right: 20 }}
            />
          }
        />

        <OutlinedTextInput
          ref={passwordInputRef}
          label="Password"
          returnKeyType="next"
          textContentType="oneTimeCode"
          onSubmitEditing={focusConfirmPassword}
          errorMessage="Định dạng sai!"
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

        <OutlinedTextInput
          ref={confirmPasswordInputRef}
          label="Confirm Password"
          onSubmitEditing={blurConfirmPassword}
          returnKeyType="done"
          secureTextEntry={!showConfirmPassword}
          errorMessage="Định dạng sai!"
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
