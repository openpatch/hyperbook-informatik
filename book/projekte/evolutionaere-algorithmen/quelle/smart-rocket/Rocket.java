 

import org.openpatch.scratch.*;

public class Rocket extends Sprite {
  private Vector2 geschwindigkeit;
  private Vector2 beschleunigung;

  private double fit;
  private DNA dna;
  private int geneZaehler = 0;
  private Ziel ziel;

  public Rocket(Vector2 pPosition, DNA pDna, Ziel pZiel) {
    this.addCostume("playerShip2_orange");
    this.setPosition(pPosition);
    this.setHitbox(51, 40, 51, 24, 61, 24, 61, 40);
    this.beschleunigung = new Vector2();
    this.geschwindigkeit = new Vector2();
    this.dna = pDna;
    this.ziel = pZiel;
  }

  public void berechneFit() {
    double d = this.distanceToSprite(ziel);
    fit = 1 / d * 1 / d;
  }

  public double gibFit() {
    return fit;
  }

  public DNA gibDNA() {
    return dna;
  }

  public void run() {
    if (!this.isTouchingSprite(ziel)) {
      beschleunigung = beschleunigung.add(dna.gibGene()[geneZaehler]);
      geneZaehler = (geneZaehler + 1) % dna.gibGene().length;
      geschwindigkeit = geschwindigkeit.add(beschleunigung);
      move(geschwindigkeit);
      beschleunigung = beschleunigung.multiply(0);
    } else {
      this.setTint(200);
    }
  }
}
