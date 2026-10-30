void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private Queue<Teil> koerper = new Queue<Teil>();
   private boolean[][] belegt = new boolean[7][11];
   private int x = 3;
   private int y = 3;
   private int dx = 1;
   private int dy = 0;
   private int bilder = 0;
   private int futterX = 7;
   private int futterY = 3;
   private int laenge = 3;
   private boolean laeuft = true;
   private Sprite futter;
   private Text anzeige;

   public Beispiel() {
      for (int i = 1; i <= 3; i++) this.anhaengen(i, 3);
      futter = this.figur("coin_gold", 80, 0, 35);
      anzeige = this.text("Pfeiltasten | Wand und Körper meiden", 160);
   }

   private void anhaengen(int pX, int pY) {
      Sprite bild = this.figur("boxCrate", -200 + pX * 40, 120 - pY * 40, 25);
      koerper.enqueue(new Teil(pX, pY, bild));
      belegt[pY][pX] = true;
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.RIGHT && dx == 0) {
         dx = 1;
         dy = 0;
      } else if (pTaste == KeyCode.LEFT && dx == 0) {
         dx = -1;
         dy = 0;
      } else if (pTaste == KeyCode.UP && dy == 0) {
         dx = 0;
         dy = -1;
      } else if (pTaste == KeyCode.DOWN && dy == 0) {
         dx = 0;
         dy = 1;
      }
   }

   public void run() {
      bilder++;
      if (!laeuft || bilder % 20 != 0) return;
      x += dx;
      y += dy;
      if (x < 0 || x >= 11 || y < 0 || y >= 7) {
         laeuft = false;
         anzeige.showText("Wand getroffen");
         return;
      }
      boolean frisst = x == futterX && y == futterY;
      if (!frisst) {
         Teil schwanz = koerper.front();
         koerper.dequeue();
         belegt[schwanz.y][schwanz.x] = false;
         schwanz.bild.remove();
      }
      if (belegt[y][x]) {
         laeuft = false;
         anzeige.showText("Körper getroffen");
         return;
      }
      this.anhaengen(x, y);
      if (frisst) {
         laenge++;
         if (laenge == 77) {
            laeuft = false;
            anzeige.showText("Gewonnen!");
            return;
         }
         do {
            futterX = (int) (Math.random() * 11);
            futterY = (int) (Math.random() * 7);
         } while (belegt[futterY][futterX]);
         futter.setPosition(-200 + futterX * 40, 120 - futterY * 40);
      }
   }
}

class Teil {
   public int x, y;
   public Sprite bild;

   public Teil(int pX, int pY, Sprite pBild) {
      x = pX;
      y = pY;
      bild = pBild;
   }
}
