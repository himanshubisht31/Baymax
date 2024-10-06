import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Background} from '../components/baymax/background';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import {COLORS} from '../utils/constants';
import {Loader} from '../components/baymax/loader';
import {Bighero6} from '../components/baymax/bighero6';
import {playTTS} from '../utils/ttsListeners';
import SoundPlayer from 'react-native-sound-player';
import {playSound} from '../utils/VoiceUtils';
import {prompt} from '../utils/data';
import {Pedometer} from '../components/pedometer';
import {Instructions} from '../components/baymax/instructions';

const Baymaxscreen = () => {
  const [showInstructions, setShowInstructions] = React.useState(false);
  const [showLoader, setShowLoader] = React.useState(true);
  const [message, setMessage] = React.useState('');
  const [showPedometer, setShowPedometer] = React.useState(false);
  const blurOpacity = useSharedValue(0);

  const startBlur = () => {
    blurOpacity.value = withTiming(1, {duration: 2000});
  };
  const stopBlur = () => {
    blurOpacity.value = withTiming(0, {duration: 2000});
  };

  useEffect(() => {
    const timeout = setTimeout(() => startBlur(), 500);
    return () => clearTimeout(timeout);
  }, []);

  const handleError = (err: string) => {
    playTTS('There was an error, please try again');
    startBlur();
    setMessage('');
    setShowLoader(true);
    SoundPlayer.stop();
    setShowInstructions(false);
    console.log(err);
  };

  const handleResponse = async (
    type: string,
    promptText: string,
    sound: string,
  ) => {
    try {
      if (type === 'meditation') {
        playTTS('Focus on your breath');
        playSound(sound);
        setMessage('meditation');
        return;
      }

      if (type === 'happiness') {
        setTimeout(() => {
          playSound(sound);
        }, 5000);
      } else {
        playSound(sound);
      }
      setMessage(type);

      stopBlur();
      setShowLoader(true);
    } catch (error: any) {
      handleError(error);
    } finally {
      setShowLoader(false);
    }
  };

  const onOptionPressHandler = (type: string) => {
    setShowInstructions(true);
    if (type === 'pedometer') {
      setShowPedometer(true);
      setShowLoader(false);
      return;
    }
    switch (type) {
      case 'meditation':
        handleResponse(type, prompt.health, 'meditation');
        break;
      case 'health':
        handleResponse(type, prompt.health, 'meditation');
        break;
      case 'happiness':
        handleResponse(type, prompt.joke, 'laugh');
        break;
      case 'motivation':
        handleResponse(type, prompt.motivation, 'motivation');
        break;
      default:
        handleError('There was no type like this');
        break;
    }
  };

  return (
    <View style={styles.container}>
      {message && (
        <Instructions
          onCross={() => {
            startBlur();
            setMessage('');
            setShowLoader(true);
            SoundPlayer.stop();
            setShowInstructions(false);
          }}
          message={message}
        />
      )}
      {showPedometer && (
        <Pedometer
          onCross={() => {
            startBlur();
            setMessage('');
            setShowLoader(true);
            setShowPedometer(false);
            SoundPlayer.stop();
            setShowInstructions(false);
          }}
          message={message}
        />
      )}
      {showLoader && (
        <View style={styles.loaderContainer}>
          <Loader />
        </View>
      )}
      {!showInstructions && <Bighero6 onPress={onOptionPressHandler} />}
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
    zIndex: -100,
  },
  loaderContainer: {
    position: 'absolute',
  },
});

export default Baymaxscreen;
