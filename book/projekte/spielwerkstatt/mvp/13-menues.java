void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private Stack<String> zurueck = new Stack<String>();
   private String raum = "Dorf";
   private int nummer = 0;
   private Text anzeige;

   public Beispiel() {
      anzeige = this.text(raum, 80);
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.SPACE) {
         zurueck.push(raum);
         nummer++;
         raum = "Unterraum " + nummer;
      }
      if (pTaste == KeyCode.ESCAPE && !zurueck.isEmpty()) {
         raum = zurueck.top();
         zurueck.pop();
      }
      anzeige.showText(raum);
   }
}
