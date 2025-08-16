// A simple utility for triggering haptic feedback.

export function triggerVibration(duration = 50) {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(duration);
    } catch (e) {
      console.error("Haptic feedback failed.", e);
    }
  }
}
