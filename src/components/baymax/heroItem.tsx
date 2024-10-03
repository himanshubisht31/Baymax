import React, {FC, useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const HeroItem: FC<{item: string; x: number; y: number; index: number}> = ({
  item,
  x,
  y,
  index,
}) => {
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
    <Animated.View style={[styles.item, animatedStyle]}>
      <Text>{item}</Text>
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
