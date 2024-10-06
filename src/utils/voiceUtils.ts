import SoundPlayer from 'react-native-sound-player';

const soundPaths: {[key: string]: any} = {
  laugh: require('../assets/sfx/laugh.mp3'),
  meditation: require('../assets/sfx/meditation.mp3'),
  motivation: require('../assets/sfx/motivation.mp3'),
  ting: require('../assets/sfx/ting.mp3'),
  ting2: require('../assets/sfx/ting2.mp3'),
  notification: require('../assets/sfx/notification.mp3'),
};

const getSoundPath = (soundName: string) => {
  const soundPath = soundPaths[soundName];
  if (!soundPath) {
    throw new Error(`Sound ${soundName} not found`);
  }
  return soundPath;
};

export const playSound = (soundName: string) => {
  try {
    const soundPath = getSoundPath(soundName);
    SoundPlayer.playAsset(soundPath);
  } catch (error) {
    console.log(error);
  }
};
