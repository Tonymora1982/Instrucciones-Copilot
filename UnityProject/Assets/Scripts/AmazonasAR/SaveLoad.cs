using System;
using System.Collections.Generic;
using UnityEngine;

namespace AmazonasAR
{
    [Serializable]
    public class SaveData
    {
        public List<PlayerState> players;
        public int activeIndex;
    }

    public class SaveLoad : MonoBehaviour
    {
        public string key = "amazonas_ar_save_v1";

        public void Save(List<PlayerState> players, int activeIndex)
        {
            if (players == null) return;
            var data = new SaveData { players = players, activeIndex = activeIndex };
            string json = JsonUtility.ToJson(data);
            PlayerPrefs.SetString(key, json);
            PlayerPrefs.Save();
        }

        public bool TryLoad(out List<PlayerState> players, out int activeIndex)
        {
            players = null;
            activeIndex = 0;
            if (!PlayerPrefs.HasKey(key)) return false;
            string json = PlayerPrefs.GetString(key, "");
            if (string.IsNullOrEmpty(json)) return false;
            var data = JsonUtility.FromJson<SaveData>(json);
            players = data.players;
            activeIndex = data.activeIndex;
            return players != null && players.Count > 0;
        }

        public void Clear()
        {
            PlayerPrefs.DeleteKey(key);
        }
    }
}