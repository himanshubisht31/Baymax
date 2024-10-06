import React, {FC, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {GenericOption} from '../options/genericOption';
import {Water} from '../options/water';

const HeroItem: FC<{
  item: string;
  x: number;
  y: number;
  index: number;
  onPress: (type: string) => void;
}> = ({item, x, y, index, onPress}) => {
  const animationProgress = useSharedValue(0);

  useEffect(() => {
    animationProgress.value = withDelay(
      index * 500,
      withTiming(1, {duration: 500}),
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: animationProgress.value * x,
        },
        {
          translateY: animationProgress.value * y,
        },
      ],
    };
  });

  return (
    <Animated.View key={index} style={[styles.item, animatedStyle]}>
      {item === 'water' ? (
        <Water />
      ) : (
        <GenericOption item={item} onPress={onPress} />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  item: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {HeroItem};
