var scales =
{
  "chromatic":[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ],
  "major-ionian":[ 0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24, 26 ], // 1 major/ionian
  "dorian":[ 0, 2, 3, 5, 7, 9, 10, 12, 14, 15, 17, 19, 21, 22, 24, 26 ], // 2 dorian
  "phrygian":[ 0, 1, 3, 5, 7, 8, 10, 12, 13, 15, 17, 19, 20, 22, 24, 25 ], // 3 phrygian
  "lydian":[ 0, 2, 4, 6, 7, 9, 11, 12, 14, 16, 18, 19, 21, 23, 24, 26 ], // 4 lydian
  "mixolydian":[ 0, 2, 4, 5, 7, 9, 10, 12, 14, 16, 17, 19, 21, 22, 24, 26 ], // 5 mixolydian
  "natural-minor-aeolian":[ 0, 2, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19, 20, 22, 24, 26 ], // 6 natural minor/aeolian
  "locrian":[ 0, 1, 3, 5, 6, 8, 10, 12, 13, 15, 17, 18, 20, 22, 24, 25 ], // 7 locrian
  "fregish":[ 0, 1, 4, 5, 7, 8, 10, 12, 13, 16, 17, 19, 20, 22, 24, 25 ], // 8 freygish
  "melodic-minor":[ 0, 2, 3, 5, 7, 9, 11, 12, 14, 15, 17, 19, 21, 23, 24, 26 ], // 9 melodic minor
  "harmonic-minor":[ 0, 2, 3, 5, 7, 8, 11, 12, 14, 15, 17, 19, 20, 23, 24, 26 ], //10 harmonic minor
  "major-blues":[ 0, 3, 4, 7, 9, 10, 12, 15, 16, 19, 21, 22, 24, 27, 28, 31 ], //11 major blues
  "minor-blues":[ 0, 3, 5, 6, 7, 10, 12, 15, 17, 18, 19, 22, 24, 27, 29, 30 ], //12 minor blues
  "major-pentatonic":[ 0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24, 26, 28, 31, 33, 36 ], //13 major pentatonic
  "minor-pentatonic":[ 0, 3, 5, 7, 10, 12, 15, 17, 19, 22, 24, 27, 29, 31, 34, 36 ], //14 minor pentatonic
  "diminish":[ 0, 2, 3, 5, 6, 8, 9, 11, 12, 14, 15, 17, 18, 20, 23, 24 ], //15 diminish
  "combi-diminish":[ 0, 1, 3, 4, 6, 7, 9, 10, 12, 13, 15, 16, 18, 19, 21, 22 ], //16 combi diminish
  "raga-bhairav":[ 0, 1, 4, 5, 7, 8, 11, 12, 13, 16, 17, 19, 20, 23, 24, 25 ], //17 raga bhairav
  "raga-gamansrama":[ 0, 1, 4, 6, 7, 9, 11, 12, 13, 16, 18, 19, 21, 23, 24, 25 ], //18 raga gamansrama
  "raga todi":[ 0, 1, 3, 6, 7, 8, 11, 12, 13, 15, 18, 19, 20, 23, 24, 25 ], //19 raga todi
  "spanish":[ 0, 1, 3, 4, 5, 7, 8, 10, 12, 13, 15, 16, 17, 19, 20, 22 ], //20 spanish
  "gypsy":[ 0, 2, 3, 6, 7, 8, 11, 12, 14, 15, 18, 19, 20, 23, 24, 26 ], //21 gypsy
  "arabian":[ 0, 2, 4, 5, 6, 8, 10, 12, 14, 16, 17, 18, 20, 22, 24, 26 ], //22 arabian
  "egyptian":[ 0, 2, 5, 7, 10, 12, 14, 17, 19, 22, 24, 26, 29, 31, 34, 36 ], //23 egyptian
  "hawaiian":[ 0, 2, 3, 7, 9, 12, 14, 15, 19, 21, 24, 26, 27, 31, 33, 36 ], //24 hawaiian
  "bali-pelog":[ 0, 1, 3, 7, 8, 12, 13, 15, 19, 20, 24, 25, 27, 31, 32, 36 ], //25 bali pelog
  "japanese":[ 0, 1, 5, 7, 8, 12, 13, 17, 19, 20, 24, 25, 29, 31, 32, 36 ], //26 japan
  "ryuku":[ 0, 4, 5, 7, 11, 12, 16, 17, 19, 23, 24, 28, 29, 31, 35, 36 ], //27 ryukyu
  "wholetone":[ 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30 ], //28 wholetone
  "augmented":[ 0, 3, 4, 7, 8, 11, 12, 15, 16, 19, 20, 23, 24, 27, 28, 31 ], //29 augmented
  "prometheus":[ 0, 2, 4, 6, 10, 12, 14, 16, 18, 22, 24, 26, 28, 30, 34, 36 ], //30 prometheus
  "tritone":[ 0, 1, 4, 6, 7, 10, 12, 13, 16, 18, 19, 22, 24, 25, 28, 30 ] //31 tritone
};