import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {bigHero6Data} from '../../utils/data';
import {SCREEN_WIDTH} from '../../utils/scaling';
import {HeroItem} from './heroItem'; // Import the new component

const DataLength = bigHero6Data.length;
const containerWidth = SCREEN_WIDTH * 0.7;
const radius = containerWidth / 2;

const Bighero6: FC<{onPress: (type: string) => void}> = ({onPress}) => {
  return (
    <View style={styles.circle}>
      {bigHero6Data.map((item, index) => {
        const angle = (2 * Math.PI * index) / DataLength;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        return <HeroItem key={index} item={item} x={x} y={y} index={index} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: containerWidth,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
  },
});

export {Bighero6};
