import React, {FC, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {usePedometerStore} from '../../state/pedometerStore';
import StepCounter, {
  parseStepData,
  startStepCounterUpdate,
  stopStepCounterUpdate,
} from '@dongminyu/react-native-step-counter';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import {Image} from 'react-native';
import {playTTS} from '../../utils/ttsListeners';
import CircularProgress from 'react-native-circular-progress-indicator';
import {SCREEN_WIDTH} from '../../utils/scaling';
import {FONTS} from '../../utils/constants';
import CustomText from '../global/customText';

const Pedometer: FC<{
  message: string;
  onCross: () => void;
}> = ({message, onCross}) => {
  const {stepCount, dailyGoal, addSteps} = usePedometerStore();
  StepCounter.addListener('StepCounter.stepsSensorInfo');
  const startStepCounter = () => {
    startStepCounterUpdate(new Date(), data => {
      const parsedData = parseStepData(data);
      addSteps(parsedData.steps, parsedData.distance);
    });
  };

  const stopStepCounter = () => {
    stopStepCounterUpdate();
  };

  useEffect(() => {
    if (stepCount >= dailyGoal) {
      playTTS(
        "You've met your daily goal. No need to start the counter again today",
      );
    } else {
      startStepCounter();
    }

    return stopStepCounter;
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        hitSlop={50}
        style={styles.cross}
        onPress={() => {
          Alert.alert('Your step counter stopped!!');
          stopStepCounter();
          onCross();
        }}>
        <Icon name="close-circle" size={RFValue(20)} color="red" />
      </TouchableOpacity>
      <Image
        source={require('../../assets/images/logo_short.png')}
        style={styles.logo}
      />
      <View style={styles.indicator}>
        <CircularProgress
          value={stepCount}
          maxValue={dailyGoal}
          valueSuffix={`1/${dailyGoal}`}
          progressValueFontSize={22}
          radius={SCREEN_WIDTH / 4}
          activeStrokeColor="#cdd27e"
          inActiveStrokeColor="#4c6394"
          inActiveStrokeOpacity={0.5}
          inActiveStrokeWidth={20}
          activeStrokeWidth={20}
          title="Step Count"
          titleColor="#555"
          titleFontSize={22}
          titleStyle={{fontFamily: FONTS.SemiBold}}
        />
        <CustomText fontFamily={FONTS.SemiBold} style={styles.text}>
          Start Walking, counter will update automatically.
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 20,
    textAlign: 'center',
  },
  container: {
    paddingVertical: 10,
    width: '90%',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#000',
    shadowOpacity: 0.08,
    elevation: 10,
    shadowRadius: 16,
    borderRadius: 10,
  },
  logo: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginVertical: 10,
  },
  cross: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  indicator: {
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {Pedometer};
