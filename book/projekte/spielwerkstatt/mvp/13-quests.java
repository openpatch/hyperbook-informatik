void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private List<String> quests = new List<String>();
   private Text anzeige;

   public Beispiel() {
      quests.append("Finde den Schlüssel");
      quests.append("Rette die Katze");
      quests.append("Öffne das Tor");
      quests.toFirst();
      anzeige = this.text("", 80);
      this.zeige();
   }

   private void zeige() {
      if (!quests.hasAccess()) quests.toFirst();
      if (quests.hasAccess()) anzeige.showText(quests.getContent());
      else anzeige.showText("Keine offenen Aufträge");
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.N) quests.next();
      if (pTaste == KeyCode.SPACE && quests.hasAccess()) quests.remove();
      if (pTaste == KeyCode.A) {
         if (quests.hasAccess()) quests.insert("Neuer Auftrag");
         else quests.append("Neuer Auftrag");
      }
      this.zeige();
   }
}
