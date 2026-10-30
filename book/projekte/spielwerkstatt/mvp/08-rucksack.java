void main() {
   String[] namen = { "Trank", "Axt", "Schlüssel", "Bogen" };
   for (int i = 1; i < namen.length; i++) {
      String aktuell = namen[i];
      int j = i;
      while (j > 0 && namen[j - 1].compareTo(aktuell) > 0) {
         namen[j] = namen[j - 1];
         j--;
      }
      namen[j] = aktuell;
   }
   for (int i = 0; i < namen.length; i++) IO.println(namen[i]);
}
