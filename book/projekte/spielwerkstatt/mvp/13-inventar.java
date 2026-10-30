void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private List<String> inventar = new List<String>();
   private Text anzeige;

   public Beispiel() {
      inventar.append("Trank");
      inventar.append("Apfel");
      inventar.append("Schriftrolle");
      inventar.toFirst();
      anzeige = this.text("Auswahl: " + inventar.getContent(), 80);
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.N) inventar.next();
      if (pTaste == KeyCode.SPACE && inventar.hasAccess()) inventar.remove();
      if (!inventar.hasAccess()) inventar.toFirst();
      if (inventar.isEmpty()) anzeige.showText("Inventar leer");
      else anzeige.showText("Auswahl: " + inventar.getContent());
   }
}
