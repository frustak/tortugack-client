import turnAudio from '../assets/sounds/turn.mp3';

let turnSound;

export const loadSounds = () => {
  turnSound = new Audio(turnAudio);
};

export const playSound = () => {
  turnSound.play();
};
