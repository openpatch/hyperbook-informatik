void main() {
   int[][] original = { { 1, 1, 1 }, { 1, 0, 1 } };
   int[][] alias = original;
   int[][] flach = new int[original.length][];
   int[][] tief = new int[original.length][];
   for (int z = 0; z < original.length; z++) {
      flach[z] = original[z];
      tief[z] = new int[original[z].length];
      for (int s = 0; s < original[z].length; s++) tief[z][s] = original[z][s];
   }
   original[0][1] = 0; // Schalter öffnet eine Wand.
   IO.println("Alias: " + alias[0][1] + " | flach: " + flach[0][1] + " | tief: " + tief[0][1]);
   // Aus der tiefen Kopie wiederherstellen, ohne sie dabei zu verändern.
   for (int z = 0; z < original.length; z++) {
      for (int s = 0; s < original[z].length; s++) original[z][s] = tief[z][s];
   }
   IO.println("Wand nach Neustart: " + original[0][1]);
}
