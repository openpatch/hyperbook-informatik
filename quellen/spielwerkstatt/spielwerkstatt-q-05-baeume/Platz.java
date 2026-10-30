/// Eine Stelle auf der Bühne, an der der Spieler einmal war.
public class Platz {

   private double x;
   private double y;

   public Platz(double pX, double pY) {
      x = pX;
      y = pY;
   }

   public double getX() {
      return x;
   }

   public double getY() {
      return y;
   }
}
