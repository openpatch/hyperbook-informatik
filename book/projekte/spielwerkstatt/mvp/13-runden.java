void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private Queue<String> reihenfolge = new Queue<String>();
   private Text anzeige;

   public Beispiel() {
      reihenfolge.enqueue("Heldin");
      reihenfolge.enqueue("Schleim");
      reihenfolge.enqueue("Wache");
      anzeige = this.text("Leertaste: nächster Zug", 80);
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.SPACE && !reihenfolge.isEmpty()) {
         String figur = reihenfolge.front();
         reihenfolge.dequeue();
         anzeige.showText(figur + " handelt jetzt");
         reihenfolge.enqueue(figur);
      }
   }
}
