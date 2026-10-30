void main() {
   Beutel<Muenze> geld = new Beutel<Muenze>(new Muenze());
   Beutel<Herz> heilung = new Beutel<Herz>(new Herz());
   IO.println("Münzwert: " + geld.getInhalt().getWert());
   IO.println("Heilung: " + heilung.getInhalt().getLeben());
}

class Beutel<T> {
   private T inhalt;

   public Beutel(T pInhalt) {
      inhalt = pInhalt;
   }

   public T getInhalt() {
      return inhalt;
   }
}

class Muenze {
   public int getWert() {
      return 10;
   }
}

class Herz {
   public int getLeben() {
      return 1;
   }
}
