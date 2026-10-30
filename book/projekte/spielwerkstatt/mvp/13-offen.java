void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private List<String> offen = new List<String>();
   private Text anzeige;

   public Beispiel() {
      offen.append("Schlüssel");
      offen.append("Münze");
      offen.append("Herz");
      anzeige = this.text("", 80);
      this.zeige();
   }

   private void zeige() {
      String text = "Fehlt: ";
      offen.toFirst();
      while (offen.hasAccess()) {
         text += offen.getContent() + " ";
         offen.next();
      }
      if (offen.isEmpty()) text = "Alles gefunden!";
      anzeige.showText(text);
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.SPACE) {
         offen.toFirst();
         if (offen.hasAccess()) offen.remove();
         this.zeige();
      }
   }
}
