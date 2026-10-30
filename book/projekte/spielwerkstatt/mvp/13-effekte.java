void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private List<Effekt> effekte = new List<Effekt>();
   private Text anzeige;

   public Beispiel() {
      anzeige = this.text("Leertaste: drei Zauber", 80);
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.SPACE && effekte.isEmpty()) {
         effekte.append(new Effekt("Eile", 6));
         effekte.append(new Effekt("Schild", 2));
         effekte.append(new Effekt("Gift", 4));
      }
   }

   public void run() {
      String text = "Aktiv: ";
      effekte.toFirst();
      while (effekte.hasAccess()) {
         Effekt e = effekte.getContent();
         e.rest -= 1.0 / 60;
         if (e.rest <= 0) effekte.remove();
         else {
            text += e.name + " " + (int) e.rest + "s | ";
            effekte.next();
         }
      }
      anzeige.showText(text);
   }
}

class Effekt {
   public String name;
   public double rest;

   public Effekt(String pName, double pRest) {
      name = pName;
      rest = pRest;
   }
}
