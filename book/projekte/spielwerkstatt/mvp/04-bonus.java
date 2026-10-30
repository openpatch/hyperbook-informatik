void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   public Beispiel() {
      int punkte = 3;
      int anzahlMuenzen = 3;
      double zeit = 21;
      if (punkte == anzahlMuenzen && zeit > 20) this.text("Gewonnen mit Bonusstern!", 80);
      else if (punkte == anzahlMuenzen) this.text("Gewonnen ohne Bonus", 80);
      else this.text("Es fehlen noch Münzen", 80);
   }
}
