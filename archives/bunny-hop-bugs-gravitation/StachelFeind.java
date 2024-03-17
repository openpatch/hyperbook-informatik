public class StachelFeind extends Feind {
    
    Spieler spieler;
    int fallGeschwindigkeit = 5;
    
    public StachelFeind(Spieler pSpieler) {
        this.spieler = pSpieler;
        this.addCostume("stehen", "assets/Enemies/spikeMan_stand.png");
        this.setHitbox(0, 154, 0, 65, 44, 0, 90, 66, 90, 155);
    }
    
    public void run() {
        this.changeX(-2);
        if (this.isTouchingSprite(spieler)) {
            spieler.verletzten();
        }
        this.changeY(fallGeschwindigkeit);
        while(this.isTouchingSprite(Plattform.class)) {
            this.changeY(-0.1);
        }
    }
}