void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private List<Platz> route = new List<Platz>();
   private Sprite wache;

   public Beispiel() {
      route.append(new Platz(-120, 80));
      route.append(new Platz(120, 80));
      route.append(new Platz(120, -80));
      route.append(new Platz(-120, -80));
      route.toFirst();
      wache = this.figur("boxCrate", -120, 80, 20);
   }

   public void run() {
      Platz p = route.getContent();
      double dx = p.x - wache.getX();
      double dy = p.y - wache.getY();
      if (Math.abs(dx) <= 2 && Math.abs(dy) <= 2) {
         wache.setPosition(p.x, p.y);
         route.next();
         if (!route.hasAccess()) route.toFirst();
      } else {
         if (dx > 0) wache.changeX(Math.min(2, dx));
         if (dx < 0) wache.changeX(Math.max(-2, dx));
         if (dy > 0) wache.changeY(Math.min(2, dy));
         if (dy < 0) wache.changeY(Math.max(-2, dy));
      }
   }
}

class Platz {
   public double x, y;

   public Platz(double pX, double pY) {
      x = pX;
      y = pY;
   }
}
