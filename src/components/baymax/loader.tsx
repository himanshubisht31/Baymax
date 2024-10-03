import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const Loader = () => {
  return (
    <View>
      <LottieView
        source={require('../../assets/animations/sync.json')}
        loop
        autoPlay
        style={{
          width: 280,
          height: 100,
        }}
      />
    </View>
  );
};

export {Loader};
