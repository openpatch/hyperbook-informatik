void main() {
   Wertvoll[] schaetze = { new Muenze(), new Truhe() };
   int gesamt = 0;
   for (int i = 0; i < schaetze.length; i++) gesamt += schaetze[i].getWert();
   IO.println("Insgesamt zu holen: " + gesamt + " Punkte");
}

interface Wertvoll {
   int getWert();
}

class Hindernis {}

class Muenze implements Wertvoll {
   public int getWert() {
      return 10;
   }
}

class Truhe extends Hindernis implements Wertvoll {
   public int getWert() {
      return 50;
   }
}
