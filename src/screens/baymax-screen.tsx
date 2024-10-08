import React, {useEffect, useReducer} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import SoundPlayer from 'react-native-sound-player';
import {Background} from '../components/baymax/background';
import {Bighero6} from '../components/baymax/bighero6';
import {Instructions} from '../components/baymax/instructions';
import {Loader} from '../components/baymax/loader';
import {Pedometer} from '../components/pedometer';
import {askAI} from '../service/geminiService';
import {
  SET_MESSAGE,
  SET_SHOW_INSTRUCTIONS,
  SET_SHOW_LOADER,
  SET_SHOW_PEDOMETER,
} from '../utils/actions';
import {COLORS} from '../utils/constants';
import {prompt} from '../utils/data';
import {reducer} from '../utils/reducer';
import {playTTS} from '../utils/ttsListeners';
import {State} from '../utils/types';
import {playSound} from '../utils/voiceUtils';

const initialState: State = {
  showInstructions: false,
  showLoader: true,
  message: '',
  showPedometer: false,
};

const actionMap: Record<string, {promptText: string; sound: string}> = {
  meditation: {promptText: prompt.health, sound: 'meditation'},
  health: {promptText: prompt.health, sound: 'meditation'},
  happiness: {promptText: prompt.joke, sound: 'laugh'},
  motivation: {promptText: prompt.motivation, sound: 'motivation'},
};

const Baymaxscreen = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
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
    dispatch({type: SET_MESSAGE, payload: ''});
    dispatch({type: SET_SHOW_LOADER, payload: true});
    SoundPlayer.stop();
    dispatch({type: SET_SHOW_INSTRUCTIONS, payload: false});
    console.log(err);
  };

  const handleResponse = async (type: string) => {
    const action = actionMap[type];

    if (!action) {
      handleError('Invalid action type');
      return;
    }

    try {
      if (type === 'meditation') {
        playTTS('Focus on your breath');
        playSound(action.sound);
        dispatch({type: SET_MESSAGE, payload: 'meditation'});
        return;
      }

      const data = await askAI(action.promptText);
      dispatch({type: SET_MESSAGE, payload: data});
      playTTS(data);

      if (type === 'happiness') {
        setTimeout(() => playSound(action.sound), 5000);
      } else {
        playSound(action.sound);
      }

      stopBlur();
      dispatch({type: SET_SHOW_LOADER, payload: true});
    } catch (error: any) {
      handleError(error);
    } finally {
      dispatch({type: SET_SHOW_LOADER, payload: false});
    }
  };

  const onOptionPressHandler = (type: string) => {
    if (type === 'pedometer') {
      dispatch({type: SET_SHOW_PEDOMETER, payload: true});
      dispatch({type: SET_SHOW_LOADER, payload: false});
      return;
    }

    dispatch({type: SET_SHOW_INSTRUCTIONS, payload: true});
    handleResponse(type);
  };

  const handleInstructionsCross = () => {
    startBlur();
    dispatch({type: SET_MESSAGE, payload: ''});
    dispatch({type: SET_SHOW_LOADER, payload: true});
    SoundPlayer.stop();
    dispatch({type: SET_SHOW_INSTRUCTIONS, payload: false});
  };

  const handlePedometerCross = () => {
    startBlur();
    dispatch({type: SET_MESSAGE, payload: ''});
    dispatch({type: SET_SHOW_LOADER, payload: true});
    dispatch({type: SET_SHOW_PEDOMETER, payload: false});
    SoundPlayer.stop();
    dispatch({type: SET_SHOW_INSTRUCTIONS, payload: false});
  };

  return (
    <View style={styles.container}>
      {state.message && (
        <Instructions
          onCross={handleInstructionsCross}
          message={state.message}
        />
      )}
      {state.showPedometer && (
        <Pedometer onCross={handlePedometerCross} message={state.message} />
      )}
      {state.showLoader && (
        <View style={styles.loaderContainer}>
          <Loader />
        </View>
      )}
      {!state.showInstructions && <Bighero6 onPress={onOptionPressHandler} />}
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
