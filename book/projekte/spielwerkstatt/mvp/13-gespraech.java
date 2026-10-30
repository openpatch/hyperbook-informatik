void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private Queue<String> saetze = new Queue<String>();
   private Sprite figur;
   private double rest = 0;

   public Beispiel() {
      figur = this.figur("bunny1_stand", 0, -60, 30);
      saetze.enqueue("Willkommen im Dorf!");
      saetze.enqueue("Im Wald steht eine alte Truhe.");
      saetze.enqueue("Nimm diesen Hinweis mit.");
   }

   public void run() {
      rest = Math.max(0, rest - 1.0 / 60);
      if (rest == 0) {
         if (saetze.isEmpty()) figur.say("");
         else {
            figur.say(saetze.front());
            saetze.dequeue();
            rest = 3;
         }
      }
   }
}
