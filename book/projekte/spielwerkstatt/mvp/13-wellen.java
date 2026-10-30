void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private Queue<String> wellen = new Queue<String>();
   private Text anzeige;

   public Beispiel() {
      wellen.enqueue("GGG");
      wellen.enqueue("VV");
      wellen.enqueue("GGVV");
      this.naechsteWelle();
   }

   private void naechsteWelle() {
      this.removeAll();
      if (wellen.isEmpty()) {
         this.text("Alle Wellen geschafft!", 80);
         return;
      }
      String welle = wellen.front();
      wellen.dequeue();
      for (int i = 0; i < welle.length(); i++) {
         Sprite g = this.figur("boxCrate", -100 + i * 60, 0, 25);
         if (welle.charAt(i) == 'V') g.setTint(150, 50, 200);
      }
      anzeige = this.text("Leertaste: Welle besiegen", 140);
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.SPACE) this.naechsteWelle();
   }
}
