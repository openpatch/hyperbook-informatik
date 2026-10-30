void main() {
   IO.println("Starte PunkteregelTest im Reiter Testrunner.");
}

@Test
class PunkteregelTest {
   @Test
   void ersterTreffer() {
      Punkteregel r = new Punkteregel();
      r.treffer(10);
      assertEquals(10, r.getPunkte(), "Die erste Münze zählt einfach.");
   }

   @Test
   void grenzeDrei() {
      Punkteregel r = new Punkteregel();
      r.treffer(10);
      r.treffer(10);
      assertEquals(20, r.getPunkte(), "Zwei Münzen zählen einfach.");
      r.treffer(10);
      assertEquals(40, r.getPunkte(), "Die dritte zählt doppelt.");
   }

   @Test
   void grenzeSechs() {
      Punkteregel r = new Punkteregel();
      for (int i = 0; i < 5; i++) r.treffer(10);
      assertEquals(80, r.getPunkte(), "Bis fünf: 10+10+20+20+20.");
      r.treffer(10);
      assertEquals(110, r.getPunkte(), "Die sechste zählt dreifach.");
   }

   @Test
   void fehlerSetztZurueck() {
      Punkteregel r = new Punkteregel();
      for (int i = 0; i < 3; i++) r.treffer(10);
      r.fehler();
      r.treffer(10);
      assertEquals(1, r.getKombo(), "Neue Kombo nach Fehler.");
      assertEquals(50, r.getPunkte(), "Vorige Punkte bleiben erhalten.");
   }
}

class Punkteregel {
   private int kombo = 0;
   private int punkte = 0;

   public void treffer(int pGrundwert) {
      kombo++;
      int faktor = 1;
      if (kombo >= 6) faktor = 3;
      else if (kombo >= 3) faktor = 2;
      punkte += pGrundwert * faktor;
   }

   public void fehler() {
      kombo = 0;
   }

   public int getPunkte() {
      return punkte;
   }

   public int getKombo() {
      return kombo;
   }
}
