import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import colors from '../../assets/theme/colors';
import fonts from '../../assets/theme/fonts';
import Background from '../../components/Background';
import Button from '../../components/Button';
import LargeCard from '../../components/LargeCard';
import LargeTitle from '../../components/LargeTitle';
import Spacer from '../../components/Spacer';
import useAuthStore from '../../stores/useAuthStore';
import { alphaHexColor } from '../../utils';

const LoginScreen = ({ navigation }) => {
  const passwordInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = useAuthStore((state) => state.handleLogin);

  const changeShowPasswordState = () => setShowPassword(!showPassword);

  const focusPassword = () => passwordInputRef.current?.focus();

  const blurPassword = () => passwordInputRef.current?.blur();

  const goToRegister = () => navigation.navigate('Register');

  const forgotPassword = () => null;

  return (
    <Background
      scrollView
      scrollEnabled={false}
      contentContainerStyle={styles.container}
    >
      <Spacer h={64} />
      <LargeTitle>Tìm Phòng Trọ</LargeTitle>

      <Spacer h={32} />
      <LargeCard>
        <Text style={styles.formTitle}>Đăng nhập để tiếp tục</Text>
        <Spacer h={16} />
        <TextInput
          mode="outlined"
          label="Email Address"
          outlineStyle={styles.inputOutline}
          activeOutlineColor={colors.primary}
          contentStyle={styles.contentInput}
          style={styles.input}
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={focusPassword}
        />
        <Spacer h={4} />
        <TextInput
          ref={passwordInputRef}
          mode="outlined"
          label="Password"
          outlineStyle={styles.inputOutline}
          activeOutlineColor={colors.primary}
          contentStyle={styles.contentInput}
          style={styles.input}
          onSubmitEditing={blurPassword}
          right={
            <TextInput.Icon
              icon={require('../../assets/icons/eye/eye.png')}
              style={styles.eye}
              onPress={changeShowPasswordState}
            />
          }
          secureTextEntry={!showPassword}
        />

        <Spacer h={16} />

        <Button title="Đăng nhập" onPress={handleLogin} style={styles.button} />

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
  inputOutline: {
    borderColor: alphaHexColor(colors.black, 0.3),
    backgroundColor: colors.white,
  },
  input: {
    fontSize: 12,
    marginVertical: 8,
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
