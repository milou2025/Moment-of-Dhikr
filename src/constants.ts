export interface QuranVerse {
  id: number;
  text: string;
  translation: string;
  surah: string;
  ayah: number;
  audioUrl: string;
}

export interface Hadith {
  id: number;
  text: string;
  source: string;
  explanation: string;
}

export interface Dhikr {
  id: number;
  arabic: string;
  transliteration: string;
  translation: string;
  count?: number;
}

export const QURAN_VERSES: QuranVerse[] = [
  {
    id: 1,
    text: "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ",
    translation: "So remember Me; I will remember you. And be grateful to Me and do not deny Me.",
    surah: "Al-Baqarah",
    ayah: 152,
    audioUrl: "https://download.quranicaudio.com/quran/mishary_rashid_alafasy/002152.mp3"
  },
  {
    id: 2,
    text: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    translation: "Unquestionably, by the remembrance of Allah hearts are assured.",
    surah: "Ar-Ra'd",
    ayah: 28,
    audioUrl: "https://download.quranicaudio.com/quran/mishary_rashid_alafasy/013028.mp3"
  }
];

export const HADITHS: Hadith[] = [
  {
    id: 1,
    text: "The Prophet (ﷺ) said: 'The best among you are those who learn the Quran and teach it.'",
    source: "Sahih al-Bukhari",
    explanation: "This hadith emphasizes that the highest status in the sight of Allah is for those who dedicate their lives to the words of Allah, both in understanding and in sharing that knowledge."
  },
  {
    id: 2,
    text: "The Prophet (ﷺ) said: 'Cleanliness is half of faith.'",
    source: "Sahih Muslim",
    explanation: "Purity (Taharah) is not just physical cleanliness but also spiritual purity. It is a fundamental requirement for worship and a reflection of a believer's inner state."
  }
];

export const DAILY_DHIKR: Dhikr[] = [
  {
    id: 1,
    arabic: "سُبْحَانَ اللَّهِ",
    transliteration: "SubhanAllah",
    translation: "Glory be to Allah",
  },
  {
    id: 2,
    arabic: "الْحَمْدُ لِلَّهِ",
    transliteration: "Alhamdulillah",
    translation: "All praise is due to Allah",
  },
  {
    id: 3,
    arabic: "اللَّهُ أَكْبَرُ",
    transliteration: "Allahu Akbar",
    translation: "Allah is the Greatest",
  },
  {
    id: 4,
    arabic: "لَا إِلَهَ إِلَّا اللَّهُ",
    transliteration: "La ilaha illallah",
    translation: "There is no god but Allah",
  }
];
