import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../../assets/theme/colors';
import Background from '../../components/Background';
import IconTextInput from '../../components/IconTextInput';
import LargeCard from '../../components/LargeCard';
import LargeTitle from '../../components/LargeTitle';
import Spacer from '../../components/Spacer';

const SearchScreen = () => {
  const openBottomSheet = () => console.log('open bottom sheet');

  return (
    <Background>
      <LargeTitle style={styles.headerTitle}>Tìm Phòng Trọ</LargeTitle>
      <Spacer h={34} />
      <LargeCard style={{ marginHorizontal: 16 }}>
        <Text style={styles.cardTitle}>Tìm phòng trọ theo địa chỉ</Text>
        <IconTextInput
          iconLeft={require('../../assets/icons/map-marker/map-marker.png')}
          placeholder="Nhập địa chỉ, thành phố hoặc khu vực"
          style={styles.input}
        />
        <IconTextInput
          iconLeft={require('../../assets/icons/cash/cash.png')}
          iconLeftStyle={{ width: 8, height: 12 }}
          placeholder="Nhập phạm vi giá"
          style={styles.input}
        />
        <TouchableOpacity activeOpacity={0.5} onPress={openBottomSheet}>
          <IconTextInput
            iconLeft={require('../../assets/icons/menu/menu.png')}
            iconRight={require('../../assets/icons/menu-down/menu-down.png')}
            placeholder="Nhập tiện ích mong muốn"
            style={styles.input}
            editable={false}
          />
        </TouchableOpacity>
      </LargeCard>
    </Background>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    marginTop: 18,
  },
  cardTitle: {
    fontWeight: 'bold',
    color: colors.primaryText,
    marginBottom: 16,
  },
  input: {
    marginVertical: 4,
  },
});

export default SearchScreen;
