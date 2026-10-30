void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private Sprite held;

   public Beispiel() {
      held = this.figur("bunny1_stand", 0, 0, 20);
      this.text("Startleben: " + Einstellungen.STARTLEBEN, 150);
   }

   public void run() {
      this.steuere(held, Einstellungen.TEMPO);
   }
}

class Einstellungen {
   public static final int TEMPO = 4;
   public static final int STARTLEBEN = 3;
}
