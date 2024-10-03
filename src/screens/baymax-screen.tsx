import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Background} from '../components/baymax/background';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import {COLORS} from '../utils/constants';
import {Loader} from '../components/baymax/loader';
import {Bighero6} from '../components/baymax/bighero6';

const Baymaxscreen = () => {
  const blurOpacity = useSharedValue(0);

  const startBlur = () => {
    blurOpacity.value = withTiming(1, {duration: 2000});
  };

  useEffect(() => {
    const timeout = setTimeout(() => startBlur(), 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
      <Bighero6 onPress={() => {}} />
      <Background blurOpacity={blurOpacity} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondry,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    position: 'absolute',
  },
});

export default Baymaxscreen;
