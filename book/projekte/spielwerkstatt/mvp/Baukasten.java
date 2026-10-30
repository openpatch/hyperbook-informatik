// Nur für die Darstellung der kleinen Beispiele: Figuren, Texte und Steuerung.
// Die jeweilige Spielidee steht vollständig im Reiter Beispiel.java.
class Baukasten extends Stage {
   public Baukasten() {
      this.setColor(235, 242, 230);
   }

   public Sprite figur(String pKostuem, double pX, double pY, double pProzent) {
      Sprite s = new Sprite();
      s.addCostume(pKostuem);
      s.setSize(pProzent);
      s.setPosition(pX, pY);
      this.add(s);
      return s;
   }

   public Text text(String pText, double pY) {
      Text t = new Text(pText, 0, pY, 460);
      t.setTextColor(25, 35, 45);
      this.add(t);
      return t;
   }

   public void steuere(Sprite pFigur, double pTempo) {
      if (this.isKeyPressed(KeyCode.RIGHT)) pFigur.changeX(pTempo);
      if (this.isKeyPressed(KeyCode.LEFT)) pFigur.changeX(-pTempo);
      if (this.isKeyPressed(KeyCode.UP)) pFigur.changeY(pTempo);
      if (this.isKeyPressed(KeyCode.DOWN)) pFigur.changeY(-pTempo);
      pFigur.ifOnEdgeBounce();
   }

   // Eine Zeichenkarte mit 24-Pixel-Zellen. Der Mittelpunkt ist (0, 0).
   public void karte(String[] pPlan) {
      for (int z = 0; z < pPlan.length; z++) {
         for (int s = 0; s < pPlan[z].length(); s++) {
            char c = pPlan[z].charAt(s);
            double x = (s - (pPlan[z].length() - 1) / 2.0) * 24;
            double y = ((pPlan.length - 1) / 2.0 - z) * 24;
            if (c == '#') this.figur("boxCrate", x, y, 18);
            else if (c == 'M') this.figur("coin_gold", x, y, 30);
            else if (c != '.') {
               Text t = new Text("" + c, x, y, 24);
               t.setTextColor(25, 35, 45);
               this.add(t);
            }
         }
      }
   }
}
