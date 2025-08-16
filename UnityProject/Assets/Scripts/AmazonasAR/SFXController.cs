using UnityEngine;

namespace AmazonasAR
{
    public class SFXController : MonoBehaviour
    {
        public static SFXController Instance;
        public AudioSource audioSource;
        public AudioClip step;
        public AudioClip win;
        public AudioClip eventClip;
        public AudioClip uiTap;

        void Awake()
        {
            if (Instance == null) Instance = this; else Destroy(gameObject);
            if (!audioSource) audioSource = GetComponent<AudioSource>();
        }

        public void PlayStep() { Play(step, 0.7f); }
        public void PlayWin() { Play(win, 0.9f); Handheld.Vibrate(); }
        public void PlayEvent() { Play(eventClip, 0.8f); }
        public void PlayUiTap() { Play(uiTap, 0.6f); }

        void Play(AudioClip clip, float vol)
        {
            if (!clip || !audioSource) return;
            audioSource.PlayOneShot(clip, vol);
        }
    }
}