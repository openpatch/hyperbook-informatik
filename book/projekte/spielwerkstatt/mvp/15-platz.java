void main() {
   double[] zeiten = { 15, 18, 18, 21, 27, 33 }; // Aufsteigend: klein ist gut.
   double neu = 18;
   int links = 0;
   int rechts = zeiten.length;
   int vergleiche = 0;
   while (links < rechts) {
      int mitte = (links + rechts) / 2;
      vergleiche++;
      if (zeiten[mitte] < neu) links = mitte + 1;
      else rechts = mitte;
   }
   IO.println("Platz: " + (links + 1) + " | Vergleiche: " + vergleiche);
}
