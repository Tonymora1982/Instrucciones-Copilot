// A simple sound effects (SFX) controller.
// This is a placeholder structure. To implement, you would need audio files.

const sounds = {
  // Example:
  // roll: new Audio('/sounds/dice-roll.mp3'),
  // move: new Audio('/sounds/pawn-move.mp3'),
};

/**
 * Plays a sound effect.
 * @param {string} soundName - The name of the sound to play (e.g., 'roll', 'move').
 */
export function playSound(soundName) {
  if (sounds[soundName]) {
    sounds[soundName].currentTime = 0;
    sounds[soundName].play().catch(e => console.error(`Could not play sound: ${soundName}`, e));
  } else {
    console.log(`SFX: ${soundName} (no audio file loaded)`);
  }
}
