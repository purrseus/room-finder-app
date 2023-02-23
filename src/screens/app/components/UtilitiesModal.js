import { Fragment, useMemo } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import colors from '../../../assets/theme/colors';
import { alphaHexColor, shadowGenerator, utilityTitle } from '../../../utils';

const UtilitiesModal = ({ data, visible, onClose, onPressItem }) => {
  const keys = useMemo(() => Object.keys(data), []);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.modalContainer}>
        {keys.map((title, index) => (
          <Fragment key={title}>
            {!!index && (
              <View
                style={{
                  borderTopWidth: StyleSheet.hairlineWidth,
                  borderColor: alphaHexColor(colors.primary, 0.4),
                }}
              />
            )}
            <TouchableOpacity onPress={() => onPressItem(title)(!data[title])} activeOpacity={1} style={styles.modalItem}>
              <Text style={styles.modalItemLabel}>{utilityTitle(title)}</Text>
              {!!data[title] && <Image source={require('../../../assets/icons/check/check.png')} />}
            </TouchableOpacity>
          </Fragment>
        ))}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.white,
    marginHorizontal: 60,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: colors.primary,
    ...shadowGenerator(8),
    top: 306,
  },
  modalItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalItemLabel: {
    fontSize: 12,
    color: alphaHexColor(colors.black, 0.6),
    flexShrink: 1,
  },
});

export default UtilitiesModal;
