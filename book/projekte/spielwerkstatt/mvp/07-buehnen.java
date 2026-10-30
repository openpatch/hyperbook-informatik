void main() {
   Window fenster = new Window(480, 360);
   Raum wiese = new Raum("Wiese");
   Raum hoehle = new Raum("Höhle");
   wiese.setNachbar(hoehle);
   hoehle.setNachbar(wiese);
   fenster.setStage(wiese);
}

class Raum extends Stage {
   private Raum nachbar;
   private String name;
   private int muenzen = 3;
   private Text anzeige = new Text("", 0, 80, 460);

   public Raum(String pName) {
      name = pName;
      this.add(anzeige);
      this.aktualisiere();
   }

   public void setNachbar(Raum pNachbar) {
      nachbar = pNachbar;
   }

   private void aktualisiere() {
      anzeige.showText(name + ": " + muenzen + " Münzen");
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.SPACE && muenzen > 0) {
         muenzen--;
         this.aktualisiere();
      }
      if (pTaste == KeyCode.RIGHT || pTaste == KeyCode.LEFT) {
         Window.getInstance().setStage(nachbar);
      }
   }
}
