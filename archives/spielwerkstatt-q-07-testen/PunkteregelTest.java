/// Tests für die Punkteregel. Starte sie in der Online-IDE über den Reiter Testrunner.
/// Auf dem Rechner brauchst du JUnit: In BlueJ entfernst du dafür das @Test vor class.
@Test
class PunkteregelTest {

   @Test
   void amAnfangIstAllesNull() {
      Punkteregel r = new Punkteregel();
      assertEquals(0, r.getPunkte(), "Am Anfang hat man 0 Punkte.");
      assertEquals(0, r.getKombo(), "Am Anfang ist die Kombo 0.");
   }

   @Test
   void grenzeZumDoppelten() {
      Punkteregel r = new Punkteregel();
      r.treffer(10);
      r.treffer(10);
      assertEquals(20, r.getPunkte(), "Der zweite Treffer zählt noch einfach.");
      r.treffer(10);
      assertEquals(40, r.getPunkte(), "Der dritte Treffer zählt doppelt: 20 + 20.");
   }

   @Test
   void grenzeZumDreifachen() {
      Punkteregel r = new Punkteregel();
      for (int i = 0; i < 5; i++) {
         r.treffer(10);
      }
      assertEquals(80, r.getPunkte(), "Treffer 1 bis 5 ergeben 10 + 10 + 20 + 20 + 20 = 80.");
      r.treffer(10);
      assertEquals(110, r.getPunkte(), "Der sechste Treffer zählt dreifach: 80 + 30.");
   }

   @Test
   void einFehlerSetztDieKomboZurueck() {
      Punkteregel r = new Punkteregel();
      r.treffer(10);
      r.treffer(10);
      r.fehler();
      r.treffer(10);
      assertEquals(1, r.getKombo(), "Nach dem Fehler beginnt die Kombo von vorn.");
      assertEquals(30, r.getPunkte(), "Die Punkte bleiben beim Fehler erhalten.");
   }
}
