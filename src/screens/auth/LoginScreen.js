import { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
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

const LoginScreen = ({ navigation }) => {
  const passwordInputRef = useRef(null);
  const { bottom } = useSafeAreaInsets();
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = useAuthStore((state) => state.handleLogin);

  const changeShowPasswordState = () => setShowPassword(!showPassword);

  const focusPassword = () => passwordInputRef.current?.focus();

  const blurPassword = () => passwordInputRef.current?.blur();

  const goToRegister = () => navigation.navigate('Register');

  const onLogin = () => handleLogin();

  const forgotPassword = () => null;

  return (
    <Background keyboardScrollView style={styles.container}>
      <Spacer h={64} />
      <LargeTitle>Tìm Phòng Trọ</LargeTitle>

      <Spacer h={32} />
      <LargeCard style={{ marginBottom: bottom || 32 }}>
        <Text style={styles.formTitle}>Đăng nhập để tiếp tục</Text>
        <Spacer h={16} />
        <OutlinedTextInput
          label="Email Address"
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={focusPassword}
          errorMessage="Định dạng sai!"
        />

        <OutlinedTextInput
          ref={passwordInputRef}
          label="Password"
          returnKeyType="done"
          onSubmitEditing={blurPassword}
          secureTextEntry={!showPassword}
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
              onPress={changeShowPasswordState}
            />
          }
        />

        <Button title="Đăng nhập" onPress={onLogin} style={styles.button} />

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
