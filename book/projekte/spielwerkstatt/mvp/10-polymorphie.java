void main() {
   Held held = new Held();
   Gegenstand[] dinge = { new Muenze(), new Herz(), new Falle() };
   for (int i = 0; i < dinge.length; i++) dinge[i].beruehrtVon(held);
   IO.println("Punkte: " + held.punkte + " | Leben: " + held.leben);
}

class Held {
   public int punkte = 0;
   public int leben = 3;
}

abstract class Gegenstand {
   public abstract void beruehrtVon(Held pHeld);
}

class Muenze extends Gegenstand {
   public void beruehrtVon(Held pHeld) {
      pHeld.punkte += 10;
      IO.println("Münze: +10 Punkte");
   }
}

class Herz extends Gegenstand {
   public void beruehrtVon(Held pHeld) {
      pHeld.leben++;
      IO.println("Herz: +1 Leben");
   }
}

class Falle extends Gegenstand {
   public void beruehrtVon(Held pHeld) {
      pHeld.leben--;
      IO.println("Falle: -1 Leben");
   }
}
