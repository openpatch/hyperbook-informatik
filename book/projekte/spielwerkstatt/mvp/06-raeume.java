void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private String[] wiese = { "#########", "#..M....#", "#.......#", "#########" };
   private String[] hoehle = { "#########", "#..###..#", "#M......#", "#########" };

   public Beispiel() {
      this.baueRaum(wiese);
   }

   private void baueRaum(String[] pPlan) {
      this.removeAll();
      this.karte(pPlan);
      this.text("Links: Wiese | Rechts: Höhle", 140);
      this.figur("bunny1_stand", 0, -90, 20);
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.RIGHT) this.baueRaum(hoehle);
      if (pTaste == KeyCode.LEFT) this.baueRaum(wiese);
   }
}
