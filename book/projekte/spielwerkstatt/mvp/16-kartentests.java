void main() {
   IO.println("Starte KarteTest im Reiter Testrunner. Start ist immer [1][1].");
}

@Test
class KarteTest {
   @Test
   void offenerRaum() {
      Karte k = new Karte(new String[] { "#####", "#...#", "#...#", "#####" });
      assertTrue(k.istErreichbar(2, 3), "Im offenen Raum ist das Ziel erreichbar.");
   }

   @Test
   void eingemauert() {
      Karte k = new Karte(new String[] { "#####", "#.#.#", "#####" });
      assertFalse(k.istErreichbar(1, 3), "Eine geschlossene Wand trennt das Ziel ab.");
   }

   @Test
   void startNebenMauer() {
      Karte k = new Karte(new String[] { "###", "#.#", "###" });
      assertTrue(k.istErreichbar(1, 1), "Das Startfeld selbst ist erreichbar.");
      assertFalse(k.istErreichbar(0, 1), "Eine Mauer ist kein erreichbares Ziel.");
   }

   @Test
   void ausserhalb() {
      Karte k = new Karte(new String[] { "...", "..." });
      assertFalse(k.istErreichbar(-1, 0), "Außerhalb gibt es keinen Zielplatz.");
   }
}

class Karte {
   private String[] plan;

   public Karte(String[] pPlan) {
      plan = pPlan;
   }

   public boolean istErreichbar(int z, int s) {
      boolean[][] besucht = new boolean[plan.length][];
      for (int i = 0; i < plan.length; i++) besucht[i] = new boolean[plan[i].length()];
      return this.suche(1, 1, z, s, besucht);
   }

   private boolean suche(int z, int s, int zielZ, int zielS, boolean[][] besucht) {
      if (z < 0 || z >= plan.length || s < 0 || s >= plan[z].length()) return false;
      if (plan[z].charAt(s) == '#' || besucht[z][s]) return false;
      besucht[z][s] = true;
      if (z == zielZ && s == zielS) return true;
      return (
         this.suche(z - 1, s, zielZ, zielS, besucht) ||
         this.suche(z + 1, s, zielZ, zielS, besucht) ||
         this.suche(z, s - 1, zielZ, zielS, besucht) ||
         this.suche(z, s + 1, zielZ, zielS, besucht)
      );
   }
}
