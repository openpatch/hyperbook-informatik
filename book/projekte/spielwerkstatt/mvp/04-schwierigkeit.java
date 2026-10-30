void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   public Beispiel() {
      int stufe = 2;
      int zeit;
      int tempo;
      switch (stufe) {
         case 1:
            zeit = 60;
            tempo = 5;
            break;
         case 2:
            zeit = 40;
            tempo = 3;
            break;
         default:
            zeit = 20;
            tempo = 2;
      }
      this.text("Stufe " + stufe + ": Zeit " + zeit + ", Tempo " + tempo, 80);
   }
}
