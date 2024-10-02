import Tts from 'react-native-tts';

export const initializeTstListeners = async () => {
  Tts.getInitStatus().then(
    () => {
      console.log('TTS ENGINE ✅');
    },
    err => {
      if (err.code === 'no_engine') {
        console.log('NO ENGINE TTS ❌');
      }
    },
  );
  Tts.setDefaultVoice('hi-in-x-hia-network');
  Tts.setIgnoreSilentSwitch('ignore');
  Tts.setDefaultEngine('0.7');
  Tts.addEventListener('tts-start', event => {
    console.log('🚀 ~ Tts.addEventListener ~ tts-start:', event);
  });
  Tts.addEventListener('tts-start', event => {
    console.log('🚀 ~ Tts.addEventListener ~ tts-start:', event);
  });
  // Tts.addEventListener('tts-progress', event => {
  //   console.log('🚀 ~ Tts.addEventListener ~ tts-progress:', event);
  // });
  Tts.addEventListener('tts-cancel', event => {
    console.log('🚀 ~ Tts.addEventListener ~ tts-cancel:', event);
  });
  Tts.addEventListener('tts-finish', event => {
    console.log('🚀 ~ Tts.addEventListener ~ tts-finish:', event);
  });
};
