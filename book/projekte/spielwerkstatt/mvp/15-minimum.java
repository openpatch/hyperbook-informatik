void main() {
   int[] abstaende = { 90, 30, 140, 20, 75, 60 };
   int bester = 0;
   int vergleiche = 0;
   for (int i = 1; i < abstaende.length; i++) {
      vergleiche++;
      if (abstaende[i] < abstaende[bester]) bester = i;
   }
   IO.println("Ziel mit Index " + bester + ", Abstand " + abstaende[bester]);
   IO.println("Vergleiche: " + vergleiche + " statt einer vollständigen Sortierung");
}
