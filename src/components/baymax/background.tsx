import React, {FC} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utils/scaling';
import Animated, {SharedValue} from 'react-native-reanimated';
import {BlurView} from '@react-native-community/blur';

const Background: FC<{blurOpacity: SharedValue<number>}> = ({blurOpacity}) => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={require('../../assets/images/baymax.png')}
        style={styles.img}
      />
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {height: '100%', opacity: blurOpacity},
        ]}>
        <BlurView
          style={[StyleSheet.absoluteFill, {height: '100%'}]}
          blurType="light"
          blurAmount={2}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 1.2,
    position: 'absolute',
    zIndex: -1,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    bottom: -SCREEN_HEIGHT * 0.2,
  },
});

export {Background};
