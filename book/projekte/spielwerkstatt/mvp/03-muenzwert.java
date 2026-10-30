void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Zaehler());
}

class Zaehler extends Stage {
   private int punktzahl = 0;
   private int wert = 10;
   private Text anzeige = new Text("Punkte: 0 | nächste Münze: 10", 0, 100, 460);

   public Zaehler() {
      this.add(anzeige);
   }

   public void whenKeyPressed(KeyCode pTaste) {
      punktzahl = punktzahl + wert;
      wert = wert + 5;
      anzeige.showText("Punkte: " + punktzahl + " | nächste Münze: " + wert);
   }
}
