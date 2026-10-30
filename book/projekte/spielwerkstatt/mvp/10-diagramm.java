void main() {
   Spieler held = new Spieler();
   Gegenstand muenze = new Muenze(held);
   IO.println(muenze.beschreibung());
}

class Spieler {}

interface Wertvoll {
   int getWert();
}

abstract class Gegenstand {
   public abstract String beschreibung();
}

class Muenze extends Gegenstand implements Wertvoll {
   private Spieler besitzer;

   public Muenze(Spieler pBesitzer) {
      besitzer = pBesitzer;
   }

   public String beschreibung() {
      return "Münze gehört zu einem Spieler";
   }

   public int getWert() {
      return 10;
   }
}
