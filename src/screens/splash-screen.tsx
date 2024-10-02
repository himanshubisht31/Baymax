import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {navigate} from '../utils/navigation-utils';
import {COLORS, FONTS, LIGHT_COLORS} from '../utils/constants';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../utils/scaling';
import Animated from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../components/global/customText';

const bottomColors = [...LIGHT_COLORS].reverse();

const Splashscreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View style={styles.container}>
        <Animated.View style={styles.imageContainer}>
          <Image
            style={styles.img}
            source={require('../assets/images/launch.png')}
          />
        </Animated.View>

        <Animated.View style={styles.gradientContainer}>
          <LinearGradient colors={bottomColors} style={styles.gradient}>
            <CustomText fontFamily={FONTS.Theme} fontSize={34}>
              BAYMAX!
            </CustomText>
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
});

export default Splashscreen;
