/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import {useWaterStore} from '../../state/waterStore';
import {circleRadius} from '../../utils/constants';

const TOTAL_SEGMENTS = 8;
const angleSegment = 360 / 8;

import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {CircularSliceItem} from './circularSliceItem';
import {playSound} from '../../utils/voiceUtils';
import {playTTS} from '../../utils/ttsListeners';

const Water = () => {
  const {waterDrinkStamps, addWaterIntake} = useWaterStore();
  const completedSegments = waterDrinkStamps.length;
  const isPressed = useSharedValue(false);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{scale: withSpring(isPressed.value ? 1.5 : 1)}],
    };
  });

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onFinalize(() => {
      isPressed.value = false;
    });

  const handleWaterIntake = async () => {
    if (completedSegments < TOTAL_SEGMENTS) {
      const timeStamp = new Date().toISOString();
      addWaterIntake(timeStamp);
      playSound('ting');
    } else {
      playTTS('You have reached your goal for today');
    }
  };

  return (
    <GestureDetector gesture={gesture}>
      <Pressable onPress={handleWaterIntake} hitSlop={30}>
        <Animated.View style={[styles.container, animatedStyles]}>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 999999,
              padding: 4,
            }}>
            <Icon name="water" size={RFValue(24)} color="#1ca3ec" />
          </View>

          <View style={styles.segmentContainer}>
            {Array.from({length: TOTAL_SEGMENTS}).map((_, index) => {
              const currentRotationAngle = (index * 360) / TOTAL_SEGMENTS;
              const backgroundColor =
                completedSegments === TOTAL_SEGMENTS
                  ? '#00D100'
                  : index < completedSegments
                  ? '#1ca3ec'
                  : '#eee';
              return (
                <CircularSliceItem
                  key={index}
                  angleSegment={angleSegment}
                  currentRotationAngle={currentRotationAngle}
                  color={backgroundColor}
                />
              );
            })}
          </View>
        </Animated.View>
      </Pressable>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  segmentContainer: {
    position: 'absolute',
    width: circleRadius,
    height: circleRadius,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {Water};
