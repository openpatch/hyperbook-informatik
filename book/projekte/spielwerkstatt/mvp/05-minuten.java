void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   public Beispiel() {
      this.text("0 → " + this.zeitText(0) + " | 59 → " + this.zeitText(59), 100);
      this.text("60 → " + this.zeitText(60) + " | 65 → " + this.zeitText(65), 40);
      this.text("605 → " + this.zeitText(605), -20);
   }

   private String zeitText(int pSekunden) {
      int minuten = pSekunden / 60;
      int rest = pSekunden % 60;
      if (rest < 10) return minuten + ":0" + rest;
      return minuten + ":" + rest;
   }
}
