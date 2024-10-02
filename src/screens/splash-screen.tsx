/* eslint-disable react-native/no-inline-styles */
import LottieView from 'lottie-react-native';
import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomText from '../components/global/customText';
import {COLORS, FONTS, LIGHT_COLORS} from '../utils/constants';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../utils/scaling';
import {initializeTstListeners} from '../utils/ttsListeners';
import Tts from 'react-native-tts';
import {resetAndNavigate} from '../utils/navigation-utils';

const bottomColors = [...LIGHT_COLORS].reverse();

const Splashscreen = () => {
  const baymaxAnimation = useSharedValue(SCREEN_HEIGHT * 0.9);
  const messageContainerAnimation = useSharedValue(SCREEN_HEIGHT * 0.9);

  useEffect(() => {
    const launchAnimation = async () => {
      messageContainerAnimation.value = SCREEN_HEIGHT * 0.001;
      setTimeout(() => {
        baymaxAnimation.value = -SCREEN_HEIGHT * 0.002;
        // Tts.speak('HELLO WORLD! I AM Baymax');
      }, 1000);
    };

    setTimeout(() => {
      resetAndNavigate('Baymaxscreen');
    }, 4000);
    initializeTstListeners();
    launchAnimation();
  }, []);
  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(baymaxAnimation.value, {
            duration: 1500,
          }),
        },
      ],
    };
  });
  const animatedMessageContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(messageContainerAnimation.value, {
            duration: 1200,
          }),
        },
      ],
    };
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View style={styles.container}>
        <Animated.View style={[styles.imageContainer, animatedImageStyle]}>
          <Image
            style={styles.img}
            source={require('../assets/images/launch.png')}
          />
        </Animated.View>

        <Animated.View
          style={[styles.gradientContainer, animatedMessageContainerStyle]}>
          <LinearGradient colors={bottomColors} style={styles.gradient}>
            <View style={styles.textContainer}>
              <CustomText fontFamily={FONTS.Theme} fontSize={34}>
                BAYMAX!
              </CustomText>
              <LottieView
                source={require('../assets/animations/sync.json')}
                autoPlay
                loop
                style={{
                  width: 280,
                  height: 100,
                }}
              />
              <CustomText variant="h3">
                Synchronizing best configuration for you...
              </CustomText>
            </View>
          </LinearGradient>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imageContainer: {
    width: SCREEN_WIDTH - 20,
    height: SCREEN_HEIGHT * 0.5,
  },
  gradient: {
    width: '100%',
    height: '100%',
    paddingTop: 30,
  },
  gradientContainer: {
    position: 'absolute',
    height: '35%',
    bottom: 0,
    width: '100%',
  },
  textContainer: {
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 20,
    padding: 20,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    alignItems: 'center',
    shadowColor: COLORS.border,
  },
});

export default Splashscreen;
