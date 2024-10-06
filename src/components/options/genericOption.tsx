import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {circleRadius} from '../../utils/constants';

const GenericOption: FC<{item: any; onPress: (type: string) => void}> = ({
  item,
  onPress,
}) => {
  let iconName;
  let iconColor = '#fff';

  switch (item) {
    case 'meditation':
      iconName = 'meditation';
      iconColor = '#2DEC72';
      break;
    case 'pedometer':
      iconName = 'walk';
      iconColor = '#2D7BA4';
      break;
    case 'health':
      iconName = 'hospital-box';
      iconColor = 'green';
      break;
    case 'happiness':
      iconName = 'emoticon-happy';
      iconColor = '#FF5733';
      break;
    default:
      iconName = 'fire';
      iconColor = '#FFBC66';
      break;
  }
  return (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.container}>
      <Icon name={iconName} size={RFValue(32)} color={iconColor} />
    </TouchableOpacity>
  );
};

export {GenericOption};

const styles = StyleSheet.create({
  container: {
    height: circleRadius,
    width: circleRadius,
    borderRadius: circleRadius,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    shadowOffset: {width: 1, height: 1},
    elevation: 10,
    shadowRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
  },
});
