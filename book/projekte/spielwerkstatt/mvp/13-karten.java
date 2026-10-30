void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private Stack<String> ziehen = new Stack<String>();
   private Stack<String> ablage = new Stack<String>();
   private Text anzeige;

   public Beispiel() {
      ablage.push("Feuer");
      ablage.push("Heilung");
      ablage.push("Eis");
      this.mische();
      anzeige = this.text("Leertaste: Karte ziehen", 80);
   }

   private void mische() {
      String[] karten = new String[3];
      int n = 0;
      while (!ablage.isEmpty()) {
         karten[n] = ablage.top();
         ablage.pop();
         n++;
      }
      for (int i = n - 1; i > 0; i--) {
         int j = (int) (Math.random() * (i + 1));
         String t = karten[i];
         karten[i] = karten[j];
         karten[j] = t;
      }
      for (int i = 0; i < n; i++) ziehen.push(karten[i]);
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.SPACE) {
         if (ziehen.isEmpty()) this.mische();
         String karte = ziehen.top();
         ziehen.pop();
         anzeige.showText("Gezogen: " + karte);
         ablage.push(karte);
      }
   }
}
