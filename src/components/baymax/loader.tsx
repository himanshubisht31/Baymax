import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {SCREEN_WIDTH} from '../../utils/scaling';

const Loader = () => {
  return (
    <View>
      <LottieView
        source={require('../../assets/animations/sync.json')}
        loop
        autoPlay
        style={{
          width: SCREEN_WIDTH * 0.5,
          height: 100,
        }}
      />
    </View>
  );
};

export {Loader};
