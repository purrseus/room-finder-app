import { useRef, useState } from 'react';
import {
  Image,
  Image as RNImage,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../assets/theme/colors';
import globalStyles from '../assets/theme/globalStyles';
import Background from '../components/Background';
import Button from '../components/Button';
import KeyboardAwareScrollView from '../components/KeyboardAwareScrollView';
import LargeCard from '../components/LargeCard';
import OutlinedTextInput from '../components/OutlinedTextInput';
import Spacer from '../components/Spacer';
import { alphaHexColor } from '../utils';

const RadioButton = ({ label, isChecked, setIsChecked }) => {
  return (
    <View style={styles.checkboxContainer}>
      <TouchableOpacity
        hitSlop={4}
        activeOpacity={1}
        onPress={!isChecked ? () => setIsChecked((prev) => !prev) : undefined}
        style={styles.radioButton}
      >
        <View
          style={[
            styles.innerRadioButton,
            !isChecked && { backgroundColor: 'transparent' },
          ]}
        />
      </TouchableOpacity>

      <Text style={styles.checkboxLabel}>{label}</Text>
    </View>
  );
};

const Checkbox = ({ label, isChecked, setIsChecked }) => {
  return (
    <View style={styles.checkboxContainer}>
      <TouchableOpacity
        hitSlop={4}
        activeOpacity={1}
        onPress={() => setIsChecked((prev) => !prev)}
        style={styles.checkboxButton}
      >
        <Image
          source={require('../assets/icons/check/check.png')}
          style={[styles.checkIcon, !isChecked && { opacity: 0 }]}
        />
      </TouchableOpacity>

      <Text style={styles.checkboxLabel}>{label}</Text>
    </View>
  );
};

const Field = ({ children, label = '', style }) => {
  return (
    <View style={[styles.fieldContainer, style]}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {children}
    </View>
  );
};

const PostForm = ({ navigation, title, handleButtonPress }) => {
  const { height } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();

  const [hasWaterHeater, setHasWaterHeater] = useState(false);
  const [hasAirCondition, setHasAirCondition] = useState(false);
  const [hasWifi, setHasWifi] = useState(false);
  const [hasParking, setHasParking] = useState(false);
  const [hasFridge, setHasFridge] = useState(false);
  const [hasTV, setHasTV] = useState(false);

  const [isRoomAvailable, setIsRoomAvailable] = useState(true);

  const priceRef = useRef(null);
  const acreageRef = useRef(null);
  const addressRef = useRef(null);
  const descriptionRef = useRef(null);

  const focusPrice = () => priceRef.current?.focus();

  const focusAcreage = () => acreageRef.current?.focus();

  const focusAddress = () => addressRef.current?.focus();

  const focusDescription = () => descriptionRef.current?.focus();

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
            source={require('../assets/icons/arrow-left/arrow-left.png')}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity
          activeOpacity={1}
          hitSlop={12}
          disabled
          onPress={navigation.goBack}
          style={[styles.back, { opacity: 0 }]}
        >
          <RNImage
            source={require('../assets/icons/arrow-left/arrow-left.png')}
          />
        </TouchableOpacity>
      </View>

      <KeyboardAwareScrollView
        style={[styles.body, { marginTop: height * 0.15 - top }]}
      >
        <LargeCard style={{ marginTop: 16, marginBottom: bottom || 32 }}>
          <OutlinedTextInput
            label="Tiêu đề"
            returnKeyType="next"
            onSubmitEditing={focusPrice}
            errorMessage="Định dạng sai!"
          />

          <OutlinedTextInput
            ref={priceRef}
            label="Giá phòng/tháng"
            returnKeyType="next"
            keyboardType="number-pad"
            onSubmitEditing={focusAcreage}
            errorMessage="Định dạng sai!"
          />

          <OutlinedTextInput
            ref={acreageRef}
            label="Diện tích (m2)"
            returnKeyType="next"
            keyboardType="number-pad"
            onSubmitEditing={focusAddress}
            errorMessage="Định dạng sai!"
          />

          <OutlinedTextInput
            ref={addressRef}
            label="Địa chỉ"
            returnKeyType="next"
            textContentType="fullStreetAddress"
            onSubmitEditing={focusDescription}
            errorMessage="Định dạng sai!"
          />

          <OutlinedTextInput
            ref={descriptionRef}
            label="Mô tả"
            returnKeyType="next"
            multiline
            onSubmitEditing={focusDescription}
            errorMessage="Định dạng sai!"
          />

          <Field label="Tiện ích" style={styles.utilitiesField}>
            <Checkbox
              isChecked={hasWaterHeater}
              setIsChecked={setHasWaterHeater}
              label="Nóng lạnh"
            />
            <Checkbox
              isChecked={hasAirCondition}
              setIsChecked={setHasAirCondition}
              label="Điều hoà"
            />
            <Checkbox
              isChecked={hasWifi}
              setIsChecked={setHasWifi}
              label="Wifi"
            />
            <Checkbox
              isChecked={hasParking}
              setIsChecked={setHasParking}
              label="Chỗ để xe"
            />
            <Checkbox
              isChecked={hasFridge}
              setIsChecked={setHasFridge}
              label="Tủ lạnh"
            />
            <Checkbox isChecked={hasTV} setIsChecked={setHasTV} label="Tivi" />
          </Field>

          <Field label="Hình ảnh">
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => null}
              style={styles.photoLabel}
            >
              <Image source={require('../assets/icons/photo/photo.png')} />
              <Text style={styles.photoDescription}>
                Nhấn vào để tải lên hình ảnh
              </Text>
            </TouchableOpacity>
          </Field>

          <View style={styles.radioContainer}>
            <RadioButton
              label="Còn phòng"
              isChecked={isRoomAvailable}
              setIsChecked={setIsRoomAvailable}
            />
            <RadioButton
              label="Hết phòng "
              isChecked={!isRoomAvailable}
              setIsChecked={setIsRoomAvailable}
            />
          </View>

          <Spacer h={24} />

          <Button
            title="Đăng Bài"
            onPress={handleButtonPress}
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
  contentInput: {},
  passwordIncorrect: {
    fontSize: 10,
    color: colors.red,
  },
  fieldContainer: {
    borderWidth: 0.5,
    borderColor: alphaHexColor(colors.black, 0.3),
    marginBottom: 8,
    marginTop: 8,
    borderRadius: 4,
  },
  fieldLabel: {
    color: colors.primary,
    fontSize: 12,
    padding: 4,
    backgroundColor: colors.white,
    alignSelf: 'flex-start',
    position: 'absolute',
    left: 8,
    top: -12,
  },
  utilitiesField: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkboxContainer: {
    flexDirection: 'row',
    width: '40%',
    alignItems: 'center',
    marginVertical: 4,
  },
  checkboxButton: {
    padding: 4,
    backgroundColor: alphaHexColor(colors.primaryText, 0.2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    tintColor: colors.primary,
  },
  checkboxLabel: {
    fontSize: 10,
    borderColor: colors.primaryText,
    marginLeft: 4,
  },
  photoLabel: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  photoDescription: {
    fontSize: 12,
    color: alphaHexColor(colors.primaryText, 0.6),
    marginTop: 8,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    padding: 4,
    borderRadius: 99,
    backgroundColor: alphaHexColor(colors.primaryText, 0.2),
  },
  innerRadioButton: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  button: {
    paddingVertical: 12,
    marginHorizontal: 34,
  },
});

export default PostForm;
