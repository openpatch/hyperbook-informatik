void main() {
   Trefferregler a = new Trefferregler();
   a.melde("Spieler");
   a.melde("Gegner");
   IO.println("Spieler zuerst: " + a.getLeben() + " Leben");
   Trefferregler b = new Trefferregler();
   b.melde("Gegner");
   b.melde("Spieler");
   IO.println("Gegner zuerst: " + b.getLeben() + " Leben");
}

class Trefferregler {
   private int leben = 3;
   private boolean schonGemeldet = false;

   public void neuesBild() {
      schonGemeldet = false;
   }

   public void melde(String pQuelle) {
      if (!schonGemeldet) {
         leben--;
         schonGemeldet = true;
      }
      IO.println(pQuelle + " meldet einen Treffer");
   }

   public int getLeben() {
      return leben;
   }
}
