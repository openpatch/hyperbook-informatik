void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   public Beispiel() {
      this.setzeStein(-80, 40);
      this.setzeStein(80, -40);
   }

   private void setzeStein(double pX, double pY) {
      Sprite stein = new Sprite();
      stein.addCostume("boxCrate");
      stein.setSize(30);
      stein.setPosition(pX, pY);
      this.add(stein);
   }
}
